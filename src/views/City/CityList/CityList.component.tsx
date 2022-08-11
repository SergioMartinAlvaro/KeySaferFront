import React, {useEffect, useState} from 'react';
import SingleUser from '../SingleCity/SingleCity.component';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import { useThemeContext } from '../../../context/AppContext';
import './CityList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../../components/Modal/Modal.component';

const CityList = () => {
    const navigate = useNavigate();
    const [cities, setCities] = useState<City[]>([]);
    const [searchCities, setSearchCities] = useState<City[]>([]);
    const { user, showModal, setShowModal } = useThemeContext();
    const [showConfirmation, setShowConfirmation] = useState(showModal);

    useEffect(() => {
        setShowConfirmation(showModal);
    }, [showModal])

    const GetAllCities = async () => {
        axios.get(process.env.REACT_APP_API + '/api/cities/get-all-cities')
        .then(res => {
            
           setCities(res.data);
        })
        .then(err => {
   
        });
    };

    const deleteCity = async (id: string) => {
        axios.delete('/api/cities/delete-city', {data: {id: id}})
        .then(res => {
            console.log('OK');
            GetAllCities();
        });
    };

    const IsLogged = () => {
        return useCheckLogin(user);
    }

    const searchQuery = (value:string) => {
        if(value) {
           let query = cities.filter(city => city.nombre.indexOf(value) != -1 );
           setSearchCities(query);
        } else {
            setSearchCities(cities);
        }
    }


    useEffect(() => {
        setSearchCities(cities);
    }, [cities]);

    useEffect(() => {
        console.log(cities)
        ;
        if(IsLogged()) {
            
            console.log("Logged")
            GetAllCities()
        } else {
            console.log("Not Logged")
            navigate('/');
        }
    }, []);

    return (
        <section className='cityList'>
            <div className='cityList__container'>
                <div className='cityList__imageContainer'>
                    <h2 className='cityList__title'>
                        Ciudades
                    </h2>
                </div>
                <div className='cityList__search'>
                    <input type="text" className='cityList__input' placeholder='Busca  una ciudad' onChange={(e) => searchQuery(e.target.value)}/>
                </div>
                <div className='cityList__listContainer'>
                {(searchCities && searchCities.length) && <div>
                    {searchCities.map(city =>
                        <div className="cityList__list">
                            <Link to={`/city/${city.id}`}>
                                <div className="cityList__name">
                                    {city.nombre}
                                </div>
                            </Link> 
                            <div className="cityList__buttonContainer">
                            <Link to={`/edit-city/${city.id}`}>
                                <button type="button" className="cityList__button cityList__button--edit">
                                <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </Link> 
                            <button onClick={() => setShowModal(true)} type="button" className="cityList__button cityList__button--edit">
                            <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            {showConfirmation && 
                    <Modal okAction={() => deleteCity(city.id)} cancelAction={() => setShowModal(false)}>
                        <p>Estás a punto de borrar una ciudad.</p>
                        <p>¿Estás seguro de que quieres realizar esta acción?</p>
                    </Modal>
                }
                        </div>
                        
                    )}
                </div>}
                </div>
                <div className='cityList__addButtonContainer'>
                <Link to={`/add-city`}>
                    <button type="button" className="cityList__addButton">Añadir ciudad</button>
                </Link>
                </div>
            </div>
        </section>
    )
/*
    return (
        <div className="cityList">
            <h2 className="cityList__title">Listado de ciudades</h2>
            {(cities && cities.length) && <div>
                    {cities.map(city =>
                        <div className="cityList__list">
                            <Link to={`/city/${city.id}`}>
                                <div className="cityList__name">
                                    {city.nombre}
                                </div>
                            </Link> 
                            <div className="cityList__buttonContainer">
                            <Link to={`/edit-city/${city.id}`}>
                                <button type="button" className="cityList__button cityList__button--edit">
                                <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </Link> 
                            <button onClick={() => setShowModal(true)} type="button" className="cityList__button cityList__button--edit">
                            <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            {showConfirmation && 
                    <Modal okAction={() => deleteCity(city.id)} cancelAction={() => setShowModal(false)}>
                        <p>Estás a punto de borrar una ciudad.</p>
                        <p>¿Estás seguro de que quieres realizar esta acción?</p>
                    </Modal>
                }
                        </div>
                        
                    )}
                </div>}
                <div className="cityList__addButtonContainer">
                <Link to={`/add-city`}>
                    <button type="button" className="cityList__addButton">+</button>
                </Link>
                </div>
        </div>
    )*/
}
export interface City {
    id: string,
    nombre: string,
    created_at: any,
    updated_at: any
}
export default CityList;