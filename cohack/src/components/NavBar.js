import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Form, FormControl, Navbar, Nav, Button} from "react-bootstrap";

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
                <Nav.Link href="#home"> About </Nav.Link>
                <Nav.Link href="#features"> Map </Nav.Link>
                <Nav.Link href="#pricing"> Contact Us </Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
            </Form>
        </Navbar>
    }
}

export default NavBar