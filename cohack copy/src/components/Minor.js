import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Minor extends Component {
    render() {
        return (
            <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bolder">
                            This is intended only for people who are 18 years or older.
                        </Card.Title>
                        <Card.Text>
                            Ask a parent or guardian to assist you and consult your pediatrician.
                        </Card.Text>
                        <Card.Text>
                            <a href="https://www.cdc.gov/">
                                Visit the Centers for Disease Control and Prevention website for more information.
                            </a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Minor