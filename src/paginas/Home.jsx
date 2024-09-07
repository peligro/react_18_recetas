import { useLoaderData } from 'react-router-dom';
import {getDatosHome} from './../servicios/HomeService';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';
export async function loader()
{
    let datos = await getDatosHome();
    return datos;
}

 const Home = () => {
    const {handleMantenLaSesion} =useContext(AuthContext);
    useEffect(() => {
       
    
      return () => {
        handleMantenLaSesion();
      }
    }, []);
    let datos =useLoaderData(); 
     
    
    
  return (
    <>
        <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb3.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>Recetas flaites - Desarrollado con React 18  </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="top-catagory-area section-padding-80-0">
        <div className="container">

        </div>
      </section>
      <section className="best-receipe-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h3>Últimas recetas publicadas  </h3>
              </div>
            </div>
          </div>

          <div className="row">

           
            {datos.map((dato)=>(
               <div key={dato.id} className='col-12 col-sm-6 col-lg-4'>
                 <div className="single-best-receipe-area mb-30">
                    <img src={dato.foto} alt={dato.nombre} className='foto-mini' />
                    <div className="receipe-content">
                        <a href={`/recetas/detalle/${dato.id}`} title={dato.nombre}>
                            <h5>{dato.nombre}</h5>
                        </a>
                    </div>
                 </div>
               </div>
            ))}

          </div>
        </div>
      </section>
    </>
  )
}

export default Home
