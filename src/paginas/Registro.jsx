import { useState } from "react";
import {sendDataRegistro} from "./../servicios/AccesoService";
 

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [boton, setBoton] = useState("block");
  const [preloader, setPreloader] = useState("none");

  const recibirFormulario = async (e) => {
    e.preventDefault();
    
    if (nombre == 0 || nombre == "") {
      alert("El campo Nombre es obligatorio");
      setNombre("");
      return;
    }
    if (correo == 0 || correo == "") {
      alert("El campo E-Mail es obligatorio");
      setCorreo("");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(correo)) 
    {
      alert("El E-Mail ingresado no es válido");
      setCorreo("");
      return;
    }
    
    if (password == 0 || password == "") {
      alert("El campo Contraseña es obligatorio");
      setPassword("");
      return;
    }
    setBoton('none');
    setPreloader('block');
    if(await sendDataRegistro({nombre: nombre, correo: correo, password:password})==201)
    {
      alert("Se ha creado tu cuenta exitosamente!!\nSe ha enviado un mail al correo que nos indicaste para verificar tu acceso.");
    }else
    {
      alert("Se produjo un error inesperado");
    }
    window.location=location.href;
  };
  return (
    <>
        <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb6.jpg)" }}>
  <div className="container h-100">
      <div className="row h-100 align-items-center">
          <div className="col-12">
              <div className="breadcumb-text text-center">
                  <h2>Registro</h2>
              </div>
          </div>
      </div>
  </div>
</div>


<div className="contact-area section-padding-0-80">
  <div className="container">
      <div className="row">
          <div className="col-12">
              <div className="section-heading">
                  <h3>Regístrate</h3>
              </div>
          </div>
      </div>

      <div className="row">
          <div className="col-8">
              <div className="contact-form-area">
                <form onSubmit={recibirFormulario}>
                      <div className="row">
                          <div className="col-12 col-lg-12">
                              <input type="text" className="form-control" name="nombre" placeholder="Nombre" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                              
                          </div>
                          <div className="col-12 col-lg-12">
                              <input type="text" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="E-Mail" />
                              
                          </div>
                          <div className="col-12">
                          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
                             
                          </div>
                          <div className="col-12 text-center" style={{display:boton}}>
                              <button className="btn delicious-btn mt-30" type="submit" title="Enviar"  >Enviar</button>
                          </div>
                          <div className="col-12 text-center" style={{display:preloader}}>
                              <img src="/img/img/load.gif" alt="" />
                            </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</div>

    </>
  )
}

export default Registro