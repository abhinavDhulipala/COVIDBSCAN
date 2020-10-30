import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, FormControl, Nav, Navbar, Button} from "react-bootstrap";
import Medical from "./Medical";
import HomePage from "./HomePage";

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medical: false
        }
    }
    clickedMedical = () => {
        this.setState({
            medical: true
        })
    }

    render() {
        const medical = this.state.medical;

        return <div>
            {!medical && <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">
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
                </Nav>
                <Button variant="outline-primary" onClick={this.clickedMedical}> Medical Login </Button>
            </Navbar>}
            {!medical &&
                <HomePage />
            }
            {medical &&
                <Medical />
            }
        </div>
    }
}

export default NavBar