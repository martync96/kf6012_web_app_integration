import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';
/**
* links menu component
* 
* This is the component that creates the links menu nav bar that is present at the top of every page
*  
* @author Martyn Clow W20045942
*/

function LinksMenu(props) {
 return (
  <Navbar bg="light" expand="lg">
   <Container>
    <Navbar.Brand href="/kf6012/assignment/">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto">
      <LinkContainer to="/admin"><Nav.Link>Admin</Nav.Link></LinkContainer>
      <LinkContainer to="/documentation"><Nav.Link>Documentation</Nav.Link></LinkContainer>
      <NavDropdown title="View Papers" id="basic-nav-dropdown">
       <NavDropdown.Item href="allpapers">All Papers</NavDropdown.Item>
       <NavDropdown.Item href="interactivity">Interactivty</NavDropdown.Item>
       <NavDropdown.Item href="fullPapers">Full Papers</NavDropdown.Item>
       <NavDropdown.Item href="wip">Work in Progress</NavDropdown.Item>
       <NavDropdown.Item href="competition">Competition</NavDropdown.Item>
       <NavDropdown.Item href="doctoral">Doctoral</NavDropdown.Item>
       <NavDropdown.Item href="rapid">Rapid</NavDropdown.Item>
      </NavDropdown>
     </Nav>
     {props.authenticated ? (
            <Nav>
               <input type="button" value="Sign out" onClick={props.handleLogout}/>
            </Nav>
          ) : null}
    </Navbar.Collapse>
   </Container>
  </Navbar>
 );
}
 
export default LinksMenu;