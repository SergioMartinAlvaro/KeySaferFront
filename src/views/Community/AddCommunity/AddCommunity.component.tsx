import axios from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { ThemeContext, useThemeContext } from '../../../context/AppContext';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import './AddCommunity.scss';

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
        if(streetType && streetName) {
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
                        navigate(-1);
                    })
                    .then(err => {
                        console.log(err)
                    });
        } else {
            setMessage('Debes introducir los campos obligatorios')
        }

    };

    return(
        <div className="addCommunity">
            <div className="addCommunity__container">
            <div className='addCommunity__imageContainer'>
                    <h2 className='addCommunity__title'>
                        Añadir Comunidad
                    </h2>
                </div>
                <div className='addCommunity__listContainer'>
                    <div className="addCity__inputContainer">
                    <input type="text" className="addCommunity__input" value={streetType} 
                                onChange={(e) => setStreetType(e.target.value)}></input>
                    <input type="text" className="addCommunity__input" value={streetName} 
                                onChange={(e) => setStreetName(e.target.value)}></input>
                    <input type="text" className="addCommunity__input" value={streetNumber} 
                                onChange={(e) => setStreetNumber(e.target.value)}></input>
                    </div>
                </div>
                <div className='addCommunity__addButtonContainer'>
                    <button onClick={InsertCommunity} className="addCommunity__addButton">Guardar Comunidad</button>
                        <div className='addCommunity__message'>
                            {message !== '' ? message : ''}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default AddCommunity;