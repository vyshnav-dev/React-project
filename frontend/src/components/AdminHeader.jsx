import { Navbar,Nav,Container,NavDropdown } from "react-bootstrap";

import { useDispatch,useSelector } from "react-redux";
import{LinkContainer} from 'react-router-bootstrap'
import { useLogoutMutation } from "../adminSlices/adminApiSlice"; 
import { logout } from "../adminSlices/adminSlice";
import { useNavigate } from "react-router-dom";
const AdminHeader = () =>{


    const { adminInfo } = useSelector((state) => state.admin)
       console.log(adminInfo);
        const dispatch=useDispatch();
        const navigate= useNavigate();

        const [logoutApiCall] = useLogoutMutation();

        const logoutHandler = async () =>{
                try {
                    await logoutApiCall().unwrap();
                    dispatch(logout());
                    navigate('/adminlogin')
                } catch (err) {
                    console.log(err);
                }
        }

    return(
        <header>
            <Navbar bg='dark' variant="dark" expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand href="/">Admin</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            { adminInfo ? (
                                <>
                                <NavDropdown title={'ADMIN'} id='username'>
                                    
                                    <NavDropdown.Item onClick={ logoutHandler }>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                </>
                            ) : 
                            (
                            <>
                          
                            </>
                            )
                             }
                            
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>

        </header>
    );
};

export default AdminHeader;