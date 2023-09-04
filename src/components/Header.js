//LIBRARIES
import { Link } from "react-router-dom";

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
                    <button>INICIO</button>
                    <button>¿Quienes somos?</button>
                    <button>¿Que es Bioacústica?</button>
                    <button>Divulgacion</button>
                    <button>Desierto Chihuahuense</button>
                    <button>Simposio</button>
                    <button>Términos de uso</button>
            </div>
        </nav>


    );
}