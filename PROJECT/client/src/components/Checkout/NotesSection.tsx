import React from "react";

import {
    FileText
} from "lucide-react";

interface NotesSectionProps {

    notes: string;

    setNotes: React.Dispatch<
        React.SetStateAction<string>
    >;

}

const NotesSection: React.FC<NotesSectionProps> = ({

    notes,

    setNotes

}) => {

    return (

        <section className="hiranya-checkout-section">

            <div className="hiranya-section-header">

                <div>

                    <p className="hiranya-section-tag">

                        STEP 04

                    </p>

                    <h2>

                        Delivery Instructions

                    </h2>

                </div>

            </div>

            <div className="hiranya-notes-card">

                <div className="hiranya-notes-icon">

                    <FileText size={22} />

                </div>

                <div className="hiranya-notes-content">

                    <h4>

                        Additional Instructions

                    </h4>

                    <p>

                        Help our delivery partner with any special
                        instructions regarding your order.

                    </p>

                    <textarea

                        className="hiranya-notes-textarea"

                        rows={5}

                        maxLength={500}

                        placeholder="Example: Deliver after 6 PM, Call before arrival, Leave at reception, Ring size confirmation, Surprise gift, etc."

                        value={notes}

                        onChange={(e) =>

                            setNotes(

                                e.target.value

                            )

                        }

                    />

                    <div className="hiranya-notes-footer">

                        <span>

                            Maximum 500 characters

                        </span>

                        <span>

                            {notes.length}/500

                        </span>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default React.memo(NotesSection);