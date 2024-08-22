import axios from 'axios';//npm install axios | https://axios-http.com/docs/example

export async function getCategorias()
{
    let datos =axios.get(`${import.meta.env.VITE_API_URL}categorias`,
    {
        headers:{'content-type':'application/json'}
    }).then( (response)=>
    {
        if(response.status==200)
        {   
            return response.data;
        }else
        {
            console.log("falló la comunicación en el then");
        }
        
    } ).catch((err)=>
    {
        console.log("falló la comunicación");
    });
    return datos;
}
export async function getCategoria(id)
{
    let datos =axios.get(`${import.meta.env.VITE_API_URL}categorias/${id}`,
    {
        headers:{'content-type':'application/json'}
    }).then( (response)=>
    {
        if(response.status==200)
        {   
            return response.data;
        }else
        {
            console.log("falló la comunicación en el then");
        }
        
    } ).catch((err)=>
    {
        console.log("falló la comunicación");
    });
    return datos;
}
export async function getRecetas()
{
    let datos =axios.get(`${import.meta.env.VITE_API_URL}recetas`,
    {
        headers:{'content-type':'application/json'}
    }).then( (response)=>
    {
        if(response.status==200)
        {   
            return response.data;
        }else
        {
            console.log("falló la comunicación en el then");
        }
        
    } ).catch((err)=>
    {
        console.log("falló la comunicación");
    });
    return datos;
}
export async function getReceta(id)
{
    let datos =axios.get(`${import.meta.env.VITE_API_URL}recetas/${id}`,
    {
        headers:{'content-type':'application/json'}
    }).then( (response)=>
    {
        if(response.status==200)
        {   
            return response.data;
        }else
        {
            console.log("falló la comunicación en el then");
        }
        
    } ).catch((err)=>
    {
        console.log("falló la comunicación");
    });
    return datos;
}
export async function getRecetasBuscador(catagoria_id, search)
{
    console.log(`${import.meta.env.VITE_API_URL}recetas-helper/buscador?categoria_id=${catagoria_id}&search=${search}`);
    let datos =axios.get(`${import.meta.env.VITE_API_URL}recetas-helper/buscador?categoria_id=${catagoria_id}&search=${search}`,
    {
        headers:{'content-type':'application/json'}
    }).then( (response)=>
    {
        if(response.status==200)
        {   
            return response.data;
        }else
        {
            console.log("falló la comunicación en el then");
        }
        
    } ).catch((err)=>
    {
        console.log("falló la comunicación");
    });
    return datos;
}