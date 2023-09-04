//LIBRARIES
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {Icon} from 'leaflet';

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

    

    return(
        <div>
            <div>
                <header>
                    <Header/>
                </header>
                <div>
                        <main style={{display:"flex"}}>
                            <div className="squareForm">
                                <h2 style={{position:'absolute',top:"10px", left:"60px"}}>Informacion de la publicacion</h2>
                                <label for="namePost" style={{position:'absolute',top:"80px", left:"60px"}}>Titulo de la publicacion</label>      
                                <input id="namePost" value={namePost} onChange={(e) => {setNamePost(e.target.value)}} style={{position:'absolute',top:"110px", left:"60px"}} required></input>

                                <label for="namePost" style={{position:'absolute',top:"160px", left:"60px"}}>Archivo de sonido (50MB MAX) (MP3, WAV, OGG)
                                </label>      
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
                                <textarea id="namePost" value={postDetails} onChange={(e) => {setPostDetails(e.target.value)}} style={{position:'absolute',top:"650px", left:"60px"}} rows="15" cols="45"></textarea>

                                {/** FORM DIVISION, POST INFO UP - USER INFO DOWN   */}
                                
                                <h2 style={{position:'absolute',top:"10px", left:"600px"}}>Informacion de Autor</h2>
                                <label for="namePost" style={{position:'absolute',top:"80px", left:"600px"}}>Nombre de autor</label>      
                                <input id="namePost" value={username} onChange={(e) => {setUsername(e.target.value)}} style={{position:'absolute',top:"110px", left:"600px"}}></input>

                                <label for="namePost" style={{position:'absolute',top:"80px", left:"860px"}}>Primer Apellido</label>      
                                <input id="namePost" value={lastname} onChange={(e) => {setLastName(e.target.value)}} style={{position:'absolute',top:"110px", left:"860px"}}></input>

                                <h2 style={{position:'absolute',top:"135px", left:"600px"}}>Ubicacion</h2>
                                <label for="namePost" style={{position:'absolute',top:"200px", left:"600px"}}>Latitud</label>      
                                <input id="namePost" value={lat} onChange={(e) => {setLat(parseFloat(e.target.value))}} style={{position:'absolute',top:"240px", left:"600px"}}></input>

                                <label for="namePost" style={{position:'absolute',top:"200px", left:"860px"}}>Longitud</label>      
                                <input id="namePost" value={long} onChange={(e) => {setLong(parseFloat(e.target.value))}} style={{position:'absolute',top:"240px", left:"860px"}}></input>

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
                                                    
                            </div>
                            <div className="squareNews">
                                <p className='about'>El I Simposio Nacional de Bioacústica se realiza en el contexto del Año Internacional del Sonido 2020 —
                                    una iniciativa global sobre la importancia del sonido en todos los aspectos de la vida en la Tierra—, y ha
                                    sido declarado de Interés Institucional por el Consejo de Rectoría de la Universidad Estatal a Distancia,
                                    Costa Rica.
                                    Con el objetivo común de "Promover la investigación, la divulgación y el conocimiento de los sonidos
                                    naturales y los entornos acústicos de Costa Rica", este simposio se presenta como una actividad gratuita y
                                    abierta al público, transmitida de forma virtual para brindar una oportunidad que facilite el acceso y la
                                    distribución del conocimiento sobre este vasto campo temático, el cual ha experimentado un auge
                                    importante durante los últimos años de la mano con el desarrollo de nueva tecnología</p>
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