import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import "@fontsource/roboto"; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Menu from './components/Menu/Menu.component';
import AddCity from './views/City/AddCity/AddCity.component';
import EditCity from './views/City/EditCity/EditCity.component';
import SingleCity from './views/City/SingleCity/SingleCity.component';
import { ThemeProvider, useThemeContext } from './context/AppContext';
import AddCommunity from './views/Community/AddCommunity/AddCommunity.component';
import CityList from './views/City/CityList/CityList.component';
import { gapi } from 'gapi-script';
import Login from './components/Login/Login.component';
import SingleCommunity from './views/Community/SingleCommunity/SingleCommunity.component';
import AddDoor from './views/Door/AddDoor/AddDoor.component';
import { useCheckLogin } from './hooks/useCheckLogin';
import SingleDoor from './views/Door/SingleDoor/SingleDoor.component';

const clientId = '818764501307-7r9r4easlgfo00vc036uur3dge96b21d.apps.googleusercontent.com';

function App() {
  const { setUser, user, showModal, setShowModal } = useThemeContext();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load(`client:auth2`, start);
  }, [])

  return (
    <div className="App">
      <ThemeProvider>
        <BrowserRouter>
        
        {useCheckLogin() && <Menu />}
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/home' element={<CityList />}></Route>
            <Route path='/add-city' element={<AddCity/>}></Route>
            <Route path='/edit-city' element={<EditCity />}></Route>
            <Route path='/city/:idCiudad' element={<SingleCity />}></Route>
            <Route path='/edit-city/:idCiudad' element={<EditCity />}></Route>
            <Route path='/add-community' element={<AddCommunity />}></Route>
            <Route path='/community/:idComunidad' element={<SingleCommunity />}></Route>
            <Route path='/add-door' element={<AddDoor />}></Route>
            <Route path='/door/:idDoor' element={<SingleDoor />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
