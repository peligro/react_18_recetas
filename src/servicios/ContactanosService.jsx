import axios from 'axios';//npm install axios | https://axios-http.com/docs/example

export async function sendDataContacto(request) {
    let datos = axios
        .post(`${import.meta.env.VITE_API_URL}contacto`, request, {
            headers:{'content-type':'application/json'}
        })
        .then((response) => {
            return response.status;
        }).catch((error) => {
            console.log(error);
        });
    return datos;
}