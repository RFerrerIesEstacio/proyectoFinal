import React, {useEffect, useState} from 'react'
import { setAuthBarer } from '../services/api';



function loadUser() {
    let user = localStorage.getItem('user');
    // Load jwt
    if (user) {
        user = JSON.parse(user);
        setAuthBarer(user.jwt);
        return user;
    } else {
        return {};
    }
}

let user = loadUser();

const Context = React.createContext({});  


export function UserContextProvider ({children}){
    const [jwt, setJWT] = useState(user.jwt);
    const [isLogged, setLogged] = useState(user.isLogged);
    const [userData, setUserData] = useState(user.userData);

    useEffect(() => { // Save context on update data
        user = {
            jwt,
            isLogged,
            userData
        };
        localStorage.setItem('user', JSON.stringify(user));
    }, [jwt, isLogged, userData]);


    return <Context.Provider value={{jwt, setJWT, isLogged, setLogged, userData, setUserData, setAuthBarer}}>
        {children}
    </Context.Provider>
}

export default Context;