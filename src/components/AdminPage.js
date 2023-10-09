import React, { useState, useEffect, useSyncExternalStore } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import '../syles/admin.css'

import MessageWindow from './MessageWindow';


function AdminPage() {
    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;
    const [publications, setPublications] = useState([{}]);
    const [empty, setEmpty] = useState(false);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [idPost, setID] = useState('0');

    const [open, setOpen] = useState(false);

    const closeWindow = () => {
        setOpen(false);
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

    const deletePostAdvertise = (e) => {
        setMessage("Seguro que quieres eliminar esta publicación?");
        setTitle("Confirmación");
        setID(e);
        setOpen(true);
        
    } 

    const deletePost = () => {
        const route = "/server/router/routes.php?action=deletePost";
        const id = {
            id:idPost
        };
        axios.post(url+route, id)
        .then((response) => {
            setOpen(false);
        })
        .catch((error) => {
            alert("Surgio un error");
            console.error("Error", error);
        })

    }

    const verCodigo = (e) => {
        console.log(e);
        setOpen(true);
    }

    

    return(
        <div>
            <MessageWindow isOpen={open} onRequestClose={closeWindow} msg={message} title={title} deletePost={deletePost}/>
            <div className='form-admin'>
                <div className='input-div'>
                    <label className='label-admin'  for="titulo">Titulo</label>
                    <input className='input-admin' id="titulo"></input>
                </div>
                
                <div className='input-div'>
                    <label className='label-admin' for="autor">Autor</label>
                    <input className='input-admin' id="autor"></input>
                
                </div>
                
                <div className='input-div'>
                    <label className='label-admin' for="provincia">Provincia</label>
                    <select className='select-admin' id="provincia">
                        <option value='Cartago'>Cartago</option>
                        <option>San Jose</option>
                        <option>Heredia</option>
                        <option>Alajuela</option>
                        <option>Limon</option>
                        <option>Puntarenas</option>
                        <option>Guanacaste</option>
                    </select>
                </div>

                <div className='input-div'>
                    <label className='label-admin' for="datePost">Fecha</label>
                    <input className='input-admin' type="date" id="datePost"></input> 
                </div>
                
                <div className='buttons-div'>
                    <button className='button-search'>REPORTE</button>
                    <button className='button-search'>LIMPIAR</button>
                    <button className='button-search'>BUSCAR</button>
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
                                        <button>VER DETALLES</button>
                                        <button onClick={verCodigo}>MODIFICAR</button>
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