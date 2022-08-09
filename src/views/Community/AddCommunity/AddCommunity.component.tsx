import axios from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { ThemeContext, useThemeContext } from '../../../context/AppContext';
import { useCheckLogin } from '../../../hooks/useCheckLogin';

const AddCommunity = () => {
    const [streetName, setStreetName] = useState('');
    const [streetType, setStreetType] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const { currentCity } = useContext(ThemeContext);
    const [message, setMessage] = useState('');
    const { user } = useThemeContext();
    const navigate = useNavigate();

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

    const InsertCommunity = async () => {
        const usuario = {
            id: uuidv4(),
            tipocalle: streetType,
            nombrecalle: streetName,
            numerocalle: streetNumber,
            ciudadId: currentCity.id
        }
                axios.post(process.env.REACT_APP_API + '/api/communities/insert-community', usuario)
                .then(res => {
                    setMessage('Comunidad introrucida con exito');
                })
                .then(err => {
                    console.log(err)
                });
    };

    return(
        <div className="container">
            <div className="row">
    <h2 className="mt-4"> Añadir nueva comunidad a {currentCity.nombre}</h2>
                <div className="row">
                    <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Tipo de calle
                            </label>
                            <input type="text" className="form-control" value={streetType} 
                                onChange={(e) => setStreetType(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Nombre de calle
                            </label>
                            <input type="text" className="form-control" value={streetName} 
                                onChange={(e) => setStreetName(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Numero de calle
                            </label>
                            <input type="text" className="form-control" value={streetNumber} 
                                onChange={(e) => setStreetNumber(e.target.value)}></input>
                        </div>
                        <button onClick={InsertCommunity} className="btn btn-success">Guardar Comunidad</button>
                        <div>
                            {message !== '' ? message : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCommunity;