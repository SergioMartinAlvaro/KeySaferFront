import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {login} from "../../services/login.service"
import { useThemeContext } from '../../context/AppContext';
import logo from '../../assets/img/logo.svg';
import './Login.css';
import './Login.scss';

const clientId = '818764501307-7r9r4easlgfo00vc036uur3dge96b21d.apps.googleusercontent.com';

const Login = () => {
    const navigate = useNavigate();
    const { setUser, user } = useThemeContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSuccess = (res:any) => {
        if(res.profileObj.googleId === process.env.REACT_APP_GOOGLEID) {
            setUser(res.profileObj);
            localStorage.setItem('userLogged', JSON.stringify(res.profileObj));
            navigate('/home')
        } else {
            console.log("user unauthorized")
        }
    };

    useEffect(() => {
        const localUser = localStorage.getItem('userLogged');
        if(localUser) {
            setUser(JSON.parse(localUser));
            navigate('/home');
        }
    }, []);

    const onFailure = (res:any) => {
        console.log("All wrong");
    };

    const loginAction = async () => {
        if(username && password) {
            await login(username, password).then((res:any) => {
                if(res.status === 200) {
                    alert('Todo okay');
                } else {
                    alert('No se encuentra')
                }
            })
        }
    }

    return(
        <section className="loginView">
            <div className={`${user.googleId && `button-hidden`}`}>
            <div className="logoView__logo">
                <h1 className="loginView__logoTitle">KeySafer</h1>
                <figure className="loginView__logoContainer">
                    <img src={logo} className="loginView__logoimage" alt="logo-key" />
                </figure>
            </div>
            <div className='loginView__inputContainer'>
                <input type={'text'} className='loginView__input' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type={'password'} className='loginView__input' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="loginView__buttonContainer">
                <button id="signInButton" className={`loginView__button`} onClick={loginAction}>
                    Login
                </button>
            </div>
            </div>
        </section>

    )
}

export default Login;