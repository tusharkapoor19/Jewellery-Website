import React, {
    useEffect
} from "react";

import {
    AlertTriangle,
    Trash2,
    X
} from "lucide-react";

import "./DeleteAddressModal.css";

interface Props {

    open: boolean;

    loading: boolean;

    addressName?: string;

    onClose: () => void;

    onConfirm: () => Promise<void>;

}

const DeleteAddressModal: React.FC<Props> = ({

    open,

    loading,

    addressName,

    onClose,

    onConfirm

}) => {

    useEffect(() => {

        const handleEsc = (

            e: KeyboardEvent

        ) => {

            if (

                e.key === "Escape"

            ) {

                onClose();

            }

        };

        window.addEventListener(

            "keydown",

            handleEsc

        );

        return () => {

            window.removeEventListener(

                "keydown",

                handleEsc

            );

        };

    }, [onClose]);

    if (!open) {

        return null;

    }

    return (

        <div

            className="hiranya-delete-overlay"

            onClick={onClose}

        >

            <div

                className="hiranya-delete-modal"

                onClick={(e) =>

                    e.stopPropagation()

                }

            >

                <button

                    className="hiranya-delete-close"

                    onClick={onClose}

                    disabled={loading}

                >

                    <X size={20} />

                </button>

                <div className="hiranya-delete-icon">

                    <AlertTriangle size={42} />

                </div>

                <h2>

                    Delete Address

                </h2>

                <p>

                    Are you sure you want to permanently delete

                    <strong>

                        {" "}

                        {addressName ||

                            "this address"}

                    </strong>

                    ?

                </p>

                <span>

                    This action cannot be undone.

                </span>

                <div className="hiranya-delete-actions">

                    <button

                        className="hiranya-delete-cancel"

                        onClick={onClose}

                        disabled={loading}

                    >

                        Cancel

                    </button>

                    <button

                        className="hiranya-delete-confirm"

                        disabled={loading}

                        onClick={onConfirm}

                    >

                        <Trash2 size={16} />

                        {

                            loading

                                ? "Deleting..."

                                : "Delete Address"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteAddressModal;