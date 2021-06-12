import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar} from "react-bootstrap";

class NavBar extends Component {
    render() {
        const imageWidth = 64
        return <Navbar bg="light" variant="light">
            <Navbar.Brand href="/" >
                <img
                    alt=""
                    src={require('../images/DBSCAN_LOGO.JPG')}
                    // image w:h = 819:648
                    width={`${imageWidth * 819 / 648}px`}
                    height={`${imageWidth}px`}
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href={process.env.REACT_APP_ABOUT}> About </Nav.Link>
                <Nav.Link href="/map">Map</Nav.Link>
                <Nav.Link onClick={() => alert('no <3')}> Don't Contact Us </Nav.Link>
            </Nav>
        </Navbar>
    }
}

export default NavBar
