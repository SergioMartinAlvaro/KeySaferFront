import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '818764501307-7r9r4easlgfo00vc036uur3dge96b21d.apps.googleusercontent.com';

const Logout = () => {
    const onSuccess = () => {
        console.log("Logout okay");
    };

    return(
        <div id="signInButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Login"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;