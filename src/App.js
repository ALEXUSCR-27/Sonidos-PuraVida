
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';

//COMPONENTS
import MainPage from './components/MainPage';
import RegisterPage from './components/RegisterPage';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path = "/" element = {<MainPage/>}/>
            <Route exact path = "/postPublication" element = {<RegisterPage/>}/>
            <Route exact path = "/adminSPV"  element = {<AdminLogin/>}/>
            <Route exact path = "/adminPage" element = {<AdminPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
