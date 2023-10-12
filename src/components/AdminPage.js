import React, { useState, useEffect, useSyncExternalStore } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import '../syles/admin.css'

import ConfirmWindow from './ConfirmWindow';
import AdvertiseWindow from './AdvertiseWindow';
import PostDetailsWindow from './PostDetailsWindow';


function AdminPage() {
    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;
    const [publications, setPublications] = useState([{}]);
    const [empty, setEmpty] = useState(false);
    const [message, setMessage] = useState("");
    const [idPost, setID] = useState('0');
    const [details, setDetails] = useState([{}]);
    const [picture, setPicture] = useState("");

    const [titleModal, setTitleModal] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [province, setProvince] = useState("");
    const [date, setDate] = useState("1990-01-01");

    const [openConfirmW, setOpenConfirmW] = useState(false);

    const closeConfirmW = () => {
        setOpenConfirmW(false);
    };
    const [openAdvertiseW, setOpenAdvertiseW] = useState(false);

    const closeAdvertiseW = () => {
        setOpenAdvertiseW(false);
    };
    const [openDetailsW, setOpenDetailsW] = useState(false);

    const closeDetailsW = () => {
        setOpenDetailsW(false);
    };

    

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

    const reset = () => {
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
    }


    const deletePostAdvertise = (e) => {
        setMessage("Seguro que quieres eliminar esta publicación?");
        setTitleModal("Confirmación");
        setID(e);
        setOpenConfirmW(true);
        
    } 

    const deletePost = () => {
        const route = "/server/router/routes.php?action=deletePost";
        const id = {
            id:idPost
        };
        axios.post(url+route, id)
        .then((response) => {
            setOpenConfirmW(false);
            reset();
            
        })
        .catch((error) => {
            alert("Surgio un error");
            console.error("Error", error);
        })

    }

    const postDetails = (posts) => {
        const expresion = /\(([^)]+)\)/;
        const coordenadas = posts[0].coordenadas.match(expresion);
        const coordenadasSplit = coordenadas[1].split(' ');
        console.log(coordenadas);
        posts[0].lat = parseFloat(coordenadasSplit[0]);
        posts[0].lng = parseFloat(coordenadasSplit[1]);
        setDetails(posts);
        //console.log(publications[0].foto)
        setOpenDetailsW(true);
    }
    
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleAuthor = (e) => {
        setAuthor(e.target.value);
    }

    const handleProvince = (e) => {
        setProvince(e.target.value);
    }

    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const filterPosts = () => {
        const data = {
            titulo:title,
            autor:author,
            provincia:province,
            fecha:date
        };
        console.log(data);
        const route = "/server/router/routes.php?action=filterPosts";
        axios.post(url+route, data)
        .then((response) => {
            console.log(response.data);
            setPublications(response.data);
        })
        .catch((error) => {
            alert("Surgio un error");
            console.error("Error", error);
        })
        

    }

    return(
        <div>
            <ConfirmWindow isOpen={openConfirmW} onRequestClose={closeConfirmW} msg={message} title={titleModal} deletePost={deletePost}/>
            <AdvertiseWindow isOpen={openAdvertiseW} onRequestClose={closeAdvertiseW} msg={message} title={titleModal}/>
            <PostDetailsWindow isOpen={openDetailsW} onRequestClose={closeDetailsW} title={titleModal} posts={details}/>


            <div className='form-admin'>
                <div className='input-div'>
                    <label className='label-admin'  for="titulo">Titulo</label>
                    <input className='input-admin' id="titulo" value={title} onChange={(e) => handleTitle(e)}></input>
                </div>
                
                <div className='input-div'>
                    <label className='label-admin' for="autor">Autor</label>
                    <input className='input-admin' id="autor" value={author} onChange={(e) => handleAuthor(e)}></input>
                
                </div>
                
                <div className='input-div'>
                    <label className='label-admin' for="provincia">Provincia</label>
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

                <div className='input-div'>
                    <label className='label-admin' for="datePost">Fecha</label>
                    <input className='input-admin' type="date" id="datePost" value={date} onChange={(e) => handleDate(e)}></input> 
                </div>
                
                <div className='buttons-div'>
                    <button className='button-search'>REPORTE</button>
                    <button className='button-search'>LIMPIAR</button>
                    <button className='button-search' onClick={filterPosts}>BUSCAR</button>
                </div>
            </div>
            <div>
                <table>
                    <tr>
                        <th>
                            <input type="checkbox"></input>
                        </th>
                        <th>Titulo</th>
                        <th>Descripcion</th>
                        <th>Autor</th>
                        <th style={{width:"400px"}}>Opciones</th>
                    </tr>
                    {empty && (
                        publications.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <input type="checkbox"></input>
                                    </td>
                                    <td>{val.titulo}</td>
                                    <td>{val.descripcion}</td>
                                    <td>{val.autor}</td>
                                    <td>
                                        <button onClick={() => postDetails([{
                                            id:val.codigoPublicacion,
                                            titulo:val.titulo,
                                            descripcion:val.descripcion,
                                            autor:val.autor,
                                            foto:val.foto,
                                            coordenadas:val.coordenadas,
                                            fecha: val.fecha,
                                            provincia: val.provincia
                                            }])}>VER DETALLES</button>
                                        <button>MODIFICAR</button>
                                        <button onClick={() => deletePostAdvertise(val.codigoPublicacion)}>ELIMINAR</button>
                                    </td>
                                                    
                                </tr>
                            )
                        })
                    )}

                    {!empty && (
                        <tr>
                            <td></td>
                            <td>Sin resultados</td>
                            <td>Sin resultados</td>
                            <td>Sin resultados</td>
                            <td>Sin opciones</td>
                        </tr>
                    )}
                                    
                </table>
            </div>
        </div>
    );
}

export default AdminPage;