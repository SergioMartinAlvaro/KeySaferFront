import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { City } from '../CityList/CityList.component';
import { useThemeContext, ThemeContext } from '../../../context/AppContext';
import CommunityList from '../../Community/CommunityList/CommunitList.component';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import './SingleCity.scss';
const SingleCity = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const { currentCity, setCurrentCity, setCommunities } = useThemeContext();
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
            <h2 className="singleCity__title">Comuninades de {currentCity && currentCity.nombre} </h2>
            <CommunityList />
            <div className="communityList__addButtonContainer">
                <Link to={`/add-community`}>
                    <button type="button" className="communityList__addButton">+</button>
                </Link>
            </div>
        </div>
    )
}

export default SingleCity;