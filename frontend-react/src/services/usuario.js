import { api } from './api';

export function getUser() {
    return api('get', '/user/');
}