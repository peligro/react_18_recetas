

export async function sendDataRegistro(datos) {
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}usuarios/registro`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {'content-type':'application/json'}
    })  
    return await respuesta.status
}

export async function sendDataLogin(datos) {
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}usuarios/login`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {'content-type':'application/json'}
    }) 
    return  [await respuesta.json(), respuesta.status]
}
export async function getDatosPanel()
{
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}recetas-helper/panel/${localStorage.getItem('recetas_flaites_id')}`, {headers: {'content-type':'application/json', 'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}`}});
    const resultado = await respuesta.json();
    return resultado;
}