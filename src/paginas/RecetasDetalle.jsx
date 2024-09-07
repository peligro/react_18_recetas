import { useLoaderData } from 'react-router-dom';
import {getReceta} from './../servicios/recetasService';

export async function loader({params})
{
    let datos = await getReceta(params.id);
    if(!datos){window.location="/error";}
    return datos;
}
 const RecetasDetalle = () => {
  let datos =useLoaderData();
  return (
    <>
        <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb4.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>{datos.nombre}</h2>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="receipe-post-area section-padding-80">


  <div className="container">
      <div className="row">
          <div className="col-12">
            <img src={datos.foto} alt={datos.nombre} />
          </div>
      </div>
  </div>

  <div className="receipe-content-area">
      <div className="container">

          <div className="row">
              <div className="col-12 col-md-8">
                  <div className="receipe-headline my-5">
                      <span>{datos.fecha}</span>
                      <h2>{datos.nombre}</h2>
                      <div className="receipe-duration">
                          <h6>Tiempo: {datos.tiempo} </h6>
                          <h6>Categoría: {datos.categoria}</h6>
                          <h6>Creada por: {datos.usuario}</h6>
                      </div>
                  </div>
              </div>


          </div>

          <div className="row">
              <div className="col-12 col-lg-12">
                  <div className="single-preparation-step d-flex">

                      <p>{datos.descripcion}</p>
                  </div>

              </div>

          </div>


      </div>
  </div>
</div>
    </>
  )
}

export default RecetasDetalle
