import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { Axios } from '../../../config';
import { useThemeContext } from '../../../context/AppContext';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import { useExists } from '../../../hooks/useExists';


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
        <div className="container">
            <div className="row">
                <h2 className="mt-4"> Añadir nueva ciudad</h2>
                <div className="row">
                    <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Nombre
                            </label>
                            <input type="text" className="form-control" value={name} 
                                onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <button onClick={AgregarUsuario} className="btn btn-success">Guardar Ciudad</button>
                        <div>
                            {message !== '' ? message : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCity;