import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import React from "react";

const qBank = [
    {
        question: <div>
            <Card className="mb-3" style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title className="font-weight-bolder">
                        Do you currently or plan to within the next 2 weeks, work or volunteer in a healthcare facility?
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>,
        answers: ["Yes", "No"],
        correct: ["Yes", "No"],
        questionId: "0"
    },
    {
        question: <div>
            <Card className="mb-3" style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title className="font-weight-bolder">
                        In the last 2 weeks, have you had any of the following exposures?
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>,
        answers: ["Contact with a COVID-19 positive person", "International Travel",
        "Live in or have visited a place where COVID-19 is widespread", "No"],
        correct: ["Contact with a COVID-19 positive person", "International Travel",
            "Live in or have visited a place where COVID-19 is widespread", "No"],
        questionId: "1"
    },
];

//export default (n) => Promise.resolve(qBank.find(element => element === n));

export default (n) => Promise.resolve(qBank.sort().slice(n - 1, n));