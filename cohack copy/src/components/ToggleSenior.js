import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css'

class ToggleSenior extends Component {
    constructor(props) {
        super(props);

        this.toggleSenior = this.toggleSenior.bind(this);
    }

    toggleSenior = () => {
        this.props.toggleSenior();
    }

    toggleNotSenior = () => {
        this.props.toggleNotSenior();
    }

    render() {
        return (
            <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bolder">
                            Are you 65 years of age or older?
                        </Card.Title>
                        <Button className="mr-3" onClick={this.toggleSenior}> Yes </Button>
                        <Button className="mr-3" onClick={this.toggleNotSenior}> No </Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default ToggleSenior