import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

class Disagree extends Component {
    render() {
        return (
            <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bolder">
                            Please provide your consent in order to use the Coronavirus Self-Screening.
                        </Card.Title>
                        <Card.Text>
                            Refresh the page to start over.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Disagree