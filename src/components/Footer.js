//LIBRARIES
import { Link } from "react-router-dom";

//STYLES
import '../syles/general.css';

export default function Footer() {
    return (
        <div className="footer">
            <a  href="http://localhost:3000/" ></a>
            <Link to="http://localhost:3000/">
                <button className="navButton" style={{left:"25%", top:"23px"}}>INICIO</button>
            </Link>
        </div>
        


    );
}