import * as productos from "../services/productos";
import { useNavigate } from "react-router-dom";
import  {useState} from "react";

export default function useProductos(){

    const navigate = useNavigate();
    const [listaProductos, setListaProductos] = useState();
    const [productErrors, setProductErrors] = useState({});    
    const [newProducto, setNewProducto] = useState();
    const [length, setLength] = useState();

    function getList(filters, value) {
        return productos.filterProductos(filters, value).then((data) => {
            setListaProductos(data.data);
            setProductErrors({});
            setLength(data.last_page);
        }).catch((e) =>{
            setProductErrors(e.errors ?? {});
        });
    }

    function removeItem(id){
        return productos.destroyProducto(id).then((data) => {            
            const filtros = {
                search: '',
                preciomin: 0,
                preciomax: 1000
            } 
            getList(filtros, 1);
        }            
        ).catch((e) => {
            setProductErrors(e.errors ?? {});
        }); 
    }

    function editItem(id){
        if(id === ''){

            navigate('/newProducto');
        }
        else{
            const producto = listaProductos.filter( ($producto) => $producto.id === id);
            navigate('/newProducto', {state: producto[0]});
        }
    }

    function putProducto(producto, id){
        if(id !== ''){
            console.log(producto)
            productos.editProducto(producto, id).
            then((data) => navigate('/tienda')).
            catch((e) => {
                setProductErrors(e.errors ?? {})
            });
        }
        else {
            productos.newProducto(producto).
                then((data) => navigate('/tienda')).
                catch((e) => setProductErrors(e.errors ?? {}));
        }
    }

    function filterProductos(filtros){
        productos.filterProductos(filtros)
        .then((data) => {
            setLength(data.last_page);
            setListaProductos(data.data);
            setProductErrors({});
        })
        .catch((e) => setProductErrors(e.errors ?? {}));
    }

    return {
        getList,
        listaProductos,
        setListaProductos,
        productErrors,
        editItem,
        removeItem,
        putProducto,
        setNewProducto,
        newProducto,
        length,
        setLength,
        filterProductos
    }
}
