import React from "react";

import {
    Home,
    Building2,
    MapPin,
    Phone,
    Pencil,
    Trash2,
    CheckCircle2,
    Crown
} from "lucide-react";

import { Address } from "../../types/address";

import "./AddressCard.css";

interface Props {

    address: Address;

    onEdit: (address: Address) => void;

    onDelete: (address: Address) => void;

    onSetDefault: (addressId: string) => void;

}

const AddressCard: React.FC<Props> = ({

    address,

    onEdit,

    onDelete,

    onSetDefault

}) => {

    const renderIcon = () => {

        switch (address.addressType) {

            case "Home":

                return <Home size={18} />;

            case "Office":

                return <Building2 size={18} />;

            default:

                return <MapPin size={18} />;

        }

    };

    return (

        <article className="hiranya-address-card">

            <div className="hiranya-address-glow"></div>

            <div className="hiranya-address-header">

                <div className="hiranya-address-type">

                    {renderIcon()}

                    <span>

                        {address.addressType}

                    </span>

                </div>

                {

                    address.isDefault && (

                        <div className="hiranya-default-badge">

                            <Crown size={14} />

                            Default

                        </div>

                    )

                }

            </div>

            <div className="hiranya-address-body">

                <h3>

                    {address.fullName}

                </h3>

                <p className="hiranya-phone">

                    <Phone size={14} />

                    {address.phone}

                </p>

                <div className="hiranya-full-address">

                    <p>

                        {address.houseNumber}

                    </p>

                    <p>

                        {address.street}

                    </p>

                    <p>

                        {address.area}

                    </p>

                    {

                        address.landmark && (

                            <p>

                                {address.landmark}

                            </p>

                        )

                    }

                    <p>

                        {address.city},{" "}

                        {address.state}

                    </p>

                    <p>

                        {address.country} - {address.pincode}

                    </p>

                </div>

            </div>

            <div className="hiranya-address-footer">

                <button

                    className="hiranya-address-btn secondary"

                    onClick={() =>

                        onEdit(address)

                    }

                >

                    <Pencil size={16} />

                    Edit

                </button>

                <button

                    className="hiranya-address-btn danger"

                    onClick={() =>

                        onDelete(address)

                    }

                >

                    <Trash2 size={16} />

                    Delete

                </button>

                {

                    !address.isDefault && (

                        <button

                            className="hiranya-address-btn primary"

                            onClick={() =>

                                onSetDefault(

                                    address._id

                                )

                            }

                        >

                            <CheckCircle2 size={16} />

                            Set Default

                        </button>

                    )

                }

            </div>

        </article>

    );

};

export default AddressCard;