//LIBRERIES
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios';
//COMPONENTS
import Header from './Header';
import Footer from './Footer';

//STYLES
import '../syles/mainPage.css'

function MainPage() {
    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;
    const [zoom] = useState(7);
    const position = [9.748917, -83.753428];
    const [publications, setPublications] = useState([{}]);
    const [empty, setEmpty] = useState(false);

    const urlLeaflet = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    //sa
    useEffect(() => {
        window.scrollTo(0, 0);  
        const route = "/server/router/routes.php?action=getPost";
        const data = {}
        axios.post(url+route, data)
        .then((response) => {
            if (response.data.length === 0) {
                setEmpty(false);
            }
            else {
                setEmpty(true);
                setPublications(response.data);
            }
            
            console.log(response.data);
            
        })
        .catch((error) => {
            alert("Surgio un error");
            console.error("Error", error);
        });
    }, []);

 
    return(
        <div>
            <div>
                <header>
                    <Header/>
                </header>
            
                <div>
                    <main>
                        <div className='main-div' style={{display:"flex"}}>
                            <div className="map-section">
                                <MapContainer className="main-map" center={position} zoom={zoom}>
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
                            <div className='about-section'>
                                
                                <div className='about-section-inside-top'>
                                    <p>El Laboratorio de Investigación e Innovación Tecnológica (LIIT) junto con la Catédra de Emprendedurismo Turístico de la Escuela de Ciencias Sociales y Humanidades desarrollan el proyecto de participación ciudadana “Los sonidos del Pura Vida”. Consiste en un mapa sonoro de Costa Rica, con el objetivo de crear una memoria de sonidos de nuestro país.</p>
                                    <p>Un mapa sonoro es una técnica acústica para conocer los sonidos de un lugar, comunidad o ciudad; ubica los sonidos geográficamente. Para construir este tipo de material se requiere de diferentes puntos de vista, en particular de las personas que conocen el lugar.</p>
                                    <p>Por ello les invitamos a que nos envíen los sonidos más representativos de su comunidad.</p>
                                </div>
                                <div className='about-section-inside-bottom'>
                                    <div className='postButton-title'>
                                        <h2 className='h2-about'>Sube tu sonido Pura Vida aqui!</h2>
                                    </div>
                                    
                                    <div className='postButton-section'>
                                        <Link to = {urlPort+"postPublication"}>
                                            <button id='addButtom' className="addPost-button"></button>
                                        </Link>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                        <div>
                            <div className='main-title'>
                                <h1 className='h1-main'>Publicaciones Sonidos Del Pura Vida</h1>
                            </div>
                            <div>
                                <table>
                                    <thead>
                                        <tr className="table-header">
                                            <th>Titulo</th>
                                            <th>Descripcion</th>
                                            <th>Autor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empty && (
                                            publications.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{val.titulo}</td>
                                                        <td>{val.descripcion}</td>
                                                        <td>{val.autor}</td>
                                                    
                                                    </tr>
                                                )
                                            })
                                        )
                                        }

                                        {!empty && (
                                            <tr>
                                                <td>Sin resultados</td>
                                                <td>Sin resultados</td>
                                                <td>Sin resultados</td>
                                            </tr>
                                        )}
                                    </tbody>
                                    
                                    
                                    
                                </table>
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

export default MainPage;