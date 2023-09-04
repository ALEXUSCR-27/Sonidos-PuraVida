//LIBRERIES
import { Link } from 'react-router-dom';

//COMPONENTS
import NavBar from './Header';




function MainPage() {
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <Link to = "http://localhost:3000/postPublication">
                    <button>registrar</button>
                </Link>
            </div>
            
        </div>
    );
}

export default MainPage;