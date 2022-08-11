import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { City } from '../CityList/CityList.component';
import { useThemeContext, ThemeContext } from '../../../context/AppContext';
import CommunityList, { Community } from '../../Community/CommunityList/CommunitList.component';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import './SingleCity.scss';
const SingleCity = () => {
    const params = useParams();
    const [name, setName] = useState('');

    const { currentCity, setCurrentCity, setCommunities, communities } = useThemeContext();
    const [searchParameter, setSearchParameter] = useState('');
    const [city, setCity] = useState<City>({
        id: '',
        nombre: '',
        created_at: '',
        updated_at: ''
    });
    const { user } = useThemeContext();
    const navigate = useNavigate();

    const IsLogged = () => {
        return useCheckLogin(user);
    }

    useEffect(() => {
        if(IsLogged()) {
            getCurrentCity();
        } else {
            console.log("Not Logged")
            navigate('/');
        }
    }, []);

    useEffect(() => {
        
        if(city.id) {
            setCurrentCity(city);
        }
    }, [city])

    useEffect(() => {

    },[])

    const getCurrentCity = () => {
        axios.post(process.env.REACT_APP_API + '/api/cities/get-city-id', {id: params.idCiudad})
        .then(res => {
            setCity(res.data[0]);
            setCurrentCity(res.data[0]);
        })
        .then(err => {
            console.log(err)
        });
    }

    return(
        <div className="singleCity">
            <div className='singleCity__container'>
            <div className='singleCity__imageContainer'>
                    <h2 className='singleCity__title'>
                        Comuninades de {currentCity && currentCity.nombre}
                    </h2>
                </div>
                <div className='cityList__search'>
                    <input type="text" className='cityList__input' placeholder='Busca  una ciudad' onChange={(e) => setSearchParameter(e.target.value)}/>
                </div>
                <div className='singleCity__listContainer'>
                    <CommunityList searchParam={searchParameter}/>
                </div>
                <div className="singleCity__addButtonContainer">
                <Link to={`/add-community`}>
                    <button type="button" className="singleCity__addButton">Añadir Comunidad</button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default SingleCity;