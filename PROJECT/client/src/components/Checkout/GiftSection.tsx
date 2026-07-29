import React from "react";

import {
    Gift,
    Sparkles,
    ScrollText,
    ShieldCheck
} from "lucide-react";

interface GiftSectionProps {

    giftBox: boolean;

    setGiftBox: React.Dispatch<
        React.SetStateAction<boolean>
    >;

    giftWrap: boolean;

    setGiftWrap: React.Dispatch<
        React.SetStateAction<boolean>
    >;

    hideInvoice: boolean;

    setHideInvoice: React.Dispatch<
        React.SetStateAction<boolean>
    >;

    giftMessage: string;

    setGiftMessage: React.Dispatch<
        React.SetStateAction<string>
    >;

}

const GiftSection: React.FC<GiftSectionProps> = ({

    giftBox,

    setGiftBox,

    giftWrap,

    setGiftWrap,

    hideInvoice,

    setHideInvoice,

    giftMessage,

    setGiftMessage

}) => {

    return (

        <section className="hiranya-checkout-section">

            <div className="hiranya-section-header">

                <div>

                    <p className="hiranya-section-tag">

                        STEP 03

                    </p>

                    <h2>

                        Luxury Gift Services

                    </h2>

                </div>

            </div>

            <div className="hiranya-gift-container">

                {/* Premium Gift Box */}

                <div className="hiranya-gift-item">

                    <div className="hiranya-gift-left">

                        <Gift size={20} />

                        <div>

                            <h4>

                                Premium Gift Box

                            </h4>

                            <p>

                                Elegant luxury jewellery

                                presentation box.

                            </p>

                        </div>

                    </div>

                    <label className="hiranya-switch">

                        <input

                            type="checkbox"

                            checked={giftBox}

                            onChange={(e) =>

                                setGiftBox(

                                    e.target.checked

                                )

                            }

                        />

                        <span />

                    </label>

                </div>

                {/* Gift Wrap */}

                <div className="hiranya-gift-item">

                    <div className="hiranya-gift-left">

                        <Sparkles size={20} />

                        <div>

                            <h4>

                                Signature Gift Wrap

                            </h4>

                            <p>

                                Luxury wrapping with

                                satin ribbon.

                            </p>

                        </div>

                    </div>

                    <label className="hiranya-switch">

                        <input

                            type="checkbox"

                            checked={giftWrap}

                            onChange={(e) =>

                                setGiftWrap(

                                    e.target.checked

                                )

                            }

                        />

                        <span />

                    </label>

                </div>

                {/* Hide Invoice */}

                <div className="hiranya-gift-item">

                    <div className="hiranya-gift-left">

                        <ShieldCheck size={20} />

                        <div>

                            <h4>

                                Hide Invoice

                            </h4>

                            <p>

                                Perfect for surprise gifts.

                            </p>

                        </div>

                    </div>

                    <label className="hiranya-switch">

                        <input

                            type="checkbox"

                            checked={hideInvoice}

                            onChange={(e) =>

                                setHideInvoice(

                                    e.target.checked

                                )

                            }

                        />

                        <span />

                    </label>

                </div>

                {/* Gift Message */}

                <div className="hiranya-gift-message">

                    <div className="hiranya-message-header">

                        <ScrollText size={20} />

                        <div>

                            <h4>

                                Personalized Gift Message

                            </h4>

                            <p>

                                Add a handwritten note

                                for your loved one.

                            </p>

                        </div>

                    </div>

                    <textarea

                        rows={4}

                        maxLength={250}

                        placeholder="Write your special message..."

                        value={giftMessage}

                        onChange={(e) =>

                            setGiftMessage(

                                e.target.value

                            )

                        }

                    />

                    <div className="hiranya-message-footer">

                        <span>

                            {giftMessage.length}/250

                        </span>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default React.memo(GiftSection);