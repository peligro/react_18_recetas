
export async function sendDataReceta( tiempo, categoria_id, descripcion, nombre) {
    let file = document.querySelector("input[type=file]").files[0];

    let formData = new FormData();
    formData.append('file', file);
    formData.append('categoria_id', categoria_id);
    formData.append('nombre', nombre);
    formData.append('tiempo', tiempo);
    formData.append('descripcion', descripcion);
    formData.append('usuario_id', localStorage.getItem('recetas_flaites_id'));
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}recetas`, {
        method: 'POST',
        body: formData 
    }) 
    await respuesta.json()
}
export async function sendDataRecetaEditar(datos, id) {

    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}recetas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: {'content-type':'application/json'}
    })
    await respuesta.json()

}
export async function sendDataRecetaEliminar(id) {
    console.log(`${import.meta.env.VITE_API_URL}recetas/${id}`);
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}recetas/${id}`, {
        method: 'DELETE', 
        headers: {'content-type':'application/json'}
    })
    await respuesta.json()

}
export async function sendDataRecetaEditarFoto( id) {
    let file = document.querySelector("input[type=file]").files[0];

    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}recetas-helper/${id}`, {
        method: 'POST',
        body: formData 
    }) 
    return   respuesta.status
}