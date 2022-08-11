import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ThemeContext, useThemeContext } from '../../../context/AppContext';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import { Door } from '../SingleDoor/SingleDoor.component';

const DoorList = () => {
    const params = useParams();
    const { setCommunities, communities, user, currentCity } = useThemeContext();
    const navigate = useNavigate();
    const [doors, setDoors] = useState<Door[]>([]);

    const GetAllDoors = async () => {
        console.log(params);
        axios.post(process.env.REACT_APP_API + '/api/door/get-doors-comunidadId', {communityId: params.idComunidad})
        .then(res => {
            console.log(res.data)
           setDoors(res.data);
        })
        .then(err => {
   
        });
    };

    const IsLogged = () => {
        return useCheckLogin(user);
    }

    useEffect(() => {
        if(IsLogged()) {
            GetAllDoors();
        } else {
          navigate('/');
        }
    }, []);

    const deleteDoor = async (id: string) => {
        axios.delete('/door/delete-door', {data: {id: id}})
        .then(res => {
            GetAllDoors();
        });
    };

    return (
        <div>
            {doors && <div>
                    {doors.map(door =>
                        <div className="cityList__list">
                            <Link to={`/door/${door.id}`}>
                                <div className="cityList__city">
                                    {door.nombre}
                                </div>
                            </Link> 
                            <div className="cityList__buttonContainer">
                            <Link to={`/edit-door/${door.id}`}>
                                <button type="button" className="cityList__button cityList__button--edit">
                                    Editar
                                </button>
                            </Link> 
                            <button onClick={() => deleteDoor(door.id)} type="button" className="cityList__button cityList__button--edit">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    )}
                </div>}
        </div>
    )
}
export interface Community {
    id: string,
    tipocalle: string,
    nombrecalle: string,
    numerocalle: string,
    createdAt: any,
    updatedAt: any,
    ciudadId: string
}
export default DoorList;