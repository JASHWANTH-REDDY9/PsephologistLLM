import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import Content from "./components/Content";
import "./components/stylesidebar.css";
// import BjpChart from "./charts/BjpChart";

const Party = () => {
    const [selected, setSelected] = useState(1);

    const handleSelect = (buttonIndex) => {
        setSelected(buttonIndex);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginRight:'8%' }}>
            <Header />
            <div style={{ flex: '1', display: 'flex', flexDirection: 'row' }}>
                <Sidebar onSelect={handleSelect} />
                {/* <BjpChart /> */}
                <Content selected={selected} />
            </div>
            <Footer />
        </div>
    );
};

export default Party;