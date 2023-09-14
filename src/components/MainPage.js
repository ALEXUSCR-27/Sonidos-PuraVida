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
    const [zoom] = useState(7);
    const position = [9.748917, -83.753428];
    const [publications, setPublications] = useState([{}]);
    const [empty, setEmpty] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);  
        const route = "http://localhost/router/routes.php?action=getPost";
        const data = {}
        axios.post(route, data)
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
                        <div style={{display:"flex"}}>
                            <div className="map-section">
                                <MapContainer className="main-map" center={position} zoom={zoom}>
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
                            <div className='about-section'>
                                
                                <div className='about-section-inside-top'>
                                    <p>El Laboratorio de Investigación e Innovación Tecnológica (LIIT) junto con la Catédra de Emprendedurismo Turístico de la Escuela de Ciencias Sociales y Humanidades desarrollan el proyecto de participación ciudadana “Los sonidos del Pura Vida”. Consiste en un mapa sonoro de Costa Rica, con el objetivo de crear una memoria de sonidos de nuestro país.</p>
                                    <p>Un mapa sonoro es una técnica acústica para conocer los sonidos de un lugar, comunidad o ciudad; ubica los sonidos geográficamente. Para construir este tipo de material se requiere de diferentes puntos de vista, en particular de las personas que conocen el lugar.</p>
                                    <p>Por ello les invitamos a que nos envíen los sonidos más representativos de su comunidad.</p>
                                </div>
                                <div className='about-inside-section-bottom'>
                                    <h2 style={{color:"black"}} for="addButtom">Sube tu sonido Pura Vida aqui</h2>
                                    <Link to = "http://localhost:3000/postPublication">
                                        <button id='addButtom' className="addPost-button"></button>
                                    </Link>
                                </div>
                                
                            </div>
                        </div>
                        <div>
                            <table className="main-table">
                                <tr className="table-header">
                                    <th>Titulo</th>
                                    <th>Descripcion</th>
                                    <th>Autor</th>
                                </tr>
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
                                
                            </table>
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