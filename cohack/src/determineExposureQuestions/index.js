import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

const qBank = [
    {
        question: <div>
            <Card className="mb-3" style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title className="font-weight-bolder">
                        In the two weeks before you felt sick, did you care for or have close contact with:
                    </Card.Title>
                </Card.Body>
                <ListGroup>
                    <ListGroupItem> Someone with symptoms of COVID-19 (within 6 feet
                        of an infected person for at least 15 minutes) </ListGroupItem>
                    <ListGroupItem> Someone who tested for COVID-19 (within 6 feet
                        of an infected person for at least 15 minutes) </ListGroupItem>
                    <ListGroupItem> Someone diagnosed with COVID-19 (within 6 feet
                        of an infected person for at least 15 minutes) </ListGroupItem>
                </ListGroup>
            </Card>
            </div>,
        answers: ["Yes", "No"],
        correct: ["Yes", "No"],
        questionId: "0"
    },
];

//export default (n) => Promise.resolve(qBank.find(element => element === n));

export default (n) => Promise.resolve(qBank.sort().slice(n - 1, n));