//LIBRARIES
import React, { useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from "react-leaflet";
import axios from 'axios';

//COMPONENTS
import Header from './Header';
import Footer from './Footer';
import AdvertiseWindow from './AdvertiseWindow';

//STYLES
import "../styles/registerPage.css";
import "../styles/general.css";


function RegisterPage() {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const urlPort = process.env.REACT_APP_LOCAL_HOST_PORT_URL;
    const url = process.env.REACT_APP_LOCAL_HOST_URL;

    // ---------------STATE SECTION-----------------
    const [namePost, setNamePost] = useState("");
    const [sound, setSound] = useState(null);
    const [picture, setPicture] = useState(null);
    const [username, setUsername] = useState("");
    const [lastname, setLastName] = useState("");
    const [postDetails, setPostDetails] = useState("");
    const [latitude, setLat] = useState(9.93333);
    const [longitude, setLong] = useState(-84.08333);
    const [province, setProvince] = useState("");
    const [zoom] = useState(7);
    const position = [latitude, longitude];
    const [formData, setFormData] = useState(null);
    const [urlImage, setUrlImage] = useState("");
    const [urlSound, setUrlSound] = useState("");

    const [titleModal, setTitleModal] = useState("");
    const [message, setMessage] = useState("");

    const [openAdvertiseW, setOpenAdvertiseW] = useState(false);
    const closeAdvertiseW = () => {
        setOpenAdvertiseW(false);
    };


    const urlLeaflet = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    // ---------------FUNCTIONS SECTION-----------------
    const handleAudioSelect = (event) => {
        const file = event.target.files[0];
        const allowedExtensions = [".mp3", ".wav", ".ogg", ".mp4"];
        const fileExtension = file.name.split(".").pop();
        
        if (allowedExtensions.includes(`.${fileExtension}`)) {
            if (file) {
            // Validar que el archivo sea de tipo audio si lo deseas
                if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
                    
                    setSound(URL.createObjectURL(file));
                    let formDataAudio = new FormData();
                    if (formData != null) {
                        formDataAudio = formData;
                    }
                    
                    formDataAudio.append('audio', file);
                    setFormData(formDataAudio);
                    console.log("sound");
                } else {
                    setTitleModal("Aviso!");
                    setMessage("Por favor selecciona un archivo de audio valido!");
                    setOpenAdvertiseW(true);
                    setSound(null);
                }
            }
        }
        else {
            setTitleModal("Aviso!");
            setMessage("Por favor seleccione un formato de audio valido! (mp3, mp4, ogg, wav).");
            setOpenAdvertiseW(true);
            setSound(null);
        }
      };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif"];
        const fileExtension = file.name.split(".").pop();
        if (allowedExtensions.includes(`.${fileExtension}`)) {
            if (file) {
                let formDataImg = new FormData();
                if (formData != null) {
                    formDataImg = formData;
                }
                formDataImg.append('image', file);
                setFormData(formDataImg);
                const imageUrl = URL.createObjectURL(file);
                setPicture(imageUrl);
            }
        }
        else {
            setTitleModal("Aviso!");
            setMessage("Ha seleccionado un formato de imagen invalido, debe seleccionar alguno de estos formatos (png, jpg, jpeg, gif), sino su publicacion se registrara sin imagen!");
            setOpenAdvertiseW(true);
            setPicture(null);
        }
    };
    
    const registerPost = async () => {
        if (validatePublication()) {
            try {
                const uploaded = await uploadFiles();
                if (uploaded) {
                    const route = "/server/router.php?action=registerPost";
                    const data = {
                        namePost:namePost,
                        sound:uploaded.urlSou,
                        picture:uploaded.urlPic,
                        username:username,
                        lastname:lastname,
                        postDetails:postDetails,
                        lat:latitude,
                        long:longitude,
                        province:province
                    };
                    console.log(uploaded);
                    
                    console.log(data);
                    console.log(url+route);
                    axios.post(url+route, data)
                    .then((response) => {
                        setTitleModal("Aviso!");
                        setMessage("El registro de su publicacion ha sido exitoso!");
                        setOpenAdvertiseW(true);
                        resetFilters();
                        console.log(response);
                    })
                    .catch((error) => {
                        setTitleModal("Aviso!");
                        setMessage("Se ha producido un error al intentar registrar su publicacion. Intente de nuevo!");
                        setOpenAdvertiseW(true);
                        console.error("Error", error);
                    });
                }
            }
            catch(error) {
                console.error("Error al subir archivos:", error);
            }
        }
        

    };

    const uploadFiles = async () => {
        return new Promise( async (resolve, reject) => {
            const data = {
                files:formData
            }
            let urls = {};
            console.log(data);
            const route = "/server/router.php?action=uploadFiles";
            console.log(url+route);
            axios.post(url+route,formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
                .then((response) => {
                  if (!response.data.successIMG) {
                    setTitleModal("Aviso!");
                    setMessage("Ha surgido un problema al intentar subir la imagen de la publicacion!");
                    setOpenAdvertiseW(true);
                    urls["urlPic"] = "";
                  }
                  else {
                    urls["urlPic"] = url+'/server/'+response.data.imageUrl;
                  }
                  if (!response.data.successAUD) {
                    setTitleModal("Aviso!");
                    setMessage("Ha surgido un problema al intentar subir su sonido Pura Vida!");
                    setOpenAdvertiseW(true);
                    urls["urlSou"] = "";
                    reject("Error al subir el audio");
                  }
                  else {
                    urls["urlSou"] = url+'/server/'+response.data.audioUrl;
                  }
                  resolve(urls);
                })
                .catch((error) => {
                  console.error('Error al cargar la imagen:', error);
                  reject("Error al subir los archivos");
            });
        })
        
    }

    const handleLatitud = (e) => {
        if (e.target.value != "" & e.target.value != ".") {
            setLat(parseFloat(e.target.value));
        }
        
    }

    const handleLong = (e) => {
        if (e.target.value != "" & e.target.value != "-" & e.target.value != ".") {
            setLong(parseFloat(e.target.value));
        }
        
    }

    const handleProvince = (e) => {
        setProvince(e.target.value);
    }

    const validatePublication = () => {
        if (namePost == "" || username == "" || lastname == "") {
            setTitleModal("Aviso!");
            setMessage("Por favor ingrese un nombre y apellido. Estos campos son obligatorios para continuar!");
            setOpenAdvertiseW(true);
            return false;
        }

        if (sound == null) {
            setTitleModal("Aviso!");
            setMessage("Por favor ingrese un archivo de sonido. Estos campos son obligatorios para continuar. Ademas tenga en cuenta los formatos validos (mp3, wav, ogg, mp4)");
            setOpenAdvertiseW(true);
            return false;
        }

        return true;
    }

    const resetFilters = () => {
        setUsername("");
        setLastName("");
        setNamePost("");
        setPostDetails("");
        setPicture(null);
        setSound(null);
    }

    const LocationFinderDummy = () => {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setLat(lat);
                setLong(lng);
                console.log("lat:"+lat+"long:"+lng);
            },
        });
        return null;
    };



    
    return(
        <div>
            <div>
                <header>
                    <Header/>
                </header>
                
                <div>
                    <AdvertiseWindow isOpen={openAdvertiseW} onRequestClose={closeAdvertiseW} msg={message} title={titleModal}/>
                        <main style={{display:"flex"}}>
                            <div className="squareForm">
                                <h3 className="h3-register" style={{position:'absolute', top:"15px", left:"60px"}}>Información de la publicación</h3>
                                <label htmlFor="namePost" style={{position:'absolute',top:"80px", left:"60px"}}>Título de la publicación</label>      
                                <input className="register-title-input" id="namePost" value={namePost} onChange={(e) => {setNamePost(e.target.value)}} style={{position:'absolute',top:"110px", left:"60px"}} placeholder='Ej: Sonidos de Cartago' required ></input>

                                <label htmlFor="namePost" style={{position:'absolute',top:"160px", left:"60px"}}>Archivo de sonido (50MB MAX) (mp3, wav, ogg, mp4)</label>      
                                <input id="namePost" type="file" accept="audio/*, video/mp4" onChange={handleAudioSelect} style={{position:'absolute',top:"190px", left:"60px"}}></input>
                                {sound && (
                                    <audio controls style={{position:'absolute',top:"220px", left:"60px"}} className="player-desing">
                                        <source src={sound} type="audio/mpeg" />
                                        Tu navegador no soporta la reproducción de audio.
                                    </audio>
                                )}

                                <label htmlFor="namePost" style={{position:'absolute',top:"280px", left:"60px"}}>Foto (50MB MAX) (png, gif, jpg, jpeg)</label>      
                                <input id="namePost" type="file" accept="image/*" name="picture" onChange={handleImageSelect} style={{position:'absolute',top:"310px", left:"60px"}}></input>
                                {!picture && (
                                    <div className="squarePreview"></div>
                                )}
                                {picture && (   
                                    <img className="preview" src={picture} alt="Vista previa de la imagen" />
                                )}
                                <label htmlFor="namePost" style={{position:'absolute',top:"610px", left:"60px"}}>Detalles o comentarios</label>      
                                <textarea className='register-details' id="namePost" value={postDetails} onChange={(e) => {setPostDetails(e.target.value)}} style={{position:'absolute',top:"640px", left:"60px"}} rows="11" cols="45" placeholder='Cuentenos la historia de su sonido Pura Vida.'></textarea>
                                {/** FORM DIVISION, POST INFO UP - USER INFO DOWN   */}
                                
                                <h3 className="h3-register" style={{position:'absolute',top:"15px", left:"600px"}}>Información del Autor</h3>
                                <label htmlFor="namePost" style={{position:'absolute',top:"80px", left:"600px"}}>Nombre del autor</label>      
                                <input className="register-user-loc-input" id="namePost" value={username} onChange={(e) => {setUsername(e.target.value)}} style={{position:'absolute',top:"110px", left:"600px"}} placeholder='Ej: Carlos'></input>

                                <label htmlFor="namePost" style={{position:'absolute',top:"80px", left:"930px"}}>Primer Apellido</label>      
                                <input className="register-user-loc-input" id="namePost" value={lastname} onChange={(e) => {setLastName(e.target.value)}} style={{position:'absolute',top:"110px", left:"930px"}} placeholder='Ej: Ramirez'></input>

                                <h3 className='h3-register' style={{position:'absolute',top:"135px", left:"600px"}}>Ubicación</h3>

                                <label htmlFor="namePost" style={{position:'absolute',top:"200px", left:"600px"}}>Latitud</label>      
                                <h4 className="h4-register" id="namePost"  style={{position:'absolute',top:"210px", left:"600px"}}>{latitude}</h4>

                                <label htmlFor="namePost" style={{position:'absolute',top:"200px", left:"930px"}}>Longitud</label>      
                                <h4 type='text' className="h4-register"  id="namePost" style={{position:'absolute',top:"210px", left:"930px"}}>{longitude}</h4>
                                
                                <label style={{position:'absolute',top:"270px", left:"600px"}} htmlFor="provincia">Provincia</label>
                                <select className='select-register' value={province} onChange={(e) => handleProvince(e)} style={{position:'absolute',top:"300px", left:"600px"}}   id="provincia">
                                    <option></option>
                                    <option value='Cartago'>Cartago</option>
                                    <option value='San Jose'>San Jose</option>
                                    <option value='Heredia'>Heredia</option>
                                    <option value='Alajuela'>Alajuela</option>
                                    <option value='Limon'>Limon</option>
                                    <option value='Puntarenas'>Puntarenas</option>
                                    <option value='Guanacaste'>Guanacaste</option>
                                </select>
                         

                                <MapContainer className="mapPost-desing" center={position} zoom={zoom} >
                                    <TileLayer
                                    url = {urlLeaflet}
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={position}>
                                        <Popup>
                                        Tu ubicación actual.
                                        </Popup>
                                    </Marker>
                                    <LocationFinderDummy />
                                </MapContainer>
                                <div>
                                <button className="register-button" style={{position:"relative", top:"430px", left:"1090px"}} onClick={registerPost}>Guardar</button>
                                </div>
                                
                                                    
                            </div>
                            <div className="squareNews">
                                <div className="squareNews-inside1">
                                    <h1 className="h1-preview">SONIDOS DEL PURA VIDA</h1>
                                </div>
                                <div className="squareNews-inside2">
                                    <p>“Los sonidos del Pura Vida” consiste en un mapa sonoro de Costa Rica, con el objetivo de crear una memoria de sonidos de nuestro país.</p>
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

export default RegisterPage;