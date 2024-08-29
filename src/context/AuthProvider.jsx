import { useState, createContext } from 'react';


let AuthContext = createContext();
let AuthProvider = ({ children }) => {
    let [auth, setAuth] = useState((localStorage.getItem('recetas_flaites_id') != null) ? true : false);
    let [authId, setAuthId] = useState('');
    let [authNombre, setAuthNombre] = useState('');
    let [authToken, setAuthToken] = useState('');

    const handleEstaLogueado = () => {

        if (!auth && localStorage.getItem('recetas_flaites_id') == null) {
            window.location = "/login";
        }
        setAuth(true);
        setAuthId(localStorage.getItem('recetas_flaites_id'));
        setAuthNombre(localStorage.getItem('recetas_flaites_nombre'));
        setAuthToken(localStorage.getItem('recetas_flaites_token'));
    }
    const handleMantenLaSesion = () => {

        if (auth && localStorage.getItem('recetas_flaites_id') != null) {
            setAuth(true);
            setAuthId(localStorage.getItem('recetas_flaites_id'));
            setAuthNombre(localStorage.getItem('recetas_flaites_nombre'));
            setAuthToken(localStorage.getItem('recetas_flaites_token'));
        }
    
    }
    const handleIniciarSesion = (id, nombre, token) => {
        localStorage.setItem('recetas_flaites_id', id);
        localStorage.setItem('recetas_flaites_nombre', nombre);
        localStorage.setItem('recetas_flaites_token', token);
        setAuth(true);
    }
    const handleCerrarSesion = () => 
    {
        if(window.confirm("¿Realmente desea cerrar la sesión?"))
        {
            localStorage.clear();
            setAuth(false);
            window.location="/login";
        }
    }
    return (
        <AuthContext.Provider value={{
            auth, handleIniciarSesion, handleEstaLogueado, handleCerrarSesion, authId, authNombre, authToken, handleMantenLaSesion

        }}>
            {children}
        </AuthContext.Provider>
    );
};
export {
    AuthProvider
}
export default AuthContext


/*

let AuthContext = createContext();
let AuthProvider = ({children})=>
{

}
export {
    AuthProvider
}
export default AuthContext
*/