import { api } from './api';

export function selectAllProductos(page) {
    return api('get', '/productos' + '?page=' + page);
}

export function getProducto(id) {
    return api('get', '/productos/' + id);
}

export function editProducto(data, id) {
    return api('put', '/productos/' + id , data);
}

export function newProducto(data) {
    return api('post', '/productos/', data);
}

export function destroyProducto(id) {
    return api('delete', '/productos/' + id);
}

export function filterProductos(filter, page) {
    return api('post', '/productFilters' + '?page=' + page, filter);
}
