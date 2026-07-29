import React from "react";

import {

    MapPin,

    PlusCircle,

    Sparkles

} from "lucide-react";

import "./EmptyAddress.css";

interface Props{

    onAddAddress:()=>void;

}

const EmptyAddress:React.FC<Props>=({

    onAddAddress

})=>{

    return(

        <section className="hiranya-empty-address">

            <div className="hiranya-empty-glow"></div>

            <div className="hiranya-empty-icon">

                <MapPin size={58}/>

            </div>

            <div className="hiranya-empty-content">

                <span>

                    <Sparkles size={16}/>

                    HIRANYA

                </span>

                <h2>

                    No Saved Addresses

                </h2>

                <p>

                    Save your delivery address to enjoy a faster,

                    smoother and more luxurious checkout experience.

                </p>

            </div>

            <button

                className="hiranya-empty-btn"

                onClick={onAddAddress}

            >

                <PlusCircle size={18}/>

                Add Your First Address

            </button>

        </section>

    );

};

export default EmptyAddress;