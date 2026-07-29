import React from "react";

import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import Sidebar from "../../components/Sidebar/Sidebar";
import Canvas from "../../components/Canvas/Canvas";
import Toolbar from "../../components/Toolbar/Toolbar";

import { useImageStore } from "../../store/imageStore";

const TryOn: React.FC = () => {

    const photoDataUrl = useImageStore((s) => s.photoDataUrl);

    return (

        <>

            <TopBar />

            <Navbar />
            <br /><br /><br />
            <div className="app-shell">
                {/* <Header /> */}
                <div className={`app-body ${photoDataUrl ? "" : "app-body-collapsed"}`}>

                    <Sidebar />

                    <Canvas />

                    {photoDataUrl && <Toolbar />}

                </div>

            </div><br /><br />

            <Footer />

        </>

    );

};

export default TryOn;