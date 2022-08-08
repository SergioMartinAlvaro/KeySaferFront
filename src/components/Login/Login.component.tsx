import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useThemeContext } from '../../context/AppContext';
import logo from '../../assets/img/logo.svg';
import './Login.css';
import './Login.scss';

const clientId = '818764501307-7r9r4easlgfo00vc036uur3dge96b21d.apps.googleusercontent.com';

const Login = () => {
    const navigate = useNavigate();
    const { setUser, user } = useThemeContext();
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

    return(
        <section className="loginView">
            <div className={`${user.googleId && `button-hidden`}`}>
            <div className="logoView__logo">
                <h1 className="loginView__logoTitle">KeySafer</h1>
                <figure className="loginView__logoContainer">
                    <img src={logo} className="loginView__logoimage" alt="logo-key" />
                </figure>
            </div>
            <div className="loginView__buttonContainer">
                <div id="signInButton" className={`loginView__button`}>
                        <GoogleLogin
                        clientId={clientId}
                        buttonText="Acceder con Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={`single_host_origin`}
                            />
                </div>
            </div>
            </div>
        </section>

    )
}

export default Login;