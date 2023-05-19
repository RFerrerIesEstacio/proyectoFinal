import * as productos from "../services/productos";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function useProductos() {

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
    }).catch((e) => {
      setProductErrors(e.errors ?? {});
    });
  }

  function removeItem(id) {
    return productos.destroyProducto(id).then((data) => {
      location.reload();
    }
    ).catch((e) => {
      setProductErrors(e.errors ?? {});
    });
  }

  function editItem(id) {
    if (id === '') {

      navigate('/newProducto');
    }
    else {
      // setListaProductos(userData.listaProductos);
      const producto = listaProductos.filter(($producto) => $producto.id === id);
      navigate('/newProducto', { state: producto[0] });
    }
  }

  function putProducto(producto, id) {
    if (id !== '') {
      productos.editProducto(producto, id).
        then(navigate('/user/' + JSON.parse(localStorage.getItem('user')).userData.id)).
        catch((e) => {
          setProductErrors(e.errors ?? {})
        });
    }
    else {
      productos.newProducto(producto).
        then((data) => navigate('/user/' + JSON.parse(localStorage.getItem('user')).userData.id)).
        catch((e) => setProductErrors(e.errors ?? {}));
    }
  }

  function filterProductos(filtros) {
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
