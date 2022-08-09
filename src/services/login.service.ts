import axios from "axios";

const login = async (username: string, password: string) => {
    const userObject = {
        username: username,
        password: password
    };

    axios.post('/user/get-auth-user', userObject)
    .then(res =>  {
        if(res.status === 200) {
            return res.data;
        } else {
            return res.data;
        }
    })
}

export {
    login
}