//LIBRARIES
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {Icon} from 'leaflet';
import axios from 'axios';

//COMPONENTS
import Header from './Header';
import Footer from './Footer';

//STYLES
import "../syles/registerPage.css";
import "../syles/general.css";


function RegisterPage() {

    //STATE VALUES
    const [namePost, setNamePost] = useState("");
    const [sound, setSound] = useState(null);
    const [picture, setPicture] = useState(null);
    const [username, setUsername] = useState("");
    const [lastname, setLastName] = useState("");
    const [postDetails, setPostDetails] = useState("");
    const [lat, setLat] = useState(9.748917);
    const [long, setLong] = useState(-83.753428);
    const [zoom] = useState(7);
    const position = [lat, long];


    const handleAudioSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
          // Validar que el archivo sea de tipo audio si lo deseas
          if (file.type.startsWith("audio/")) {
            setSound(URL.createObjectURL(file));
            console.log(sound);
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
        const route = "http://localhost:8000/routes.php?action=registerPost";
        const data = {
            namePost:namePost,
            sound:sound,
            picture:picture,
            username:username,
            lastname:lastname,
            postDetails:postDetails,
            lat:lat,
            long:long
        };
        console.log(data);
        axios.post(route, data)
        .then((response) => {
            console.log(response);
            console.log("si");
        })
        .catch((error) => {
            console.error("Error", error);
        });

    };
    
    return(
        <div>
            <div>
                <header>
                    <Header/>
                </header>
                <div>
                        <main style={{display:"flex"}}>
                            <div className="squareForm">
                                <h3 className="h3-register" style={{position:'absolute', top:"0px", left:"60px"}}>Informacion de la publicacion</h3>
                                <label for="namePost" style={{position:'absolute',top:"80px", left:"60px"}}>Titulo de la publicacion</label>      
                                <input className="register-title-input" id="namePost" value={namePost} onChange={(e) => {setNamePost(e.target.value)}} style={{position:'absolute',top:"110px", left:"60px"}} placeholder='Ej: Sonidos de Cartago' required ></input>

                                <label for="namePost" style={{position:'absolute',top:"160px", left:"60px"}}>Archivo de sonido (50MB MAX) (MP3, WAV, OGG)</label>      
                                <input id="namePost" type="file" accept="audio/*" onChange={handleAudioSelect} style={{position:'absolute',top:"190px", left:"60px"}}></input>
                                {sound && (
                                    <audio controls style={{position:'absolute',top:"220px", left:"60px"}} className="player-desing">
                                        <source src={sound} type="audio/mpeg" />
                                        Tu navegador no soporta la reproducción de audio.
                                    </audio>
                                )}

                                <label for="namePost" style={{position:'absolute',top:"280px", left:"60px"}}>Foto (50MB MAX) (PNG, GIF, JPG, JPEG)</label>      
                                <input id="namePost" type="file" accept="image/*" onChange={handleImageSelect} style={{position:'absolute',top:"310px", left:"60px"}}></input>
                                {!picture && (
                                    <div className="squarePreview"></div>
                                )}
                                {picture && (   
                                    <img className="preview" src={picture} alt="Vista previa de la imagen" />
                                )}
                                <label for="namePost" style={{position:'absolute',top:"610px", left:"60px"}}>Detalles o comentarios</label>      
                                <textarea className='register-details' id="namePost" value={postDetails} onChange={(e) => {setPostDetails(e.target.value)}} style={{position:'absolute',top:"640px", left:"60px"}} rows="11" cols="41" placeholder='Cuentenos la historia de su sonido pura vida.'></textarea>

                                {/** FORM DIVISION, POST INFO UP - USER INFO DOWN   */}
                                
                                <h2 style={{position:'absolute',top:"0px", left:"600px"}}>Informacion de Autor</h2>
                                <label for="namePost" style={{position:'absolute',top:"80px", left:"600px"}}>Nombre del autor</label>      
                                <input className="register-user-loc-input" id="namePost" value={username} onChange={(e) => {setUsername(e.target.value)}} style={{position:'absolute',top:"110px", left:"600px"}} placeholder='Ej: Carlos'></input>

                                <label for="namePost" style={{position:'absolute',top:"80px", left:"930px"}}>Primer Apellido</label>      
                                <input className="register-user-loc-input" id="namePost" value={lastname} onChange={(e) => {setLastName(e.target.value)}} style={{position:'absolute',top:"110px", left:"930px"}} placeholder='Ej: Ramirez'></input>

                                <h3 className='h3-register' style={{position:'absolute',top:"135px", left:"600px"}}>Ubicacion</h3>
                                <label for="namePost" style={{position:'absolute',top:"200px", left:"600px"}}>Latitud</label>      
                                <input className="register-user-loc-input" id="namePost" value={lat} onChange={(e) => {setLat(parseFloat(e.target.value))}} style={{position:'absolute',top:"230px", left:"600px"}} placeholder='asda'></input>

                                <label for="namePost" style={{position:'absolute',top:"200px", left:"930px"}}>Longitud</label>      
                                <input className="register-user-loc-input" id="namePost" value={long} onChange={(e) => {setLong(parseFloat(e.target.value))}} style={{position:'absolute',top:"230px", left:"930px"}}></input>

                                <MapContainer className="mapPost-desing" center={position} zoom={zoom}>
                                    <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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