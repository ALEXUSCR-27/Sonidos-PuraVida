//LIBRARIES
import React, { useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios';

//COMPONENTS
import Header from './Header';
import Footer from './Footer';

//STYLES
import "../syles/registerPage.css";
import "../syles/general.css";


function RegisterPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;

    // ---------------STATE SECTION-----------------
    const [namePost, setNamePost] = useState("");
    const [sound, setSound] = useState(null);
    const [picture, setPicture] = useState(null);
    const [username, setUsername] = useState("");
    const [lastname, setLastName] = useState("");
    const [postDetails, setPostDetails] = useState("");
    const [lat, setLat] = useState(9.748917);
    const [long, setLong] = useState(-83.753428);
    const [province, setProvince] = useState("");
    const [zoom] = useState(7);
    const position = [lat, long];

    const [mostrarExito, setMostrarExito] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);

    const urlLeaflet = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    // ---------------FUNCTIONS SECTION-----------------
    const handleAudioSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
          // Validar que el archivo sea de tipo audio si lo deseas
          if (file.type.startsWith("audio/")) {
            setSound(URL.createObjectURL(file));
            console.log("sound");
          } else {
            alert("Selecciona un archivo de audio válido.");
          }
        }
      };

    const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPicture(imageUrl);
    }
    };
    
    const registerPost = () => {
        const route = "/server/router/routes.php?action=registerPost";
        const data = {
            namePost:namePost,
            sound:sound,
            picture:picture,
            username:username,
            lastname:lastname,
            postDetails:postDetails,
            lat:lat,
            long:long,
            province:province
        };
        console.log(data);
        console.log(url+route);
        axios.post(url+route, data)
        .then((response) => {
            console.log(response);
            alert("Registro Exitoso");
        })
        .catch((error) => {
            console.error("Error", error);
        });

    };

    const handleLatitud = (e) => {
        if (e.target.value != "" & e.target.value != ".") {
            setLat(parseFloat(e.target.value));
        }
        
    }

    const handleLong = (e) => {
        if (e.target.value != "" & e.target.value != "-" & e.target.value != ".") {
            setLong(parseFloat(e.target.value));
        }
        
    }

    const handleProvince = (e) => {
        setProvince(e.target.value);
    }

    
    return(
        <div>
            <div>
                <header>
                    <Header/>
                </header>
                <div>
                        <main style={{display:"flex"}}>
                            <div className="squareForm">
                                <h3 className="h3-register" style={{position:'absolute', top:"15px", left:"60px"}}>Informacion de la publicacion</h3>
                                <label htmlFor="namePost" style={{position:'absolute',top:"80px", left:"60px"}}>Titulo de la publicacion</label>      
                                <input className="register-title-input" id="namePost" value={namePost} onChange={(e) => {setNamePost(e.target.value)}} style={{position:'absolute',top:"110px", left:"60px"}} placeholder='Ej: Sonidos de Cartago' required ></input>

                                <label htmlFor="namePost" style={{position:'absolute',top:"160px", left:"60px"}}>Archivo de sonido (50MB MAX) (MP3, WAV, OGG)</label>      
                                <input id="namePost" type="file" accept="audio/*" onChange={handleAudioSelect} style={{position:'absolute',top:"190px", left:"60px"}}></input>
                                {sound && (
                                    <audio controls style={{position:'absolute',top:"220px", left:"60px"}} className="player-desing">
                                        <source src={sound} type="audio/mpeg" />
                                        Tu navegador no soporta la reproducción de audio.
                                    </audio>
                                )}

                                <label htmlFor="namePost" style={{position:'absolute',top:"280px", left:"60px"}}>Foto (50MB MAX) (PNG, GIF, JPG, JPEG)</label>      
                                <input id="namePost" type="file" accept="image/*" onChange={handleImageSelect} style={{position:'absolute',top:"310px", left:"60px"}}></input>
                                {!picture && (
                                    <div className="squarePreview"></div>
                                )}
                                {picture && (   
                                    <img className="preview" src={picture} alt="Vista previa de la imagen" />
                                )}
                                <label htmlFor="namePost" style={{position:'absolute',top:"610px", left:"60px"}}>Detalles o comentarios</label>      
                                <textarea className='register-details' id="namePost" value={postDetails} onChange={(e) => {setPostDetails(e.target.value)}} style={{position:'absolute',top:"640px", left:"60px"}} rows="11" cols="41" placeholder='Cuentenos la historia de su sonido pura vida.'></textarea>
                                {/** FORM DIVISION, POST INFO UP - USER INFO DOWN   */}
                                
                                <h3 className="h3-register" style={{position:'absolute',top:"15px", left:"600px"}}>Informacion del Autor</h3>
                                <label htmlFor="namePost" style={{position:'absolute',top:"80px", left:"600px"}}>Nombre del autor</label>      
                                <input className="register-user-loc-input" id="namePost" value={username} onChange={(e) => {setUsername(e.target.value)}} style={{position:'absolute',top:"110px", left:"600px"}} placeholder='Ej: Carlos'></input>

                                <label htmlFor="namePost" style={{position:'absolute',top:"80px", left:"930px"}}>Primer Apellido</label>      
                                <input className="register-user-loc-input" id="namePost" value={lastname} onChange={(e) => {setLastName(e.target.value)}} style={{position:'absolute',top:"110px", left:"930px"}} placeholder='Ej: Ramirez'></input>

                                <h3 className='h3-register' style={{position:'absolute',top:"135px", left:"600px"}}>Ubicacion</h3>
                                <label htmlFor="namePost" style={{position:'absolute',top:"200px", left:"600px"}}>Latitud</label>      
                                <input className="register-user-loc-input" id="namePost" value={lat} onChange={(e) => handleLatitud(e)} style={{position:'absolute',top:"230px", left:"600px"}}></input>

                                <label htmlFor="namePost" style={{position:'absolute',top:"200px", left:"930px"}}>Longitud</label>      
                                <input type='text' className="register-user-loc-input"  id="namePost" value={long} onChange={(e) => handleLong(e)} style={{position:'absolute',top:"230px", left:"930px"}}></input>
                                
                                <label style={{position:'absolute',top:"270px", left:"600px"}} htmlFor="provincia">Provincia</label>
                                <select className='select-register' value={province} onChange={(e) => handleProvince(e)} style={{position:'absolute',top:"300px", left:"600px"}}   id="provincia">
                                    <option></option>
                                    <option value='Cartago'>Cartago</option>
                                    <option value='San Jose'>San Jose</option>
                                    <option value='Heredia'>Heredia</option>
                                    <option value='Alajuela'>Alajuela</option>
                                    <option value='Limon'>Limon</option>
                                    <option value='Puntarenas'>Puntarenas</option>
                                    <option value='Guanacaste'>Guanacaste</option>
                                </select>
                         

                                <MapContainer className="mapPost-desing" center={position} zoom={zoom}>
                                    <TileLayer
                                    url = {urlLeaflet}
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={position}>
                                        <Popup>
                                        Tu ubicación actual.
                                        </Popup>
                                    </Marker>
                        
                                </MapContainer>

                                <button className="register-button" style={{position:"relative", top:"830px", left:"1090px"}} onClick={registerPost}>GUARDAR</button>
                                                    
                            </div>
                            <div className="squareNews">
                                <div className="squareNews-inside1">
                                    <h1 className="h1-preview">LOS SONIDOS DEL PURA VIDA</h1>
                                </div>
                                <div className="squareNews-inside2">
                                    <p>“Los sonidos del Pura Vida” consiste en un mapa sonoro de Costa Rica, con el objetivo de crear una memoria de sonidos de nuestro país.</p>
                                    <button className="explore-button">Explorar</button>
                                </div>
                                
                                
                            </div>
                        </main>
                        

                        <footer>
                            <Footer/>
                        </footer>
                
                    </div>
                    
                    
                
            </div>
        </div>
    );
}

export default RegisterPage;