import React, {
    useCallback,
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import CheckoutHero from "../../components/Checkout/CheckoutHero";
import CheckoutStepper from "../../components/Checkout/CheckoutStepper";
import AddressSection from "../../components/Checkout/AddressSection";
import DeliverySection, {
    DeliveryMethod
} from "../../components/Checkout/DeliverySection";
import GiftSection from "../../components/Checkout/GiftSection";
import NotesSection from "../../components/Checkout/NotesSection";
import SummarySection from "../../components/Checkout/SummarySection";
import TrustSection from "../../components/Checkout/TrustSection";
import StickyCTA from "../../components/Checkout/StickyCTA";

import AddressModal from "../../components/AddressModal/AddressModal";

import { useCart } from "../../context/CartContext";
import { useAddress } from "../../context/AddressContext";

import { Address } from "../../types/address";
import { calculatePricing } from "../../utils/pricing";

import orderService from "../../services/orderService";

import "./Checkout.css";

const Checkout: React.FC = () => {

    const navigate = useNavigate();

    /* ---------------------------------- */
    /* Context                            */
    /* ---------------------------------- */

    const {
        cartItems,
        selectedCoupon,
        giftWrap,
        setGiftWrap
    } = useCart();

    const {
        addresses,
        addAddress,
        updateAddress
    } = useAddress();

    /* ---------------------------------- */
    /* Address                            */
    /* ---------------------------------- */

    const [
        selectedAddressId,
        setSelectedAddressId
    ] = useState("");

    const [
        openAddressModal,
        setOpenAddressModal
    ] = useState(false);

    const [
        editingAddress,
        setEditingAddress
    ] = useState<Address | null>(null);

    /* ---------------------------------- */
    /* Delivery                           */
    /* ---------------------------------- */

    const [
        selectedDelivery,
        setSelectedDelivery
    ] = useState<DeliveryMethod>(
        "standard"
    );

    /* ---------------------------------- */
    /* Gift                               */
    /* ---------------------------------- */

    const [
        giftBox,
        setGiftBox
    ] = useState(false);

    const [
        hideInvoice,
        setHideInvoice
    ] = useState(false);

    const [
        giftMessage,
        setGiftMessage
    ] = useState("");

    /* ---------------------------------- */
    /* Notes                              */
    /* ---------------------------------- */

    const [
        notes,
        setNotes
    ] = useState("");

    /* ---------------------------------- */
    /* UI                                 */
    /* ---------------------------------- */

    const [
        loading,
        setLoading
    ] = useState(false);

    const [
        checkoutError,
        setCheckoutError
    ] = useState<string | null>(null);

    /* ---------------------------------- */
    /* Page Meta                          */
    /* ---------------------------------- */

    useEffect(() => {
        const previousTitle = document.title;

        document.title = "Secure Checkout · HIRANYA";

        return () => {
            document.title = previousTitle;
        };
    }, []);

    /* ---------------------------------- */
    /* Default Address                    */
    /* ---------------------------------- */

    useEffect(() => {
        if (
            addresses.length > 0 &&
            !selectedAddressId
        ) {
            const defaultAddress =
                addresses.find(
                    (address) =>
                        address.isDefault
                );

            if (defaultAddress) {
                setSelectedAddressId(
                    defaultAddress._id!
                );
            } else {
                setSelectedAddressId(
                    addresses[0]._id!
                );
            }
        }
    }, [
        addresses,
        selectedAddressId
    ]);

    /* ---------------------------------- */
    /* Clear inline error on progress     */
    /* ---------------------------------- */

    useEffect(() => {
        if (!checkoutError) return;

        if (
            cartItems.length > 0 &&
            selectedAddressId
        ) {
            setCheckoutError(null);
        }
    }, [
        cartItems.length,
        selectedAddressId,
        checkoutError
    ]);

    /* ---------------------------------- */
    /* Pricing                            */
    /* ---------------------------------- */

    const pricing = calculatePricing(
        cartItems,
        selectedCoupon,
        giftWrap,
        selectedDelivery
    );

    /* ---------------------------------- */
    /* Summary Products                   */
    /* ---------------------------------- */

    const summaryProducts = cartItems.map(
        (item: any) => ({
            id:
                item._id ||
                item.id,
            image:
                item.images?.[0] ||
                item.image ||
                "",
            name:
                item.name,
            metal:
                item.metal,
            weight:
                item.weight,
            quantity:
                item.quantity,
            price:
                item.price
        })
    );

    /* ---------------------------------- */
    /* Handlers                           */
    /* ---------------------------------- */

    const handleCloseAddressModal = useCallback(() => {
        setOpenAddressModal(false);
        setEditingAddress(null);
    }, []);

    const handleAddAddress = useCallback(() => {
        setEditingAddress(null);
        setOpenAddressModal(true);
    }, []);

    const handleEditAddress = useCallback(
        (address: Address) => {
            setEditingAddress(address);
            setOpenAddressModal(true);
        },
        []
    );

    const handleCheckout = useCallback(async () => {
        console.log("HANDLE CHECKOUT START");

        if (
            cartItems.length === 0
        ) {
            setCheckoutError(
                "Your bag is empty. Add a piece to continue."
            );
            return;
        }

        if (
            !selectedAddressId
        ) {
            setCheckoutError(
                "Please select a delivery address to continue."
            );
            return;
        }

        setCheckoutError(null);
        setLoading(true);

        try {
            const selectedAddress =
                addresses.find(
                    address =>
                        address._id === selectedAddressId
                );

            console.log("Calling Order API");

            const response = await orderService.createOrder({
                products: cartItems.map((item: any) => ({
                    productID:
                        item.productId ||
                        item.productID ||
                        item._id ||
                        item.id,

                    quantity:
                        item.quantity
                })),

                shippingAddress:
                    selectedAddress,

                deliveryMethod:
                    selectedDelivery,

                giftBox,

                giftWrap,

                hideInvoice,

                giftMessage,

                notes,

                subtotal:
                    pricing.subtotal,

                shippingCharge:
                    pricing.shipping,

                discount:
                    pricing.discount,

                gst:
                    pricing.gst,

      totalAmount:
    pricing.grandTotal

            });

            console.log(response);

            navigate(
                "/payment",
                {
                    state: {
                        orderID:
                            response.order.orderID,

                        addressId:
                            selectedAddressId
                    }
                }
            );
        } catch (error) {
            console.error(error);
            setCheckoutError(
                "Unable to create your order. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, [
        cartItems,
        selectedAddressId,
        addresses,
        selectedDelivery,
        giftBox,
        giftWrap,
        hideInvoice,
        giftMessage,
        notes,
        pricing.subtotal,
        pricing.shipping,
        pricing.discount,
        pricing.gst,
        navigate
    ]);

    /* ---------------------------------- */
    /* JSX                                */
    /* ---------------------------------- */

    return (
        <>
            <TopBar />

            <Navbar />

            <main className="hiranya-checkout-page">

                <CheckoutHero
                    itemCount={
                        cartItems.length
                    }
                />

                <CheckoutStepper
                    currentStep={2}
                />

                {checkoutError && (
                    <div
                        className="hiranya-checkout-container"
                        style={{ marginBottom: 0, marginTop: 0 }}
                    >
                        <div
                            className="hiranya-checkout-error-banner"
                            role="alert"
                            aria-live="assertive"
                        >
                            <span className="hiranya-checkout-error-dot" />
                            <p>{checkoutError}</p>
                        </div>
                    </div>
                )}

                <div className="hiranya-checkout-container">

                    <div className="hiranya-checkout-left">

                        <AddressSection
                            selectedAddressId={selectedAddressId}
                            setSelectedAddressId={
                                setSelectedAddressId
                            }
                            onAddAddress={handleAddAddress}
                            onEditAddress={handleEditAddress}
                        />

                        <DeliverySection
                            selectedDelivery={selectedDelivery}
                            setSelectedDelivery={
                                setSelectedDelivery
                            }
                        />

                        <GiftSection
                            giftBox={giftBox}
                            setGiftBox={setGiftBox}
                            giftWrap={giftWrap}
                            setGiftWrap={setGiftWrap}
                            hideInvoice={hideInvoice}
                            setHideInvoice={
                                setHideInvoice
                            }
                            giftMessage={giftMessage}
                            setGiftMessage={
                                setGiftMessage
                            }
                        />

                        <NotesSection
                            notes={notes}
                            setNotes={setNotes}
                        />

                    </div>

                    <div className="hiranya-checkout-right">

                        {selectedCoupon && (
                            <div className="coupon-success" style={{ marginBottom: "1rem" }}>
                                <div>
                                    <span>Coupon Applied: {selectedCoupon.code}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: "0.875rem", color: "#2e7d32" }}>
                                    You Saved ₹{pricing.discount.toLocaleString("en-IN")}
                                </p>
                            </div>
                        )}

                        <SummarySection
                            products={summaryProducts}
                            subtotal={pricing.subtotal}
                            discount={pricing.discount}
                            shipping={pricing.shipping}
                            giftCharges={pricing.giftWrapCharge}
                            gst={pricing.gst}
                            total={pricing.grandTotal}
                            itemCount={cartItems.length}
                            selectedCoupon={selectedCoupon}
                            onProceed={handleCheckout}
                            loading={loading}
                        />

                        <TrustSection />

                    </div>

                </div>

                <StickyCTA
                    total={pricing.grandTotal}
                    loading={loading}
                    onProceed={handleCheckout}
                />

            </main>

            <Footer />

            <AddressModal
                open={openAddressModal}
                onClose={handleCloseAddressModal}
                editAddress={editingAddress}
                onSubmit={async (data) => {
                    if (editingAddress?._id) {
                        await updateAddress(
                            editingAddress._id,
                            data
                        );
                    } else {
                        await addAddress(data);
                    }
                    handleCloseAddressModal();
                }}
            />

        </>
    );
};

export default React.memo(Checkout);