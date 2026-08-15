import "./Payment.css";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate, useLocation } from "react-router-dom";

import {
  ShieldCheck,
  LockKeyhole,
  CreditCard,
  Wallet,
  Gift,
  MapPin,
  Truck,
  BadgeCheck,
  Receipt,
  FileText,
  Sparkles,
  Loader2,
  RefreshCw,
  CalendarDays,
  PackageCheck,
  ArrowLeft,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import toast from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar";
import TopBar from "../../components/TopBar/TopBar";
import Footer from "../../components/Footer/Footer";

import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import productService from "../../services/productService";
import { useCart } from "../../context/CartContext";
declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions
    ) => RazorpayInstance;
  }
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
  handler: (response: RazorpayResponse) => void;
}

interface RazorpayInstance {
  open(): void;
}

interface ProductItem {
  productID: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface OrderData {
  orderID: string;
  userID: string;
  products: ProductItem[];
  shippingAddress: ShippingAddress;
  deliveryMethod: string;
  giftBox: boolean;
  giftWrap: boolean;
  hideInvoice: boolean;
  giftMessage?: string;
  notes?: string;
  subtotal: number;
  shippingCharge: number;
  discount: number;
  gst: number;
  totalAmount: number;
  orderStatus: string;
}

interface CreatePaymentResponse {
  success: boolean;
  message: string;

  payment: {
    paymentID: string;
    orderID: string;
    amount: number;
  };

  razorpayOrder: {
    id: string;
    amount: number;
    currency: string;
  };
}

interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderID: string;
}

const Payment = () => {
  const navigate = useNavigate();

  const { clearCart } = useCart();


  const location = useLocation();

const orderID = location.state?.orderID;

  const [order, setOrder] = useState<OrderData | null>(null);

  const [loading, setLoading] = useState(true);

  const [processingPayment, setProcessingPayment] =
    useState(false);

  const [retryLoading, setRetryLoading] =
    useState(false);

  const [pageError, setPageError] =
    useState<string>("");

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const paymentStartedRef = useRef(false);

  const paymentVerifiedRef = useRef(false);

  const estimatedDelivery = useMemo(() => {
    const date = new Date();

    date.setDate(
      date.getDate() +
        (order?.deliveryMethod === "Express" ? 2 : 6)
    );

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [order]);

  const loadOrder = useCallback(async () => {
    if (!orderID) {
      setPageError("Order not found.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setPageError("");

      const response =
  await orderService.getOrder(orderID);
  console.log("ORDER RESPONSE", response);

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to load order."
        );
      }
console.log(
  "ORDER OBJECT",
  JSON.stringify(response.order, null, 2)
);
      const orderData = response.order;

const productsWithImages = await Promise.all(
  orderData.products.map(async (product: ProductItem) => {
    try {
      const productData =
        await productService.getProductById(product.productID);

      return {
        ...product,
        image:
          productData?.image ||
          productData?.images?.[0] ||
          ""
      };
    } catch (error) {
      console.error(
        `Failed to load image for ${product.productID}`,
        error
      );

      return product;
    }
  })
);

setOrder({
  ...orderData,
  products: productsWithImages
});
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setPageError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [orderID]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const verifyPayment = useCallback(
    async (payload: VerifyPaymentPayload) => {
      if (paymentVerifiedRef.current) return;

      paymentVerifiedRef.current = true;

      try {
        const response =
          await paymentService.verifyPayment(payload);

        if (!response?.success) {
          throw new Error(
            response?.message ||
              "Payment verification failed."
          );
        }

        toast.success("Payment successful.");

        /*
         * Order paid for successfully — the purchased
         * items no longer belong in the cart. Clear it
         * on the backend (not just local state) so it
         * doesn't reappear on the next cart refresh/poll.
         */
        await clearCart();

       navigate("/order-success", {
    replace: true,
    state: {
        orderID: payload.orderID,
    },
});
      } catch (error) {
        paymentVerifiedRef.current = false;

        paymentStartedRef.current = false;

        const message =
          error instanceof Error
            ? error.message
            : "Payment verification failed.";

        toast.error(message);
      } finally {
        setProcessingPayment(false);
      }
    },
    [navigate, clearCart]
  );
    const initializePayment = useCallback(async () => {
    if (!order) {
      toast.error("Order details are unavailable.");
      return;
    }

    if (!acceptedTerms) {
      toast.error(
        "Please accept the Terms & Conditions before continuing."
      );
      return;
    }

    if (paymentStartedRef.current) {
      return;
    }

    paymentStartedRef.current = true;

    setProcessingPayment(true);

    try {
      const response: CreatePaymentResponse =
        await paymentService.createPayment(order.orderID);

      if (!response?.success) {
        throw new Error(
          "Unable to initiate payment."
        );
      }

      if (!window.Razorpay) {
        throw new Error(
          "Payment gateway failed to load."
        );
      }

    const options: RazorpayOptions = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID!,

    amount: response.razorpayOrder.amount,

    currency: response.razorpayOrder.currency,

    name: "HIRANYA Jewellery",

    description: `Payment for Order #${order.orderID}`,

    image: "/favicon.png",

    order_id: response.razorpayOrder.id,

        prefill: {
          name: order.shippingAddress.fullName,
          email: order.shippingAddress.email,
          contact: order.shippingAddress.phone,
        },

        notes: {
          orderID: order.orderID,
        },

        theme: {
          color: "#C6A45D",
        },

        modal: {
          ondismiss: async () => {
            /*
             * If verification for a completed payment is
             * already underway (rare race between the
             * handler firing and the modal closing), don't
             * cancel the order out from under it.
             */
            if (paymentVerifiedRef.current) {
              return;
            }

            paymentStartedRef.current = false;
            setProcessingPayment(false);

            toast("Payment cancelled.");

            /*
             * The order was created (as "Pending") before
             * payment started. Since the payment was
             * cancelled/abandoned, cancel that order now so
             * it doesn't linger and look like a placed
             * order — this also restores the reserved
             * stock. The cart is untouched, so the product
             * remains in it.
             */
            try {
              await orderService.cancelOrder(order.orderID);
            } catch (cancelError) {
              console.error(
                "Failed to auto-cancel order after payment dismissal:",
                cancelError
              );
            }
          },
        },

        handler: async (razorpayResponse) => {
          await verifyPayment({
            razorpay_order_id:
              razorpayResponse.razorpay_order_id,

            razorpay_payment_id:
              razorpayResponse.razorpay_payment_id,

            razorpay_signature:
              razorpayResponse.razorpay_signature,

            orderID: order.orderID,
          });
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      paymentStartedRef.current = false;

      paymentVerifiedRef.current = false;

      setProcessingPayment(false);

      const message =
        error instanceof Error
          ? error.message
          : "Unable to continue payment.";

      toast.error(message);
    }
  }, [
    acceptedTerms,
    order,
    verifyPayment,
  ]);

  const retryPayment = useCallback(async () => {
    setRetryLoading(true);

    try {
      await initializePayment();
    } finally {
      setRetryLoading(false);
    }
  }, [initializePayment]);

  const formattedSubtotal = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(order?.subtotal ?? 0);
  }, [order]);

  const formattedShipping = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(order?.shippingCharge ?? 0);
  }, [order]);

  const formattedGST = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(order?.gst ?? 0);
  }, [order]);

  const formattedDiscount = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(order?.discount ?? 0);
  }, [order]);

  const formattedTotal = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(order?.totalAmount ?? 0);
  }, [order]);

  if (loading) {
    return (
      <>
        <TopBar />
        <Navbar />

        <div className="payment-page">
          <div className="payment-container payment-loading">
            <div className="payment-skeleton-header shimmer" />

            <div className="payment-skeleton-layout">
              <div className="payment-skeleton-left">
                <div className="payment-skeleton-card shimmer" />
                <div className="payment-skeleton-card shimmer" />
                <div className="payment-skeleton-card shimmer" />
                <div className="payment-skeleton-card shimmer" />
              </div>

              <div className="payment-skeleton-right">
                <div className="payment-skeleton-summary shimmer" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (pageError) {
    return (
      <>
        <TopBar />
        <Navbar />

        <div className="payment-page">
          <div className="payment-error-state">

            <RefreshCw size={54} />

            <h2>
              Unable to Load Payment
            </h2>

            <p>{pageError}</p>

            <div className="payment-error-actions">

              <button
                className="payment-primary-btn"
                onClick={loadOrder}
              >
                Try Again
              </button>

              <button
                className="payment-secondary-btn"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={18} />
                Go Back
              </button>

            </div>

          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <TopBar />
        <Navbar />

        <div className="payment-page">

          <div className="payment-empty-state">

            <Receipt size={60} />

            <h2>
              Order Not Found
            </h2>

            <p>
              We couldn't find the order you're trying to pay for.
            </p>

            <button
              className="payment-primary-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />

      <motion.main
        className="payment-page"
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
      >
        <div className="payment-container">

          <div className="payment-header">

            <div>

              <span className="payment-badge">
                <Sparkles size={16} />
                Secure Checkout
              </span>

              <h1>Complete Your Payment</h1>

              <p>
                Your order has been created successfully. Complete your
                payment securely using Razorpay to start processing your
                jewellery.
              </p>

            </div>

          </div>

          <div className="payment-layout">

            <section className="payment-left">

              <motion.article
                className="payment-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >

                <div className="payment-card-title">

                  <PackageCheck size={22} />

                  <h2>Ordered Products</h2>

                </div>

                <div className="payment-products">

                  {order.products.map((product) => (

                    <div
                      key={product.productID}
                      className="payment-product"
                    >

                      <div className="payment-product-image">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        ) : (
                          <PackageCheck size={26} />
                        )}

                      </div>
                      <div className="payment-product-details">

                        <h3>{product.name}</h3>

                        <span>
                          Qty : {product.quantity}
                        </span>

                      </div>

                      <div className="payment-product-price">

                        ₹
                        {(
                          product.price *
                          product.quantity
                        ).toLocaleString("en-IN")}

                      </div>

                    </div>

                  ))}

                </div>

              </motion.article>

              <motion.article
                className="payment-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >

                <div className="payment-card-title">

                  <MapPin size={22} />

                  <h2>Delivery Address</h2>

                </div>

                <div className="payment-address">

                  <h3>
                    {order.shippingAddress.fullName}
                  </h3>

                  <p>
                    {order.shippingAddress.addressLine1}
                  </p>

                  {order.shippingAddress.addressLine2 && (
                    <p>
                      {order.shippingAddress.addressLine2}
                    </p>
                  )}

                  <p>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state}
                  </p>

                  <p>
                    {order.shippingAddress.country} -{" "}
                    {order.shippingAddress.postalCode}
                  </p>

                  <div className="payment-contact-row">

                    <span>
                      {order.shippingAddress.phone}
                    </span>

                    <span>
                      {order.shippingAddress.email}
                    </span>

                  </div>

                </div>

              </motion.article>

              <motion.article
                className="payment-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >

                <div className="payment-card-title">

                  <Gift size={22} />

                  <h2>Gift Preferences</h2>

                </div>

                <div className="gift-grid">

                  <div
                    className={`gift-item ${
                      order.giftBox ? "active" : ""
                    }`}
                  >

                    <Gift size={18} />

                    <span>Luxury Gift Box</span>

                    <strong>
                      {order.giftBox ? "Yes" : "No"}
                    </strong>

                  </div>

                  <div
                    className={`gift-item ${
                      order.giftWrap ? "active" : ""
                    }`}
                  >

                    <Gift size={18} />

                    <span>Gift Wrapping</span>

                    <strong>
                      {order.giftWrap ? "Yes" : "No"}
                    </strong>

                  </div>

                  <div
                    className={`gift-item ${
                      order.hideInvoice ? "active" : ""
                    }`}
                  >

                    <Receipt size={18} />

                    <span>Hide Invoice</span>

                    <strong>
                      {order.hideInvoice ? "Yes" : "No"}
                    </strong>

                  </div>

                </div>

                {order.giftMessage && (

                  <div className="payment-message-box">

                    <h4>Gift Message</h4>

                    <p>{order.giftMessage}</p>

                  </div>

                )}

              </motion.article>

              {order.notes && (

                <motion.article
                  className="payment-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >

                  <div className="payment-card-title">

                    <FileText size={22} />

                    <h2>Order Notes</h2>

                  </div>

                  <div className="payment-notes">

                    {order.notes}

                  </div>

                </motion.article>

              )}

              <motion.article
                className="payment-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >

                <div className="payment-card-title">

                  <Truck size={22} />

                  <h2>Delivery Information</h2>

                </div>

                <div className="delivery-row">

                  <CalendarDays size={18} />

                  <span>
                    Estimated Delivery
                  </span>

                  <strong>
                    {estimatedDelivery}
                  </strong>

                </div>

                <div className="delivery-row">

                  <Truck size={18} />

                  <span>
                    Delivery Method
                  </span>

                  <strong>
                    {order.deliveryMethod}
                  </strong>

                </div>

              </motion.article>

            </section>

            <aside className="payment-right">

                          <motion.div
                className="payment-summary-card"
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="payment-summary-header">
                  <h2>Order Summary</h2>

                  <span className="payment-order-id">
                    #{order.orderID}
                  </span>
                </div>

                <div className="payment-summary-body">

                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>{formattedSubtotal}</strong>
                  </div>

                  <div className="summary-row">
                    <span>Shipping</span>
                    <strong>{formattedShipping}</strong>
                  </div>

                  <div className="summary-row">
                    <span>GST</span>
                    <strong>{formattedGST}</strong>
                  </div>

                  <div className="summary-row discount">
                    <span>Discount</span>
                    <strong>- {formattedDiscount}</strong>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-total">
                    <span>Total Payable</span>

                    <h3>{formattedTotal}</h3>
                  </div>

                </div>

                <div className="payment-security-list">

                  <div className="security-item">
                    <ShieldCheck size={20} />

                    <div>
                      <h4>256-bit SSL Encryption</h4>

                      <p>
                        Your payment information is fully encrypted.
                      </p>
                    </div>
                  </div>

                  <div className="security-item">
                    <LockKeyhole size={20} />

                    <div>
                      <h4>Secure Checkout</h4>

                      <p>
                        Powered by Razorpay secure payment gateway.
                      </p>
                    </div>
                  </div>

                  <div className="security-item">
                    <BadgeCheck size={20} />

                    <div>
                      <h4>Trusted Luxury Store</h4>

                      <p>
                        Authentic premium jewellery with protected
                        transactions.
                      </p>
                    </div>
                  </div>

                </div>

                <div className="payment-terms">

                  <label className="checkbox-wrapper">

                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) =>
                        setAcceptedTerms(
                          e.target.checked
                        )
                      }
                    />

                    <span className="checkbox-custom" />

                    <span className="checkbox-text">
                      I agree to the Terms &
                      Conditions, Privacy Policy and
                      Refund Policy of HIRANYA Jewellery.
                    </span>

                  </label>

                </div>

                <AnimatePresence mode="wait">

                  {processingPayment ? (

                    <motion.button
                      key="processing"
                      className="payment-pay-btn loading"
                      disabled
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      <Loader2
                        size={20}
                        className="spin"
                      />

                      Processing Payment...
                    </motion.button>

                  ) : (

                    <motion.button
                      key="paynow"
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="payment-pay-btn"
                      onClick={initializePayment}
                    >
                      <CreditCard size={20} />

                      Pay {formattedTotal}
                    </motion.button>

                  )}

                </AnimatePresence>

                <button
                  className="payment-retry-btn"
                  onClick={retryPayment}
                  disabled={
                    retryLoading ||
                    processingPayment
                  }
                >
                  {retryLoading ? (
                    <>
                      <Loader2
                        size={18}
                        className="spin"
                      />

                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={18} />

                      Retry Payment
                    </>
                  )}
                </button>
                                <div className="payment-methods">

                  <h3>
                    <Wallet size={18} />
                    Accepted Payment Methods
                  </h3>

                  <div className="payment-method-grid">

                    <div className="payment-method-card">
                      <CreditCard size={22} />
                      <span>Cards</span>
                    </div>

                    <div className="payment-method-card">
                      <Wallet size={22} />
                      <span>UPI</span>
                    </div>

                    <div className="payment-method-card">
                      <Receipt size={22} />
                      <span>Net Banking</span>
                    </div>

                    <div className="payment-method-card">
                      <ShieldCheck size={22} />
                      <span>Wallets</span>
                    </div>

                  </div>

                </div>

                <div className="payment-info-card">

                  <h3>
                    <ShieldCheck size={18} />
                    Why Shop With HIRANYA?
                  </h3>

                  <ul>

                    <li>
                      <BadgeCheck size={16} />
                      100% Authentic Jewellery
                    </li>

                    <li>
                      <BadgeCheck size={16} />
                      Secure Razorpay Payments
                    </li>

                    <li>
                      <BadgeCheck size={16} />
                      Fully Insured Shipping
                    </li>

                    <li>
                      <BadgeCheck size={16} />
                      Luxury Premium Packaging
                    </li>

                    <li>
                      <BadgeCheck size={16} />
                      Easy Order Tracking
                    </li>

                  </ul>

                </div>

                <div className="payment-note-card">

                  <h3>
                    <FileText size={18} />
                    Important Information
                  </h3>

                  <p>
                    Once your payment is successfully verified, your order
                    will immediately move to processing. You'll receive
                    confirmation and tracking updates as your jewellery is
                    prepared and dispatched.
                  </p>

                </div>

              </motion.div>

            </aside>

          </div>

        </div>

      </motion.main>

      <Footer />

    </>
  );
};

export default Payment;