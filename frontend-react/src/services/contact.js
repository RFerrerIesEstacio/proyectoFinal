import { api } from './api';

export function contact(data) {
    return api('post', '/contact/', data);
}