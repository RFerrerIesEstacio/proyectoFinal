import axios from 'axios';

export function setAuthBarer(jwt) {
    headers.Authorization = 'Bearer ' + jwt;
}

const headers = {

};

export async function api(method, url, data) {
    try {
        return (await axios({
            method,
            url,
            data,
            headers
        })).data;
    } catch({response}) {
        throw response.data;
    }
}