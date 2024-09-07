import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '../public/style.css';

import Frontend from './componentes/Frontend';
import Home, {loader as homeListar}  from './paginas/Home';
import SobreNosotros from './paginas/SobreNosotros';
import Recetas, {loader as recetasListar} from './paginas/Recetas';
import RecetasDetalle, {loader as recetasListarDetalle} from './paginas/RecetasDetalle';
import RecetasBuscador, {loader as recetasListarDetalleBuscador} from './paginas/RecetasBuscador';
import Contactanos from './paginas/Contactanos';
import Registro from './paginas/Registro';
import Login from './paginas/Login';
import Panel from './paginas/Panel';
import PanelEditar, {loader as panelEditarLoader}  from './paginas/PanelEditar';
import Error404 from './paginas/Error404';


const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <Frontend />,
      children:
      [
        {
          index:true,
          element: <Home />,
          loader: homeListar
        },
        {
          path:'/sobre-nosotros',
          element: <SobreNosotros />
        },
        {
          path:'/recetas',
          element: <Recetas />,
          loader: recetasListar
        },
        {
          path:'/recetas/detalle/:id',
          element: <RecetasDetalle />,
          loader: recetasListarDetalle
        },
        {
          path:'/recetas/buscador',
          element: <RecetasBuscador />,
          loader: recetasListarDetalleBuscador
        },
        {
          path:'/contactanos',
          element: <Contactanos />
        },
        {
          path:'/registro',
          element: <Registro />
        },
        {
          path:'/login',
          element: <Login />
        },
        {
          path:'/panel',
          element: <Panel />
        },{
          path:'/panel-editar/:id',
          element:<PanelEditar />,
          loader: panelEditarLoader
        },
        {
          path:'*',//esta ruta siempre debe estar al final de todas las demás
          element: <Error404 />
        }
      ]
    }
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

 