import axios from 'axios';

export async function sendDataContacto(request)
{
    return axios.post(`${import.meta.env.VITE_API_URL}contacto`, request, {headers:{'content-type':'application/json'}})
    .then((response)=>
        {
            return response.status;
        })
    .catch((error)=>
        {
            console.log(error);
        });
}