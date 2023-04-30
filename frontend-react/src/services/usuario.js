import { api } from './api';

export function getUser() {
    return api('get', '/user/');
}

export function getUserProfile(id){
    return api('get', '/userData/' + id);
}