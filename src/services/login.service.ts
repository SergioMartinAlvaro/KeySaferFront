import axios from "axios";

const login = async (username: string, password: string) => {
    const userObject = {
        username: username,
        password: password
    };
    let response = {};

    await axios.post(process.env.REACT_APP_API + '/api/user/get-auth-user', userObject)
    .then(res =>  {
        if(res.status === 200) {
            response = res;
        } else {
           response = {message: 'Usuario/contraseña incorrecto'};
        }
    })
    return response;
}

export {
    login
}