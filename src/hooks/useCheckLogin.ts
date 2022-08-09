import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../context/AppContext';
// Recuerda siempre usar la palabra "use" al principio de cada custom hook

export const useCheckLogin = (user?:any) => {
    const element = localStorage.getItem('userLogged');
    const isUserLogged = element && JSON.parse(element).password === process.env.REACT_APP_GOOGLEID;
    return isUserLogged;
}