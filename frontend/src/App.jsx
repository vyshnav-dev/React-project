import { Outlet,useLocation } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "./components/AdminHeader";

const App = () => {
  const location=useLocation();
  const isAdminPage = location.pathname.startsWith('/admin')
  return (
    <>
      {isAdminPage ? <AdminHeader/> : <Header/>}
      <ToastContainer/>
      <Container className="my-2">
      <Outlet/>
      </Container>
     
    </>
  );
}

export default App;


