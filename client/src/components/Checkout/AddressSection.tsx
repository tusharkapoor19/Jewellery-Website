import React, {
    useMemo
} from "react";

import {
    Home,
    Building2,
    MapPin,
    Plus,
    Pencil,
    CheckCircle2
} from "lucide-react";

import { useAddress } from "../../context/AddressContext";
import { Address } from "../../types/address";

interface AddressSectionProps {

    selectedAddressId: string;

    setSelectedAddressId: React.Dispatch<
        React.SetStateAction<string>
    >;

    onAddAddress: () => void;

    onEditAddress: (

        address: Address

    ) => void;

}

const AddressSection: React.FC<AddressSectionProps> = ({

    selectedAddressId,

    setSelectedAddressId,

    onAddAddress,

    onEditAddress

}) => {

    const {

        addresses,

        loading

    } = useAddress();

    const sortedAddresses = useMemo(() => {

        return [...addresses].sort(

            (a, b) =>

                Number(b.isDefault) -

                Number(a.isDefault)

        );

    }, [addresses]);

    const getIcon = (

        type: string

    ) => {

        switch (

            type.toLowerCase()

        ) {

            case "home":

                return <Home size={18} />;

            case "office":

                return <Building2 size={18} />;

            default:

                return <MapPin size={18} />;

        }

    };

    if (loading) {

        return (

            <section className="hiranya-checkout-section">

                <div className="hiranya-section-header">

                    <h2>

                        Delivery Address

                    </h2>

                </div>

                <div className="hiranya-address-loading">

                    Loading addresses...

                </div>

            </section>

        );

    }

    return (

        <section className="hiranya-checkout-section">

            <div className="hiranya-section-header">

                <div>

                    <p className="hiranya-section-tag">

                        STEP 01

                    </p>

                    <h2>

                        Delivery Address

                    </h2>

                </div>

                <button

                    type="button"

                    className="hiranya-outline-btn"

                    onClick={onAddAddress}

                >

                    <Plus size={16} />

                    Add Address

                </button>

            </div>

            {

                sortedAddresses.length === 0 ? (

                    <div className="hiranya-empty-address">

                        <MapPin size={48} />

                        <h3>

                            No Saved Address

                        </h3>

                        <p>

                            Save your first delivery

                            address to continue.

                        </p>

                        <button

                            className="hiranya-gold-btn"

                            onClick={onAddAddress}

                        >

                            <Plus size={18} />

                            Add Address

                        </button>

                    </div>

                ) : (

                    <div className="hiranya-address-grid">

                        {

                            sortedAddresses.map(

                                (

                                    address

                                ) => {

                                    const selected =

                                        selectedAddressId ===

                                        address._id;

                                    return (

                                        <div

                                            key={

                                                address._id

                                            }

                                            className={`

                                            hiranya-address-card

                                            ${

                                                selected

                                                    ?

                                                "selected"

                                                    :

                                                ""

                                            }

                                        `}

                                            onClick={() =>

                                                setSelectedAddressId(

                                                    address._id!

                                                )

                                            }

                                        >

                                            <div className="hiranya-address-top">

                                                <div className="hiranya-address-type">

                                                    {

                                                        getIcon(

                                                            address.addressType

                                                        )

                                                    }

                                                    <span>

                                                        {

                                                            address.addressType

                                                        }

                                                    </span>

                                                </div>

                                                {

                                                    address.isDefault && (

                                                        <div className="hiranya-default-badge">

                                                            <CheckCircle2

                                                                size={15}

                                                            />

                                                            Default

                                                        </div>

                                                    )

                                                }

                                            </div>

                                            <div className="hiranya-address-body">

                                                <h4>

                                                    {

                                                        address.fullName

                                                    }

                                                </h4>

                                                <p>

                                                    {

                                                        address.phone

                                                    }

                                                </p>

                                                <p>

                                                    {

                                                        address.houseNumber

                                                    }

                                                    {", "}

                                                    {

                                                        address.street

                                                    }

                                                </p>

                                                <p>

                                                    {

                                                        address.area

                                                    }

                                                </p>

                                                {

                                                    address.landmark && (

                                                        <p>

                                                            {

                                                                address.landmark

                                                            }

                                                        </p>

                                                    )

                                                }

                                                <p>

                                                    {

                                                        address.city

                                                    }

                                                    {", "}

                                                    {

                                                        address.state

                                                    }

                                                </p>

                                                <p>

                                                    {

                                                        address.pincode

                                                    }

                                                </p>

                                                <p>

                                                    {

                                                        address.country

                                                    }

                                                </p>

                                            </div>

                                            <div className="hiranya-address-footer">

                                                <button

                                                    type="button"

                                                    onClick={(e) => {

                                                        e.stopPropagation();

                                                        onEditAddress(

                                                            address

                                                        );

                                                    }}

                                                >

                                                    <Pencil

                                                        size={15}

                                                    />

                                                    Edit

                                                </button>

                                            </div>

                                        </div>

                                    );

                                }

                            )

                        }

                    </div>

                )

            }

        </section>

    );

};

export default React.memo(AddressSection);