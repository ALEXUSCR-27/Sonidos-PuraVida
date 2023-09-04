
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';

//COMPONENTS
import MainPage from './components/MainPage';
import RegisterPage from './components/RegisterPage';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path = "/" element = {<MainPage/>}/>
            <Route exact path = "/postPublication" element = {<RegisterPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
