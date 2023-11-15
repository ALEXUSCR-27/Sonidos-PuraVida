//LIBRARIES
import { Link } from "react-router-dom";
import React from "react";

//STYLES
import '../styles/general.css';

export default function Header() {
    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;
    return (
        <nav >
            <div className="header-square">
                <div>
                    <a className="header-logo" href='/'></a>
                </div>
            </div>
            <div className="header-navbar">
                    <Link to='/'>
                        <button className="header-navbar-buttons">Inicio</button>
                    </Link>
                    <Link to={"/terms&conditions"}>
                        <button className="header-navbar-buttons">Términos de Uso</button>
                    </Link>
                    
            </div>
        </nav>


    );
}