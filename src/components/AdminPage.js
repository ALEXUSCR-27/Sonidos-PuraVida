import React, { useState, useEffect, useSyncExternalStore } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import '../syles/admin.css'

import ConfirmWindow from './ConfirmWindow';
import AdvertiseWindow from './AdvertiseWindow';
import PostDetailsWindow from './PostDetailsWindow';
import { Link } from 'react-router-dom';


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
    const [report, setReport] = useState([]);

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

    const addPostReport = (postInfo) => {
        console.log(report.length);
        if (report.length === 0) setReport([postInfo]);
        else {
            report.push(postInfo);
        }
        console.log(report);
    }

    const createReport = () => {
        const csvHeader = ['ID','Título', 'Autor', 'Fecha','Coordenadas', 'Provincia', 'Descripcion'];
        const csv = [
            csvHeader.join(','), 
            ...report.map(item => [item.id, item.titulo, item.autor, item.fecha, item.coordenadas, item.provincia, item.descripcion].join(','))
          ].join('\n');
        console.log(csv);

        // Crear un objeto Blob
        const blob = new Blob([csv], { type: 'text/csv' });

        // Crear una URL para el Blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Crear un elemento de enlace (link) para descargar el archivo
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'datos.csv'; 

        link.click();

    }

    

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

    const reset = () => {
        const route = "/server/router.php?action=getPost";
        const data = {}
        axios.post(url+route, data)
        .then((response) => {
            console.log(response.data.length);
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
        const route = "/server/router.php?action=deletePost";
        const id = {
            id:idPost
        };
        axios.post(url+route, id)
        .then((response) => {
            setOpenConfirmW(false);
            reset();
            console.log(response);
            
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

    const resetFilters = () => {
        setTitle("");
        setAuthor("");
        setProvince("");
        setDate("1990-01-01");
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

    return(
        <div>
            <header className='admin-header'>
                <Link to={urlPort}>
                    <button className='sign-out'>CERRAR SESION</button>
                </Link>
            </header>
            <ConfirmWindow isOpen={openConfirmW} onRequestClose={closeConfirmW} msg={message} title={titleModal} deletePost={deletePost}/>
            <AdvertiseWindow isOpen={openAdvertiseW} onRequestClose={closeAdvertiseW} msg={message} title={titleModal}/>
            <PostDetailsWindow isOpen={openDetailsW} onRequestClose={closeDetailsW} title={titleModal} posts={details}/>


            <div className='form-admin'>
                <div className='input-div'>
                    <label className='label-admin'  htmlFor="titulo">Titulo</label>
                    <input className='input-admin' id="titulo" value={title} onChange={(e) => handleTitle(e)}></input>
                </div>
                
                <div className='input-div'>
                    <label className='label-admin' htmlFor="autor">Autor</label>
                    <input className='input-admin' id="autor" value={author} onChange={(e) => handleAuthor(e)}></input>
                
                </div>
                
                <div className='input-div'>
                    <label className='label-admin' htmlFor="provincia">Provincia</label>
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
                    <label className='label-admin' htmlFor="datePost">Fecha</label>
                    <input className='input-admin' type="date" id="datePost" value={date} onChange={(e) => handleDate(e)}></input> 
                </div>
                
                <div className='buttons-div'>
                    <button className='button-search' onClick={createReport}>REPORTE</button>
                    <button className='button-search' onClick={resetFilters}>LIMPIAR</button>
                    <button className='button-search' onClick={filterPosts}>BUSCAR</button>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox"></input>
                            </th>
                            <th>Titulo</th>
                            <th>Descripcion</th>
                            <th>Autor</th>
                            <th style={{width:"400px"}}>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empty && (
                            publications.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            <input type="checkbox" onClick={(e) => {
                                            if (e.target.checked) {
                                                addPostReport({
                                                    id:val.codigoPublicacion,
                                                    titulo:val.titulo,
                                                    descripcion:val.descripcion,
                                                    autor:val.autor,
                                                    foto:val.foto,
                                                    coordenadas:val.coordenadas,
                                                    fecha: val.fecha,
                                                    provincia: val.provincia
                                                    })
                                                }
                                            }}></input>
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
                    </tbody>            
                </table>
            </div>
        </div>
    );
}

export default AdminPage;