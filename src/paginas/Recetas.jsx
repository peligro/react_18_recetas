import { useLoaderData } from 'react-router-dom';
import {getRecetas, getCategorias} from './../servicios/recetasService';
import { useState } from 'react';

export async function loader()
{
    let datos = await getRecetas();
    let categorias = await getCategorias();
    return [categorias, datos];
}

const Recetas = () => {

  let [categorias, datos] =useLoaderData();
  const [search, setSearch]=useState("");
  const [categoria_id, setCategoria_id]=useState("0");
  const handleSubmit =async (e)=>{
    e.preventDefault();
    //console.log(`categoria_id=${categoria_id} | search=${search}`);
    if(categoria_id=="0")
    {
      return false;
    }
    window.location=`/recetas/buscador?categoria_id=${categoria_id}&search=${search}`;
  };
  return (
    <>
      <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb4.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>Recetas</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="top-catagory-area section-padding-80-0">
        <div className="container">

          <div className="receipe-post-search mb-80">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                
                <div className="col-12 col-lg-4">
                  <select id="categoria_id" className="form-control" onChange={(e)=>setCategoria_id(e.target.value)}>
                    <option value="0">Seleccione....</option>
                    {categorias.map((categoria)=>
                      (
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                      ))}
                  </select>
                </div>

                <div className="col-12 col-lg-4">
                  <input type="text" className="form-control" id="search" onChange={(e)=>setSearch(e.target.value)} />
                </div>

                <div className="col-12 col-lg-3 text-right">
                  <button type="submit" className="btn delicious-btn" title="Buscar">
                  <i className="fas fa-search"></i> Buscar
                  </button>
                </div>

                
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      <section className="best-receipe-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h3>Todas nuestras recetas</h3>
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

export default Recetas
