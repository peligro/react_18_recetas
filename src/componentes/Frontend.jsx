import { Outlet  } from 'react-router-dom';
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'
import {AuthProvider} from './../context/AuthProvider';
const Frontend = () => {
  return (
    <>
    <AuthProvider>
    <Header />
        <Outlet />
   
    <Footer />
    </AuthProvider>
    </>
  )
}

export default Frontend