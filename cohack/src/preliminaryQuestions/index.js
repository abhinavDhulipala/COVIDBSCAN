import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const qBank = [
    {
        question: <div>
            <Card className="mb-3" style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title className="font-weight-bolder">
                        Are you experiencing any of these symptoms?
                    </Card.Title>
                </Card.Body>
                <ListGroup>
                    <ListGroupItem> Fever or Feeling Feverish (chills, sweating) </ListGroupItem>
                    <ListGroupItem> Difficulty Breathing (not severe) </ListGroupItem>
                    <ListGroupItem> New or worsening cough </ListGroupItem>
                    <ListGroupItem> Sore throat </ListGroupItem>
                    <ListGroupItem> Whole Body Aches </ListGroupItem>
                    <ListGroupItem> Vomiting or Diarrhea </ListGroupItem>
                </ListGroup>
            </Card>
        </div>,
        answers: ["Yes", "None of the Above"],
        correct: ["Yes", "None of the Above"],
        questionId: "0"
    },
];

export default (n = 1) =>
    Promise.resolve(qBank.sort().slice(0, n));