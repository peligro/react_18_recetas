

export async function sendDataReceta(tiempo, categoria_id, descripcion, nombre)
{
    let file = document.querySelector("input[type=file]").files[0]; 
    
    let formData=new FormData();
    formData.append('file', file);
    formData.append('categoria_id', categoria_id);
    formData.append('nombre', nombre);
    formData.append('tiempo', tiempo);
    formData.append('descripcion', descripcion);
    formData.append('usuario_id', localStorage.getItem('recetas_flaites_id'));
    let respuesta=await fetch(`${import.meta.env.VITE_API_URL}recetas`, 
        {
            method:'POST',
            body: formData,
            headers: {'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}`}
        }); 
    await respuesta.json();
}


export async function sendDataRecetaEditar(datos, id)
{
    let respuesta=await fetch(`${import.meta.env.VITE_API_URL}recetas/${id}`, 
        {
            method:'PUT',
            body: JSON.stringify(datos),
            headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}`}
        }); 
    await respuesta.json();
}
export async function sendDataRecetaEditarFoto( id) {
    let file = document.querySelector("input[type=file]").files[0];
    
    let formData = new FormData();
    formData.append('file', file); 
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}recetas-helper/${id}`, {
        method: 'POST',
        body: formData ,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}`}
    }) 
    return   respuesta.status
}
export async function sendDataRecetaEliminar( id) {
 
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}recetas/${id}`, {
        method: 'DELETE', 
        headers: {'content-type': 'application/json',  'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}`}
    }) 
    await respuesta.json()
}