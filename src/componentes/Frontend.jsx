import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthProvider';
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