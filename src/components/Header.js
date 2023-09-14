//LIBRARIES
import { Link } from "react-router-dom";
import React from "react";

//STYLES
import '../syles/general.css';

export default function Header() {
    return (
        <nav >
            <div className="header-square">
                <div>
                    <a className="header-logo" href="http://localhost:3000/"></a>
                </div>
            </div>
            <div className="header-navbar">
                    <Link to="http://localhost:3000/">
                        <button className="header-navbar-buttons">INICIO</button>
                    </Link>
                    
            </div>
        </nav>


    );
}