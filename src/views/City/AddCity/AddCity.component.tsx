import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { Axios } from '../../../config';
import { useThemeContext } from '../../../context/AppContext';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import { useExists } from '../../../hooks/useExists';
import './AddCity.scss';


const AddCity = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { user } = useThemeContext();

    const IsLogged = () => {
        return useCheckLogin(user);
    }

    useEffect(() => {
        if(IsLogged()) {
        } else {
            console.log("Not Logged")
            navigate('/');
        }
    }, []);

    const AgregarUsuario = async () => {
        const usuario = {
            id: uuidv4(),
            nombre: name,
        }
        
        await useExists(process.env.REACT_APP_API + '/api/cities/get-city', {nombre: name})
        .then((res) => {
            
            if(res?.data.length === 0) {
                axios.post(process.env.REACT_APP_API +  '/api/cities/insert-city', usuario)
                .then(res => {
                    setMessage('Ciudad introrucida con exito');
                    navigate(-1);
                })
                .then(err => {
                    console.log(err)
                });
            } else {
                setMessage('Ciudad ya introducida');
            }
        })
    };

    return(
        <div className="addCity">
            <div className="addCity__container">
            <div className='addCity__imageContainer'>
                    <h2 className='addCity__title'>
                        Añadir Ciudad
                    </h2>
                </div>
                <div className='addCity__listContainer'>
                    <div className="addCity__inputContainer">
                            <input type="text" className="addCity__input" value={name} placeholder="Nombre de la ciudad"
                                onChange={(e) => setName(e.target.value)}></input>
                    </div>
                </div>
                <div className='addCity__addButtonContainer'>
                    <button onClick={AgregarUsuario} className="addCity__addButton">Guardar Ciudad</button>
                        <div className='addCity__message'>
                            {message !== '' ? message : ''}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default AddCity;