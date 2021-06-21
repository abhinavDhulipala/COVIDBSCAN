import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar} from "react-bootstrap";
import {AmplifySignOut} from '@aws-amplify/ui-react'

class NavBar extends Component {

    render() {
        const imageWidth = 64
        return <Navbar bg="light" variant="light">
            <Navbar.Brand href="/" >
                <img
                    src={require('../images/DBSCAN_LOGO.JPG')}
                    // image w:h = 819:648
                    width={`${imageWidth * 819 / 648}em`}
                    height={`${imageWidth}em`}
                    className="d-inline-block align-top"
                    alt=""
                />
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href={process.env.REACT_APP_ABOUT}> About </Nav.Link>
                <Nav.Link href="/map">Map</Nav.Link>
                <Nav.Link onClick={_ => alert('no <3')}> Don't Contact Us </Nav.Link>
            </Nav>
            <AmplifySignOut />
        </Navbar>
    }
}

export default NavBar
