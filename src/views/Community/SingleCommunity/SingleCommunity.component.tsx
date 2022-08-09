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
        axios.post(process.env.REACT_APP_API + '/api/communities/get-community-id', {id: params.idComunidad})
        .then(res => {
            setCommunity(res.data[0]);
            setCurrentCommunity(res.data[0]);
        })
        .then(err => {
            console.log(err)
        });
    }
    return(
        <div className="singleCommunity">
            <h2 className="singleCommunity__title">Puertas de {community.tipocalle} {community.nombrecalle} {community.numerocalle} </h2>
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