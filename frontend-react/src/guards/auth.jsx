import useUser from "../hooks/useUser";
import  {Navigate}  from "react-router-dom";


export const IsAuth = ({children}) => {
    const user = useUser();
    return user.isLogged ? <Navigate to="/inicio" replace /> : <>{children}</>;
}

export const IsNotAuth = ({children}) => {
    const user = useUser();
    return user.isLogged ? <>{children}</> : <Navigate to="/login" replace />;
}

