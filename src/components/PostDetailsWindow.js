import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import '../syles/general.css'

function PostDetailsWindow({ isOpen, onRequestClose, title, posts, picture }) {

  const [zoom] = useState(14);
  const position = [posts[0].lat, posts[0].lng];
  const urlLeaflet = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";



    const printPosts = () => {
      if ("geolocation" in navigator) {

        console.log("Available");
  
      } else {
  
        console.log("Not Available");
  
      }
      console.log(posts);
      
    }
    return (
      <Modal className='modal-details' isOpen={isOpen} 
        onRequestClose={onRequestClose} contentLabel="Modal"
        overlayClassName='modal-overlay'
      >
        <div>
            <div>
                <h1 className='h1-details'>Detalles de publicacion</h1>
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
                  
                </div>
                
                  
              </div>
              <div className="admin-mapSection">
                  <MapContainer className="map-details" center={position} zoom={zoom}>
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
            </div>
            
            <div className='buttonsYN-modal'>
                <button className='close-button' onClick={onRequestClose}>Cerrar</button>
            </div>
            
        </div>
        
      </Modal>
    );
  }

export default PostDetailsWindow;