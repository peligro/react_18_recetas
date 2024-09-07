
export async function getDatosHome()
{
    let respuesta =await fetch(`${import.meta.env.VITE_API_URL}recetas-helper`, {headers:{'content-type':'application/json'}});
    //const resultado= respuesta.json();
    return await respuesta.json(); 
}