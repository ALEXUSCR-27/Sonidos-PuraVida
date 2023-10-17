import React, { useState } from 'react';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';
import AdvertiseWindow from './AdvertiseWindow';

import '../syles/admin.css'
function AdminLogin() {
    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;


    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loginFlag, setLogin] = useState(false);
    const [message, setMessage] = useState("");
    const [titleModal, setTitleModal] = useState("");
    

    const handleUsername = (e) => {
        setUserName(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const [openAdvertiseW, setOpenAdvertiseW] = useState(false);

    const closeAdvertiseW = () => {
        setOpenAdvertiseW(false);
    };


    const login = () => {
        const route = "/server/router/routes.php?action=adminModule";
        const data = {
            username:username,
            password:password
        }

        console.log(data);
        console.log(url+route);
        axios.post(url+route, data)
        .then((response) => {
            console.log(response.data);
            if (response.data.result == 1 ) {
                window.location.href = urlPort+"adminPage";

            }
            else {
                var errorMessage = document.querySelector(".error-message");
                errorMessage.style.display = "block";
            }
        })
        .catch((error) => {
            console.error("Surgio un Error", error);
        });

        
    }

    return(
        <div>
            <AdvertiseWindow isOpen={openAdvertiseW} onRequestClose={closeAdvertiseW} msg={message} title={titleModal}/>
            <main>
                
                <div className='admin-square'>
                    <div className='uned-logo'></div>
                    
                    <div style={{marginTop:"15%"}}>
                        

                        <input className='input-login' placeholder='username' value={username} onChange={(e) => handleUsername(e)}></input>
                        <input className='input-login' type='password' placeholder='password' value={password} onChange={(e) => handlePassword(e)}></input>
                        <div class="error-message">
                            <h3 className='h3-message'>Error! Usuario o Contraseña incorrectos. Por favor, inténtelo de nuevo.</h3>
                        </div>
                        <button className='button-login' onClick={login}>LOGIN</button>
                        
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminLogin;