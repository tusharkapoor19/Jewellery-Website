import React from "react";

import "./AddressSkeleton.css";

const SkeletonCard = () => {

    return (

        <div className="hiranya-address-skeleton">

            <div className="hiranya-sk-header">

                <div className="hiranya-sk-chip"></div>

                <div className="hiranya-sk-badge"></div>

            </div>

            <div className="hiranya-sk-title"></div>

            <div className="hiranya-sk-phone"></div>

            <div className="hiranya-sk-line"></div>

            <div className="hiranya-sk-line"></div>

            <div className="hiranya-sk-line short"></div>

            <div className="hiranya-sk-footer">

                <div className="hiranya-sk-btn"></div>

                <div className="hiranya-sk-btn"></div>

                <div className="hiranya-sk-btn"></div>

            </div>

        </div>

    );

};

const AddressSkeleton:React.FC=()=>{

    return(

        <div className="hiranya-skeleton-grid">

            {

                Array.from({

                    length:4

                }).map((_,index)=>(

                    <SkeletonCard

                        key={index}

                    />

                ))

            }

        </div>

    );

};

export default AddressSkeleton;