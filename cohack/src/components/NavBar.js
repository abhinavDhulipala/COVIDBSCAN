import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar} from "react-bootstrap";

class NavBar extends Component {
    render() {
        return <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home" >
                <img
                    alt=""
                    src={require("../images/covidLogo.png")}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href={'https://devpost.com/software/covidb'}> About </Nav.Link>
                <Nav.Link href="#features"> Map </Nav.Link>
                <Nav.Link href="#pricing"> Don't Contact Us </Nav.Link>
            </Nav>

        </Navbar>
    }
}

export default NavBar