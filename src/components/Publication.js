import React, { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Header from "./Header";
import Footer from "./Footer";

import '../styles/publication.css'
function Publication({data}) {
    const urlLeaflet = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const [position, setPosition] = useState([9.748917, -83.753428]);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [zoom] = useState(14);
    const [picture, setPicture] = useState(false);
    
    useEffect(() => {
        if (data.foto != "") setPicture(true);
        window.scrollTo(0, 0);
        const expresion = /\(([^)]+)\)/;
        const coordenadas = data.coordenadas.match(expresion);
        const coordenadasSplit = coordenadas[1].split(' ');
        console.log(coordenadas);
        setLat(parseFloat(coordenadasSplit[0]));
        setLong(parseFloat(coordenadasSplit[1]));
        setPosition([parseFloat(coordenadasSplit[0]),parseFloat(coordenadasSplit[1])]);
        console.log(position);
      }, []);
    console.log(data);
    
    return (
        <div>
            <header>
                <Header/>
            </header>
            <main>
                <div className='publication-div' style={{display:"flex"}}>
                    <div className="mapPublication-section">
                        <MapContainer className="publication-map" center={position} zoom={zoom}>
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
                    </div>
                    <div className="details-section">
                        <div className="publication-details">
                            <table>
                                <tbody>
                                    <tr className="tr-publication">
                                        <th className="th-publication">Titulo</th>
                                        <td className="td-publication">{data.titulo}</td>
                                    </tr>
                                    <tr className="tr-publication">
                                        <th className="th-publication">Autor</th>
                                        <td className="td-publication">{data.autor}</td>
                                    </tr>
                                    <tr className="tr-publication">
                                        <th className="th-publication">Provincia</th>
                                        <td className="td-publication">{data.provincia}</td>
                                    </tr>
                                    <tr className="tr-publication">
                                        <th className="th-publication">Comentarios</th>
                                        <td className="td-publication">{data.descripcion}</td>
                                    </tr>
                                    <tr className="tr-publication">
                                        <th className="th-publication">Fecha</th>
                                        <td className="td-publication">{data.fecha}</td>
                                    </tr>
                                    <tr className="tr-publication">
                                        <th className="th-publication">Audio</th>
                                        <td className="td-publication">
                                            <audio controls  className="player-desing-publication">
                                                <source src={data.audio} type="audio/mpeg" />
                                                    Tu navegador no soporta la reproducción de audio.
                                            </audio>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="img-publication">
                            <caption className="publicationPic-title">Foto</caption>
                            {!picture && (
                                <div className="squarePreview-details"></div>
                            )}
                            {picture && (   
                                <img className="square-img" src={data.foto}  alt="Vista previa de la imagen" />
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default Publication;