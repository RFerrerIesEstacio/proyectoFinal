import {createBrowserRouter} from "react-router-dom";
import LogIn from "./views/Auth/login";
import SignUp from "./views/Auth/signup";
import Usuario from "./views/usuarios/perfil";
import NotFound from "./views/NotFound";
import FormLayout from "./components/FormLayout";
import Layout from "./components/Layout";
import Inicio from "./views/inicio";
import Shop from "./views/productos/shop";
import New from "./views/productos/newProducto";
import Contacto from "./views/contact";
import UserLayout from "./components/UserLayout";
import { IsAuth, IsNotAuth } from './guards/auth';
import NewProducto from "./views/productos/newProducto";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Inicio/>
            },
            {
                path: "/inicio",
                element: <Inicio/>
            },
            {
                path: "/tienda",
                element: <IsNotAuth><Shop/></IsNotAuth>
            },
            {
                path: "/signup",
                element: <IsAuth><SignUp/></IsAuth>
            },
            {
                path: "/login",
                element: <IsAuth><LogIn/></IsAuth>
            },
            {
                path: "/contacto",
                element: <IsNotAuth><Contacto/></IsNotAuth>
            },
            {
                path: "/newProducto",
                element: <IsNotAuth><NewProducto/></IsNotAuth>
            },
            {
                path: "/user",
                element: <IsNotAuth><Usuario/></IsNotAuth>
            },
            {
                path: "*",
                element: <NotFound/>
            },
        ]
    },
]);

export default router;