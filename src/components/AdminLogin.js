import React, { useState } from 'react';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';

import '../syles/admin.css'
function AdminLogin() {
    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;


    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loginFlag, setLogin] = useState(false);
    

    const handleUsername = (e) => {
        setUserName(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

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
                alert("Perfecto");

            }
            else {
                alert("Quien es ud?");
            }
        })
        .catch((error) => {
            console.error("Surgio un Error", error);
        });

        
    }

    return(
        <div>
            
            <main>
                
                <div className='admin-square'>
                    <div className='uned-logo'></div>
                    
                    <div style={{"margin-top":"15%"}}>
                        <input className='input-login' placeholder='username' value={username} onChange={(e) => handleUsername(e)}></input>
                        <input className='input-login' placeholder='password' value={password} onChange={(e) => handlePassword(e)}></input>
                        <button className='button-login' onClick={login}>LOGIN</button>
                    
                            
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminLogin;