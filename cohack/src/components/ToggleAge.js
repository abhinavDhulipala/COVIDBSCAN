import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css'
class ToggleAge extends Component {
    constructor(props) {
        super(props);

        this.toggleAge = this.toggleAge.bind(this);
        this.toggleMinor = this.toggleMinor.bind(this);
    }

    toggleAge = () => {
        this.props.toggleAge();
    }

    toggleMinor = () => {
        this.props.toggleMinor();
    }

    render() {
        return (
            <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bolder">
                            Are you 18 years of age or older?
                        </Card.Title>
                        <Button className="mr-3" onClick={this.toggleAge}> Yes </Button>
                        <Button className="mr-3" onClick={this.toggleMinor}> No </Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default ToggleAge