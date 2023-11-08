import React, { useState } from 'react';
import Modal from 'react-modal';

import '../styles/general.css'

function ConfirmWindow({ isOpen, onRequestClose, msg, title , deletePost}) {
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
                <button className='buttonY' onClick={deletePost}>Si</button>
                <button className='buttonN' onClick={onRequestClose}>No</button>
            </div>
            
        </div>
        
      </Modal>
    );
  }

export default ConfirmWindow;