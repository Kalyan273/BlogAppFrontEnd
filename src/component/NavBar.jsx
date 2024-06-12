import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import ModalPopUp from './ModalPopUp';
import { useState, useEffect } from 'react';
import { TfiWrite } from "react-icons/tfi";



function Navigationbar() {

   const { logout, isAuthenticated, user, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  //const { state, signIn, signOut,isAuthenticated } = useAuthContext();

  const [show, setShow] = useState(false);
  const [userMetadata, setUserMetadata] = useState(null);
  const handleClose = () => setShow(false);
  // const handleShow = (loginFunction) => {
  //    setShow(true);
  //   loginFunction();
  // }

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-7koug4ccbn8cflje.us.auth0.com"; // Replace {yourDomain} with your Auth0 domain

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });
  console.log(accessToken);
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata); // Print user metadata to console
      } catch (e) {
        console.log(e.message);
      }
    };

    if (isAuthenticated) {
      getUserMetadata(); // Fetch user metadata when user is authenticated
    }
  }, [getAccessTokenSilently, user?.sub, isAuthenticated]);



  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary" style={{ padding: '20px 0', height: '80px' }} >
      <Container>
        <Navbar.Brand as={NavLink} to="/">MyBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>

            <NavDropdown title="Content" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/blogs">MyBlog</NavDropdown.Item>
              {/* <NavDropdown.Item as={NavLink} to="/addBlog">Add Blog</NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
          </Nav>
          <div className='d-flex align-items-center'>
            <Nav.Link as={NavLink} to="/about" style={{ color: 'white' }}>Our story</Nav.Link>
            {/* <Nav.Link as={NavLink} to="/addBlog" style={{ color: 'white', marginLeft: '20px' }}>Write </Nav.Link> */}

            {isAuthenticated ? (
              <>
              <Nav.Link as={NavLink} to="/addBlog" style={{ color: 'white', marginLeft: '20px' }}>Write </Nav.Link>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>

                <Navbar className="bg-body-tertiary">
                  <Container>
                    <img src={user.picture} alt={user.name} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }} />
                  </Container>
                  {/* <Container>
                    <Navbar.Brand>{state.username}</Navbar.Brand>
                  </Container> */}
                  <Container>
                    <Navbar.Brand>{user.email}</Navbar.Brand>
                  </Container>
                  {userMetadata ? (
                    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                  ) : (
                    "No user metadata defined"
                  )}
                </Navbar>
              </>
            ) : (
              <>
                
                <Button variant="light" onClick={() => loginWithRedirect()} style={{ borderRadius: '20px', marginLeft: '20px' }}>Get Started</Button>
              </>
            )}
          </div>

          {/* <ModalPopUp show={show} handleClose={handleClose} /> */}
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
{/* {isAuthenticated ? (
              <>
                <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
                
                <Navbar className="bg-body-tertiary">
                  <Container>
                    <img src={user.picture} alt={user.name} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }} />
                  </Container>
                  <Container>
                    <Navbar.Brand>{user.name}</Navbar.Brand>
                  </Container>
                  <Container>
                    <Navbar.Brand>{user.email}</Navbar.Brand>
                  </Container>
                </Navbar>
              </>
            ) : (
              <button onClick={loginWithRedirect}>Login</button>
            )} */}

export default Navigationbar;