//LIBRERIES
import React, { useState, useEffect } from 'react';
import { Link, useNavigate , useParams} from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios';
//COMPONENTS
import Header from './Header';
import Footer from './Footer';
import Publication from './Publication';

//STYLES
import '../styles/mainPage.css';

function MainPage({setPublication}) {
    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;
    const [zoom] = useState(8);
    const position = [9.748917, -83.753428];
    const [publications, setPublications] = useState([{}]);
    const [empty, setEmpty] = useState(false);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [province, setProvince] = useState("");

    const urlLeaflet = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);  
        const route = "/server/router.php?action=getPost";
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

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleAuthor = (e) => {
        setAuthor(e.target.value);
    }

    const handleProvince = (e) => {
        setProvince(e.target.value);
    }

    const resetFilters = () => {
        setTitle("");
        setAuthor("");
        setProvince("");
    }

    const filterPosts = () => {
        const data = {
            titulo:title,
            autor:author,
            provincia:province,
            fecha:"1990-01-01"
        };
        console.log(data);
        const route = "/server/router.php?action=filterPosts";
        axios.post(url+route, data)
        .then((response) => {
            if (response.data.length === 0) {
                setEmpty(false);
            }
            else {
                setEmpty(true);
                setPublications(response.data);
            }
        })
        .catch((error) => {
            alert("Surgio un error");
            console.error("Error", error);
        })
        

    }
    const preparePublication = (pubData) => {
        setPublication(pubData);
        navigate("/seePublication");
    }

 
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
                                        <h2 className='h2-about'>Suba aquí su <span className='sonido'>SONIDO</span> <span className='pv'>PURA VIDA!</span></h2>
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
                                <div className='form-main'>
                                    <div className='input-div'>
                                        <label className='label-main'  htmlFor="titulo">Título</label>
                                        <input className='input-admin' id="titulo" value={title} onChange={(e) => handleTitle(e)}></input>
                                    </div>
                                    
                                    <div className='input-div'>
                                        <label className='label-main' htmlFor="autor">Autor</label>
                                        <input className='input-admin' id="autor" value={author} onChange={(e) => handleAuthor(e)}></input>
                                    
                                    </div>
                                    
                                    <div className='input-div'>
                                        <label className='label-main' htmlFor="provincia">Provincia</label>
                                        <select className='select-admin' id="provincia" value={province} onChange={(e) => handleProvince(e)}>
                                            <option value=''></option>
                                            <option value='Cartago'>Cartago</option>
                                            <option value='San Jose'>San Jose</option>
                                            <option value='Heredia'>Heredia</option>
                                            <option value='Alajuela'>Alajuela</option>
                                            <option value='Limon'>Limon</option>
                                            <option value='Puntarenas'>Puntarenas</option>
                                            <option value='Guanacaste'>Guanacaste</option>
                                        </select>
                                    </div>
                                    <div className='buttons-div-main'>
                                        <button className='button-search-main' onClick={resetFilters}>LIMPIAR</button>
                                        <button className='button-search-main' onClick={filterPosts}>BUSCAR</button>
                                    </div>

                                </div>
                            <div>
                                <table>
                                    <thead>
                                        <tr className="table-header">
                                            <th>Título</th>
                                            <th>Provincia</th>
                                            <th>Audio</th>
                                            <th>Autor</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empty && (
                                            publications.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{val.titulo}</td>
                                                        <td>{val.provincia}</td>
                                                        <td>
                                                        <audio controls  className="player-desing-main">
                                                            <source src={val.audio} type="audio/mpeg" />
                                                            Tu navegador no soporta la reproducción de audio.
                                                        </audio>
                                                        </td>
                                                        <td>{val.autor}</td>
                                                        <td>
                                                            <button className='button-details-main' onClick={() => {
                                                                const pubData = {
                                                                    id:val.codigoPublicacion,
                                                                    titulo:val.titulo,
                                                                    descripcion:val.descripcion,
                                                                    autor:val.autor,
                                                                    foto:val.foto,
                                                                    coordenadas:val.coordenadas,
                                                                    fecha: val.fecha,
                                                                    provincia: val.provincia,
                                                                    audio: val.audio
                                                                }
                                                                preparePublication(pubData);
                                                            }}>
                                                                VER PUBLICACION
                                                            </button>   
                                                        </td>
                                                    
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