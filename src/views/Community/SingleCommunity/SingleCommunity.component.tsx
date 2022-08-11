import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useThemeContext, ThemeContext } from '../../../context/AppContext';
import CommunityList from '../CommunityList/CommunitList.component';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import DoorList from '../../Door/DoorList/DoorList.component';
import './SingleCommunity.scss';

const SingleCommunity = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const { currentCommunity, setCurrentCommunity } = useThemeContext();
    const [community, setCommunity] = useState<any>({

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
        if(community.id) {
            setCommunity(community);
        }
    }, [community])

    useEffect(() => {

    },[])

    const getCurrentCommunity = () => {
        debugger;
        axios.post(process.env.REACT_APP_API + '/api/communities/get-community-id', {id: params.idComunidad})
        .then(res => {
            setCommunity(res.data[0]);
            setCurrentCommunity(res.data[0]);
        })
        .then(err => {
            console.log(err)
        });
    }

    /*
    
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
    
    */

    
    return(
        <div className="singleCommunity">
            <div className='singleCommunity__container'></div>
            <h2 className="singleCommunity__title">Puertas de {currentCommunity.tipocalle} {currentCommunity.nombrecalle} {currentCommunity.numerocalle} </h2>
            <DoorList />
            <div className="singleCommunity__addButtonContainer">
                <Link to={`/add-door`}>
                    <button type="button" className="singleCommunity__addButton">+</button>
                </Link>
            </div>
        </div>
    )
}

export default SingleCommunity;