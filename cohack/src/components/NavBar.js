import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar} from "react-bootstrap";

class NavBar extends Component {
    render() {
        return <Navbar bg="light" variant="light">
            <Navbar.Brand href="/" >
                <img
                    alt=""
                    src={require('../images/covidLogo.png')}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href={process.env.REACT_APP_ABOUT}> About </Nav.Link>
                <Nav.Link href="/map">Map</Nav.Link>
                <Nav.Link> Don't Contact Us </Nav.Link>
            </Nav>
        </Navbar>
    }
}

export default NavBar
