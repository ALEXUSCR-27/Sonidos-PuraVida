import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import '../styles/terms.css'

function Terms() {
    return (
        <div>
            <header>
                <Header/>
            </header>
            <main style={{display:"flex"}}>
                <div className="squareLeft">
                <h2> <strong>Términos de Uso</strong></h2>
                    <p>Esta plataforma es de propiedad de la Universidad Estatal a Distancia. Los sonidos contenidos en la plataforma BioSonidos están protegidos por una Licencia Creative Commons del tipo Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0) Costa Rica.</p> 
                    <h3> <strong>Licencia de uso </strong></h3>
                    <p> <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es">https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es</a></p>
                    <p>Gracias a esta licencia es posible:</p>
                    <ul>
                        <li>Copiar, distribuir, compartir, comunicar y utilizar públicamente los sonidos de la plataforma.</li>
                        <li>Generar obras derivadas, transformar y construir nuevo material a partir de los sonidos.</li>
                    </ul>
                    <h3> <strong>Términos de uso de la Colección Biosonidos</strong></h3>
                    <p>El uso de los sonidos de la plataforma BioSonidos está enmarcado por los siguientes términos:</p>
                    <ul>
                        <li> <strong>Atribución:</strong> Debes reconocer y citar la obra de la forma especificada por el autor o el licenciante.
                            <p>Recomendamos citar su uso considerando las normas APA con el siguiente ejemplo:</p>
                            <p>Vargas-Masís, R. (2019). Mochuelo enano. BioSonidos. UNED, Costa Rica.</p>
                        </li>
                        <li><strong>No Comercial:</strong> No es posible utilizar los sonidos de la plataforma para fines comerciales. </li>
                        <li><strong>Licenciar Igual:</strong> Si generas una obra derivada a partir de los sonidos de la plataforma, sólo puedes distribuir las modificaciones generada bajo una licencia idéntica a ésta.</li>
                        <li><strong>Compartir Igual:</strong> Si genera una obra derivada a partir de los sonidos contenidos en la plataforma, tienes que dejar bien claro los términos de la licencia de esta nueva obra. Alguna de estas condiciones puede no aplicarse si se obtiene el permiso del titular de los derechos de autor. Nada en esta licencia sustituye o restringe los derechos morales del autor.</li>
                    </ul>

                    
                    <p>El texto legal completo de esta licencia puede encontrarse en: <a>https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.es</a>
                    En caso de utilizar el contenido de la manera indicada en la licencia, se solicita enviar por cortesía aviso vía correo electrónico a <a>biosonidos@uned.ac.cr</a></p>
                    <p>
                        <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                            <img alt="Licencia Creative Commons" style={{borderWidth:"0"}} src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"/>
                            <br/>
                        </a>Esta obra está bajo una 
                        <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"> Licencia Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional</a>
                    </p>
                </div>
                <div className="squareRight">
                    <div className="squareRight-inside1">
                        <h1 className="h1-preview">SONIDOS DEL PURA VIDA</h1>
                    </div>
                    <div className="squareRight-inside2">
                        <p>Con Sonidos Pura Vida, buscamos contribuir a la memoria sonora creando un mapa con sonidos característicos de las comunidades a través de la participación ciudadana.
                        </p>
                    </div>
                </div>
            </main>
            
           
            <footer>      
                <Footer/>
            </footer>
        </div>
    );
}

export default Terms;