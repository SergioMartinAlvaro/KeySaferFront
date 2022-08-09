import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ThemeContext, useThemeContext } from '../../../context/AppContext';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import './CommunityList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../../components/Modal/Modal.component';

const CommunityList = () => {
    const params = useParams();
    const { setCommunities, communities, user, currentCity, showModal, setShowModal } = useThemeContext();
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(showModal);

    useEffect(() => {
        setShowConfirmation(showModal);
    }, [showModal])

    const GetAllCommunities = async () => {
        axios.post(process.env.REACT_APP_API + '/api/communities/get-communities-cityId', {ciudadId: params.idCiudad})
        .then(res => {
           setCommunities(res.data);
        })
        .then(err => {
   
        });
    };

    const IsLogged = () => {
        return useCheckLogin(user);
    }

    useEffect(() => {
        if(IsLogged()) {
            GetAllCommunities();
        } else {
          navigate('/');
        }
    }, []);

    const deleteCommunitiy = async (id: string) => {
        axios.delete(process.env.REACT_APP_API + '/api/communities/delete-community', {data: {id: id}})
        .then(res => {
            GetAllCommunities();
        });
    };

    return (
        <div>
            {(communities && communities.length) && <div className="communityList">
                    {communities.map(community =>
                        <div className="communityList__list">
                            <Link to={`/community/${community.id}`}>
                                <div className="communityList__city">
                                {community.tipocalle} {community.nombrecalle} {community.numerocalle}
                                </div>
                            </Link> 
                            <div className="communityList__buttonContainer">
                            <Link to={`/edit-city/${community.id}`}>
                                <button type="button" className="communityList__button communityList__button--edit">
                                <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </Link> 
                            <button onClick={() => setShowModal(true)} type="button" className="communityList__button cityList__button--edit">
                                <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            {showConfirmation && 
                    <Modal okAction={() => deleteCommunitiy(community.id)} cancelAction={() => setShowModal(false)}>
                        <p>Estás a punto de borrar una comunidad.</p>
                        <p>¿Estás seguro de que quieres realizar esta acción?</p>
                    </Modal>
                }
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
export default CommunityList;