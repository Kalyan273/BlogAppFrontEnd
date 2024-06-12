import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Footer() {
  return (
    // <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
        <p className="col-md-4 mb-0 text-body-secondary" style={{ marginLeft: '20px' }}>© 2024 MyBlog, Inc</p>

        <Navbar.Brand as={NavLink} to="/"><h3>MyBlog</h3></Navbar.Brand>
        

        <Nav className="col-md-4 justify-content-end">
          <Nav.Item><Nav.Link href="#" className="px-2 text-body-secondary">Home</Nav.Link></Nav.Item>
          {/* <Nav.Item><Nav.Link href="#" className="px-2 text-body-secondary">Features</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="#" className="px-2 text-body-secondary">Pricing</Nav.Link></Nav.Item> */}
          <Nav.Item><Nav.Link href="#" className="px-2 text-body-secondary">FAQs</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="#" className="px-2 text-body-secondary">About</Nav.Link></Nav.Item>
        </Nav>
      </footer>
    // </div>
  );
}