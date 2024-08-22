import { useContext, useEffect, useState } from 'react';
import AuthContext from './../context/AuthProvider';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { sendDataReceta, sendDataRecetaEditar, sendDataRecetaEliminar } from './../servicios/PanelService';
//npm install @fancyapps/ui@4.0.31 
//https://medium.com/@emailsolah/how-to-build-a-lightbox-youtube-popup-in-react-424d89e3e494
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
const Panel = () => {
  const { handleEstaLogueado } = useContext(AuthContext);
  const [datos, setDatos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    const traerRecetas = async () => {
      const data = await (
        await fetch(`${import.meta.env.VITE_API_URL}recetas-helper/panel/${localStorage.getItem('recetas_flaites_id')}`, { headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}` } })
      ).json();

      setDatos(data);
    };
    const traerCategorias = async () => {
      const data = await (
        await fetch(`${import.meta.env.VITE_API_URL}categorias`, { headers: { 'content-type': 'application/json' } })
      ).json();

      setCategorias(data);
    };
    return () => {
      handleEstaLogueado();
      traerRecetas();
      traerCategorias();
    };
  }, []);
  //ventana modal
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState('');
  const [tiempo, setTiempo] = useState("");
  const [categoria_id, setCategoria_id] = useState("0");
  const [descripcion, setDescripcion] = useState("");
  const [acciones, setAcciones] = useState(1);
  const [accionesId, setAccionesId] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCrear = () => {
    setAcciones(1);
    setNombre('');
    setTiempo("");
    setCategoria_id("0");
    setDescripcion("");
    handleShow();
  }
  const handleEditar = async (modulo) => {
    setAcciones(2);
    setAccionesId(modulo.id);
    setNombre(modulo.nombre);
    setTiempo(modulo.tiempo);
    setCategoria_id(modulo.categoria_id);
    setDescripcion(modulo.descripcion);
    handleShow();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoria_id == "0") {
      alert("Debe seleccionar una categoría");
      setNombre("");
      return;
    }
    if (nombre == 0 || nombre == "") {
      alert("El campo Nombre es obligatorio");
      setNombre("");
      return;
    }
    if (tiempo == 0 || tiempo == "") {
      alert("El campo Tiempo es obligatorio");
      setNombre("");
      return;
    }
    if (descripcion == 0 || descripcion == "") {
      alert("El campo Descripción es obligatorio");
      setNombre("");
      return;
    }
    if (acciones == 1) {
      try {
        await sendDataReceta(tiempo, categoria_id, descripcion, nombre);
        alert("Se creó el registro exitosamente");
      } catch (error) {
        alert("Ocurrió un error inesperado");
      }
    }
    if (acciones == 2) {
      try {
        await sendDataRecetaEditar({ nombre: nombre, tiempo: tiempo, descripcion: descripcion, categoria_id: categoria_id }, accionesId);
        alert("Se modificó el registro exitosamente");
      } catch (error) {
        alert("Ocurrió un error inesperado");
      }
    }

    window.location = "/panel";
  };
  
  const handleEliminar = async (id) => {
    if (window.confirm("¿Realmente desea eliminar este registro?")) {
      try {
        await sendDataRecetaEliminar(id);
        alert("Se eliminó el registro exitosamente");
      } catch (error) {
        alert("Ocurrió un error inesperado");
      }
      window.location = "/panel";
    }

  };
  return (
    <>
      <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb6.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>Panel</h2>
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
                <h3>Mis recetas publicadas</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="receipe-ratings text-right my-5">
                <a onClick={handleCrear} className="btn delicious-btn"><i className="fas fa-plus"></i> Crear</a>
              </div>
            </div>
            <hr />
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Categoría</th>
                      <th>Nombre</th>
                      <th>Tiempo</th>
                      <th>Detalle</th>
                      <th>Foto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datos.map((dato) => (
                      <tr key={dato.id}>
                        <td>{dato.id}</td>
                        <td>{dato.categoria}</td>
                        <td>{dato.nombre}</td>
                        <td>{dato.tiempo}</td>
                        <td>{dato.descripcion}</td>
                        <td className='text-center'>
                          <a href={dato.foto}  className="lightbox d-block"
    data-fancybox="image-gallery">
                          <img src={dato.foto} alt="" style={{width:"100px"}} />
                          </a>
                        </td>
                        <td className="text-center">
                          <Link to={`/panel-editar/${dato.id}`} title="Editar foto"><i className="fas fa-pen-square"></i></Link>
                          &nbsp;&nbsp;
                          <Link to="#" onClick={() => { handleEditar(dato) }} title="Editar">
                            <i className="fas fa-edit"></i>
                          </Link>
                          &nbsp;&nbsp;
                          <Link to="#" onClick={()=>handleEliminar(dato.id)} title="Eliminar"><i className="fas fa-trash"></i></Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>



      <Modal size="lg" show={show} onHide={handleClose} id="listingModal">
        <Modal.Header>
          <Modal.Title>
            {acciones === 1 ? "Crear" : "Editar"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='row gy-3'>
              <div className='col-lg-12'>
                <label htmlFor="categoria_id">Categoría</label>
                <select value={categoria_id}
                  onChange={(e) => setCategoria_id(e.target.value)} id="categoria_id" className="form-control">
                  <option value="0">Seleccione....</option>
                  {categorias.map((categoria) =>
                  (
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                  ))}
                </select>
              </div>


              <div className='col-lg-12'>
                <label className="form-label" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  className="form-control"
                  id="nombre"
                  type="text"
                  placeholder='Nombre'
                  value={nombre}
                  onChange={(e) => { setNombre(e.target.value) }}
                />
              </div>

              <div className='col-lg-12'>
                <label className="form-label" htmlFor="tiempo">
                  Nombre
                </label>
                <input
                  className="form-control"
                  id="tiempo"
                  type="text"
                  placeholder='Tiempo'
                  value={tiempo}
                  onChange={(e) => { setTiempo(e.target.value) }}
                />
              </div>
              <div className="col-lg-12">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)} id="descripcion" className="form-control" placeholder="Descripción"></textarea>
              </div>
              {acciones === 1 && (
                <>
                  <div className='col-lg-12'>
                    <label className="form-label" htmlFor="foto">
                      Foto
                    </label>
                    <input
                      className="form-control"
                      id="foto"
                      type="file"
                      placeholder='Foto'
                    />
                  </div>
                </>
              )}

            </div>
            <hr />
            <div className='row'>
              <div className="col-6"></div>
              <div className="col-6 d-flex justify-content-end">
                <button className='btn btn-primary'>
                  {acciones === 1 ? (
                    <>
                      <i className="fas fa-plus"></i> Crear
                    </>
                  ) : (
                    <>
                      <i className="fas fa-pencil-alt"></i> Editar
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Panel

/*
 <Modal size="lg" show={show} onHide={handleClose} id="listingModal">
            <Modal.Header>
                <Modal.Title>
                    {título
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>contenido</h1>
            </Modal.Body>
          </Modal>
*/