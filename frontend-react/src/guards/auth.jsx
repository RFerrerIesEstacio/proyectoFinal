import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import useModal from "../hooks/useModal";


export const IsAuth = ({ children }) => {
  const user = useUser();
  if (user.isLogged) {

  }
  return user.isLogged ? <Navigate to="/" replace /> : <>{children}</>;
}

export const IsNotAuth = ({ children }) => {
  const user = useUser();
  const openModal = useModal();
  return user.isLogged ? <>{children}</> : <Navigate to="/" replace />;
}

