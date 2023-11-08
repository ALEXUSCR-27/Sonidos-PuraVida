
import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import React, { useState } from 'react';


//COMPONENTS
import MainPage from './components/MainPage';
import RegisterPage from './components/RegisterPage';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import Publication from './components/Publication';
import Terms from './components/Terms';



function App() {

  const [publication, setPublication] = useState(null);

  return (
    <BrowserRouter>
        <Routes>
            <Route exact path = "/" element = {<MainPage setPublication={setPublication}/>}/>
            <Route exact path = "/postPublication" element = {<RegisterPage/>}/>
            <Route exact path = "/adminSPV"  element = {<AdminLogin/>}/>
            <Route exact path = "/adminPage" element = {<AdminPage/>}/>
            <Route exact path = "/seePublication/" element = {<Publication data={publication}/>}/>
            <Route exact path= "/terms&conditions" element = {<Terms/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
