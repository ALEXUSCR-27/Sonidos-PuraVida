import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from "react-leaflet";

import '../styles/postDetails-ModifyW.css'

import AdvertiseWindow from './AdvertiseWindow';

function ModifyPostWindow({ isOpen, onRequestClose, modalTitle, posts, picture }) {

  const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
  const url = process.env.REACT_APP_LOCAL_HOST_URL;
  const [latitude, setLat] = useState(9.83333);
  const [longitude, setLong] = useState(-84.08333);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [postDetails, setPostDetails] = useState("");
  const [province, setProvince] = useState("");
  const [id, setID] = useState(0);


  const [titleModal, setTitleModal] = useState("");
  const [message, setMessage] = useState("");
  const [openAdvertiseW, setOpenAdvertiseW] = useState(false);
  const closeAdvertiseW = () => {
        setOpenAdvertiseW(false);
        onRequestClose();
  };

  const position = [latitude, longitude];
  const [zoom] = useState(8);
  useEffect(() => {
    if (posts[0].lat != undefined && posts[0].lng != undefined) {
      console.log(posts[0].lat);
      setLat(posts[0].lat);
      setLong(posts[0].lng);
      const name = posts[0].autor.split(" ")[0];
      const lastname = posts[0].autor.split(" ")[1];
      setName(name);
      setLastName(lastname);
      setProvince(posts[0].provincia);
      setPostDetails(posts[0].descripcion);
      setID(posts[0].id);
      setTitle(posts[0].titulo);

    }
  }, [posts]);
    
  const urlLeaflet = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";


  const modifyPublicacion = () => {
      const route = "/server/router.php?action=modifyPost";
      const data = {
        id:id,
        namePost:title,
        username:name,
        lastname:lastname,
        postDetails:postDetails,
        lat:latitude,
        long:longitude,
        province:province
      };

      console.log(data);
      
      axios.post(url+route, data)
      .then((response) => {
          setTitleModal("Aviso!");
          setMessage("La publicacion se ha modificado de manera exitosa!");
          setOpenAdvertiseW(true);
          console.log(response);
      })
      .catch((error) => {
          setTitleModal("Aviso!");
          setMessage("Se ha producido un error al intentar modificar la publicacion. Intente de nuevo!");
          setOpenAdvertiseW(true);
          console.error("Error", error);
      });
      
  }


    /*
    const printPosts = () => {
      if ("geolocation" in navigator) {

        console.log("Available");
  
      } else {
  
        console.log("Not Available");
  
      }
      console.log(posts);
      
    }*/

    const LocationFinderDummy = () => {
      const map = useMapEvents({
          click(e) {
            console.log("clic");
              const { lat, lng } = e.latlng;
              if (lat!=null && lng != null) {
                setLat(lat);
                setLong(lng);
                console.log("lat:"+lat+"long:"+lng);
              }
              
          },
      });
      return null;
  };

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
  }

  const handleDetails = (e) => {
    setPostDetails(e.target.value);
  }
  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleProvince = (e) => {
    setProvince(e.target.value);
  }


    return (
      <Modal className='modal-details' isOpen={isOpen} 
        onRequestClose={onRequestClose} contentLabel="Modal"
        overlayClassName='modal-overlay'
      >
        <div>
          <AdvertiseWindow isOpen={openAdvertiseW} onRequestClose={closeAdvertiseW} msg={message} title={titleModal}/>
            <div>
                <h1 className='h1-details'>Modificar publicación</h1>
            </div>
            <div style={{display:"flex"}}>
              <div className='div-details'>
                <div>
                  <h2 className='h2-details'>ID: {posts[0].id}</h2>
                  <h2 className='h2-details'>Titulo: {posts[0].titulo}</h2>
                  <h2 className='h2-details'>Autor: {posts[0].autor}</h2>
                  <h2 className='h2-details'>Descripcion: {posts[0].descripcion}</h2>
                  <h2 className='h2-details'>Latitud: {posts[0].lat}</h2>
                  <h2 className='h2-details'>Longitud: {posts[0].lng}</h2>
                  <h2 className='h2-details'>Provincia: {posts[0].provincia}</h2>
                  <h2 className='h2-details'>Fecha de registro (YYYY-MM-DD): {posts[0].fecha}</h2>
                  <div>
                    
                  </div>
                  <div className='modify-Square'>
                    <p className='modify-p'>*Deje en blanco las opciones que no desea modificar*</p>
                    <div style={{display: "flex"}}>
                      <div>
                        <label htmlFor="nombre" className='modify-label'>Nombre</label>
                        <input id='nombre' className='modify-input' onChange={(e) => handleName(e)} placeholder={name}></input>
                      </div>
                      <div>
                        <label htmlFor="apellidos" className='modify-label'>Apellidos</label>
                        <input id='apellidos' className='modify-input' placeholder={lastname} onChange={(e) => handleLastName(e)}></input>
                      </div>
                      
                    </div>

                    <div>
                      <div style={{display:"flex", flexDirection:"column"}}>
                        <label htmlFor="titulo" className='modify-label'>Título</label>
                        <input id='titulo' className='modify-input2' placeholder={title} onChange={(e) => handleTitle(e)}></input>
                      </div>
                      <div style={{display:"flex", flexDirection:"column"}}>
                        <label className='modify-label'>Provincia</label>
                        <select className='modify-input3' onChange={(e) => handleProvince(e)} value={province}>
                          <option value='Cartago'>Cartago</option>
                          <option value='San Jose'>San Jose</option>
                          <option value='Heredia'>Heredia</option>
                          <option value='Alajuela'>Alajuela</option>
                          <option value='Limon'>Limon</option>
                          <option value='Puntarenas'>Puntarenas</option>
                          <option value='Guanacaste'>Guanacaste</option>
                        </select>
                      </div>
                      
                    </div>

                    <div>
                      <div style={{display:"flex"}}>
                        <div>
                          <label className='modify-label2'>Latitud</label>
                          <h3 className='modify-h3'>{latitude}</h3>
                        </div>
                        <div>
                          <label className='modify-label2'>Longitud</label>
                          <h3 className='modify-h3'>{longitude}</h3>
                        </div>
                      </div>
                      
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                      <label className='modify-label'>Descripción</label>
                      <textarea placeholder={postDetails} onChange={(e) => handleDetails(e)} className="modify-Details"></textarea>
                    </div>
                    <button onClick={modifyPublicacion} className='modify-button'>Realizar cambios</button>
                  </div>
                  
                </div>
                
                  
              </div>
              <div className="details-mapSection">
                  <MapContainer className="map-details" center={position} zoom={zoom}>
                    <TileLayer
                      url = {urlLeaflet}
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                      <Popup>
                        Ubicacion de publicacion.
                      </Popup>
                    </Marker>
                    <LocationFinderDummy />                     
                  </MapContainer>
              </div>
            </div>
            
            <div className='buttonsYN-modal'>
                <button className='close-button-details' onClick={onRequestClose}>Cerrar</button>
            </div>
            
        </div>
        
      </Modal>
    );
  }

export default ModifyPostWindow;