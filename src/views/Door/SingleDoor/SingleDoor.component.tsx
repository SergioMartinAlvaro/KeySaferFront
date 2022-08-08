import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useThemeContext, ThemeContext } from '../../../context/AppContext';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import './SingleDoor.scss';


export interface Door {
    Id: string,
    Nombre: string,
    Comentarios: string,
    Foto: string,
    Comunidad_id: string,
    created_at: any,
    updated_at: any
}

const SingleDoor = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const { currentCommunity, setCurrentCommunity } = useThemeContext();
    const [door, setDoor] = useState<any>({

    });
    const { user } = useThemeContext();
    const navigate = useNavigate();

    const IsLogged = () => {
        return useCheckLogin(user);
    }

    useEffect(() => {
        if(IsLogged()) {
            getCurrentCommunity();
        } else {
            console.log("Not Logged")
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if(door.Id) {
            setDoor(door);
        }
    }, [door])

    useEffect(() => {

    },[])

    const getCurrentCommunity = () => {
        axios.post('/door/get-door-id', {id: params.idDoor})
        .then(res => {
            setDoor(res.data[0]);
        })
        .then(err => {
            console.log(err)
        });
    }
    return(
        <div className="singleCommunity">
            <h2 className="singleCommunity__title">Puerta {door.Nombre} en {currentCommunity.nombrecalle} </h2>
            <p className="singleCommunity__subtitle">{door.Comentarios}</p>
            {door.Foto && <img className="singleCommunity__subtitle" src={`http://localhost:5000/${door.Foto.substring(door.Foto.lastIndexOf('/') + 1)}`} />}
        </div>
    )
}

export default SingleDoor;