import axios from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import FileUpload from '../../../components/FileUploader/FileUploader';
import { ThemeContext, useThemeContext } from '../../../context/AppContext';
import { useCheckLogin } from '../../../hooks/useCheckLogin';

const AddDoor = () => {
    const [doorName, setDoorName] = useState('');
    const [doorComments, setDoorComments] = useState('');
    const [doorPhoto, setDoorPhoto] = useState<any>();
    const [doorPhotoName, setDoorPhotoName] = useState('');
    const { currentCommunity } = useContext(ThemeContext);
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

    const setPhotoValues = (photo:any, name:any) => {
        setDoorPhoto(photo);
        setDoorPhotoName(name);
    }

    const InsertDoor = async () => {
        const door = {
            id: uuidv4(),
            Nombre: doorName,
            Comentarios: doorComments,
            Foto: doorPhotoName,
            Comunidad_id: currentCommunity.id
        }
        const formData = new FormData();
        doorPhoto && formData.append("file", doorPhoto);
        formData.append("Foto", doorPhotoName);
        formData.append("Id", uuidv4());
        formData.append('Nombre', doorName);
        formData.append('Comentarios', doorComments);
        formData.append('Comunidad_id', currentCommunity.id);
                axios.post('/door/insert-door', formData)
                .then(res => {
                    setMessage('Puerta introrucida con exito');
                    navigate(-1);
                })
                .then(err => {
                    setMessage('No se ha podido insertar la puerta')
                    console.log(err)
                });
    };

    return(
        <div className="container">
            <div className="row">
    <h2 className="mt-4"> Añadir nueva puerta a {currentCommunity.nombrecalle}</h2>
                <div className="row">
                    <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Nombre de la Puerta
                            </label>
                            <input type="text" className="form-control" value={doorName} 
                                onChange={(e) => setDoorName(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Comentarios de la Puerta
                            </label>
                            <input type="text" className="form-control" value={doorComments} 
                                onChange={(e) => setDoorComments(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Numero de calle
                            </label>
                            <FileUpload evento={setPhotoValues} />
                        </div>
                        <button onClick={InsertDoor} className="btn btn-success">Guardar Puerta</button>
                        <div>
                            {message !== '' ? message : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDoor;