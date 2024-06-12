import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import SignUp from '../assets/pages/SignUp';
import ModalPopUp from './ModalPopUp';



const AboutNavBar = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={NavLink} to="/"><h1>MyBlog</h1></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="light" onClick={handleShow}>Sign in</Button>
                        <Button variant="light" onClick={handleShow}>Sign up</Button>
                        <ModalPopUp show={show} handleClose={handleClose} />

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default AboutNavBar