

export async function sendDataRegistro(datos)
{
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}usuarios/registro`,
        {
            method:'POST',
            body: JSON.stringify(datos),
            headers:{'content-type':'application/json'}
        });
    return respuesta.status;
}

export async function sendDataLogin(datos)
{
    let respuesta = await fetch(`${import.meta.env.VITE_API_URL}usuarios/login`,
        {
            method:'POST',
            body: JSON.stringify(datos),
            headers:{'content-type':'application/json'}
        });
    return [await respuesta.json(), respuesta.status];
}