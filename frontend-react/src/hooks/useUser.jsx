import { useContext, useState } from "react";
import Context from "../context/userContext";
import { useNavigate } from "react-router-dom";
import * as auth from "../services/auth";
import * as usuario from "../services/usuario";


export default function useUser() {
  //const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const { setJWT, isLogged, setLogged, userData, setUserData, setAuthBarer } = useContext(Context)
  const navigate = (a) => {};
  const login = (data) => {
    return new Promise((res, rej) => {
      auth.login(data).then((data) => {
        console.log(setLogged);
        setLogged(true);
        setJWT(data.token);
        setAuthBarer(data.token);
        fetchUserData().then(() => res());
      })
      .catch((e) => {
        setErrors(e.errors ?? {});
        console.log(e);
        rej();
      });
    });
  };

  const logout = () => {
    setJWT(null);
    setLogged(false);
    setUserData('');
    navigate('/login');
  };

  const fetchUserData = () => {
    return usuario.getUser().then((data) => {
      setUserData(data);
    }).catch((e) => console.log(e));
  }

  const register = (data) => {
    return auth.register(data).then(({ token }) => {
      setLogged(true);
      setJWT(token);
      setAuthBarer(token);
      fetchUserData().then(() => navigate('/inicio/'));
    })
      .catch((e) => {
        setErrors(e.errors ?? {});
      })
  }

  const getUserData = (id) => {
    return usuario.getUserProfile(id).then((data) => {
      setUserProfile(data);
    }).catch((e) => console.log(e));
  }
  return {
    logout,
    register,
    login,
    setLogged,
    errors,
    isLogged,
    fetchUserData,
    userData,
    setUserData,
    getUserData,
    userProfile, 
    setUserProfile
  }
}