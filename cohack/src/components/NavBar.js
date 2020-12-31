import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar} from "react-bootstrap";

class NavBar extends Component {
    render() {
        return <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home" >
                <img
                    alt=""
                    src={require('../images/covidLogo.png')}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    onClick={() => window.location.assign('/')}
                />
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href={process.env.REACT_APP_ABOUT}> About </Nav.Link>
                <Nav.Link href="#features"> Map </Nav.Link>
                <Nav.Link href="#pricing" onSelect={() => alert('No <3')}> Don't Contact Us </Nav.Link>
            </Nav>

        </Navbar>
    }
}

export default NavBar
