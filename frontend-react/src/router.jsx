import {createBrowserRouter} from "react-router-dom";
import Usuario from "./views/usuarios/perfil";
import NotFound from "./views/NotFound";
import Layout from "./components/Layout";
import Inicio from "./views/inicio";
import Shop from "./views/productos/shop";
import Contacto from "./views/contact";
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
                path: "/contacto",
                element: <IsNotAuth><Contacto/></IsNotAuth>
            },
            {
                path: "/newProducto",
                element: <IsNotAuth><NewProducto/></IsNotAuth>
            },
            {
                path: "/user/:id",
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