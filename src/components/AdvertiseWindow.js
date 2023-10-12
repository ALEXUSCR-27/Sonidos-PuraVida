import React, { useState } from 'react';
import Modal from 'react-modal';

import '../syles/general.css'

function AdvertiseWindow({ isOpen, onRequestClose, msg, title }) {
    return (
      <Modal className='modal' isOpen={isOpen} 
        onRequestClose={onRequestClose} contentLabel="Modal"
        overlayClassName='modal-overlay'
      >
        <div>
            <div>
                <h1 className='h1-modal'>{title}</h1>  
            </div>
            <div>
                <h3 className='h3-modal'>{msg}</h3>
            </div>
            <div className='buttonsYN-modal'>
                <button  onClick={onRequestClose}>Cerrar</button>
            </div>
            
        </div>
        
      </Modal>
    );
  }

export default AdvertiseWindow;