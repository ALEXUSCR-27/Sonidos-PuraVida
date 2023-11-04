//LIBRARIES
import { Link } from "react-router-dom";
import React from "react";

//STYLES
import '../syles/general.css';

export default function Header() {
    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;
    return (
        <nav >
            <div className="header-square">
                <div>
                    <a className="header-logo" href={urlPort}></a>
                </div>
            </div>
            <div className="header-navbar">
                    <Link to={urlPort}>
                        <button className="header-navbar-buttons">INICIO</button>
                    </Link>
                    
            </div>
        </nav>


    );
}