
import { useState } from 'react';
import {createContext} from 'react';

let AuthContext =createContext();
let AuthProvider = ({children})=>
{
    let [auth, setAuth] = useState(  (localStorage.getItem('recetas_flaites_id')!=null) ? true:false);//if(localStorage.getItem('recetas_flaites_id')!=null){return true;}else{false;}
    let [authId, setAuthId]=useState('');
    let [authNombre, setAuthNombre]=useState('');
    let [authToken, setAuthToken]=useState('');

    const handleEstasLogueado=()=>
    {
        if(!auth && localStorage.getItem('recetas_flaites_id')==null)
        {
            window.location="/login";
        }
        setAuth(true);
        setAuthId(localStorage.getItem('recetas_flaites_id'));
        setAuthNombre(localStorage.getItem('recetas_flaites_nombre'));
        setAuthToken(localStorage.getItem('recetas_flaites_token'));
    };
    const handleIniciarSesion=(id, nombre, token)=>
    {
        localStorage.setItem('recetas_flaites_id', id);
        localStorage.setItem('recetas_flaites_nombre', nombre);
        localStorage.setItem('recetas_flaites_token', token);
        setAuth(true);
    };
    const handleCerrarSesion=()=>
    {
        if(window.confirm("¿Realmente desea cerrar la sesión?"))
        {
            localStorage.clear();
            setAuth(false);
            window.location="/login";
        }
    };
    const handleMantenLaSesion = () => {

        if (auth && localStorage.getItem('recetas_flaites_id') != null) {
            setAuth(true);
            setAuthId(localStorage.getItem('recetas_flaites_id'));
            setAuthNombre(localStorage.getItem('recetas_flaites_nombre'));
            setAuthToken(localStorage.getItem('recetas_flaites_token'));
        }
    
    }
    return (
        <AuthContext.Provider value={{
            auth, authId, authNombre, authToken, handleEstasLogueado, handleIniciarSesion, handleCerrarSesion, handleMantenLaSesion
        }}>
            {children}
        </AuthContext.Provider>
     );
};
export {
    AuthProvider
}
export default AuthContext