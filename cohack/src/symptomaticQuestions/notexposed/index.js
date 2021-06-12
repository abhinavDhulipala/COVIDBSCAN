import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

const qBank = [
    {
        question:
            <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bolder">
                            Do you have any of the following?
                        </Card.Title>
                        <Card.Text> Select any then click next to continue. </Card.Text>
                    </Card.Body>
                </Card>
            </div>,
        answers: ["Fever or feeling feverish (such as chills, sweating)", "Cough",
            "Mild or moderate difficulty breathing", "Sore throat", "Muscle aches or body aches", "Vomiting or diarrhea",
            "New loss of taste or smell", "Congestion or runny nose", "Other symptoms"],
        correct: [""],
        questionId: "0"
    },
    {
        question:
            <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bolder">
                            Do you live in any of the following?
                        </Card.Title>
                        <ListGroup>
                            <ListGroupItem> Long-term care facility </ListGroupItem>
                            <ListGroupItem> Nursing home </ListGroupItem>
                            <ListGroupItem> Homeless shelter </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>,
        answers: ["Yes", "No"],
        correct: [""],
        questionId: "1"
    },
    {
        question:
            <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bolder">
                            In the last two weeks, have you worked, volunteered, or been a patient in a healthcare
                            facility or worked as a first responder?
                        </Card.Title>
                        <Card.Text>
                            Healthcare facilities include a hospital, medical or
                            dental clinic, long-term care facility, or nursing home.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>,
        answers: ["Yes", "No"],
        correct: [""],
        questionId: "2"
    },
    {
        question:
            <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bolder">
                            Do any of these conditions apply to you?
                        </Card.Title>
                        <ListGroup>
                            <ListGroupItem> Chronic lung disease, such as moderate to severe asthma, COPD
                                (chronic obstructive pulmonary disease), cystic fibrosis, or pulmonary fibrosis </ListGroupItem>
                            <ListGroupItem> Serious heart condition, such as heart failure, cardiomyopathy, heart attack,
                                or blocked arteries to the heart </ListGroupItem>
                            <ListGroupItem> Weakened immune system or taking medications that may cause immune suppression </ListGroupItem>
                            <ListGroupItem> Obesity </ListGroupItem>
                            <ListGroupItem> Diabetes, chronic kidney disease, or liver disease </ListGroupItem>
                            <ListGroupItem> High blood pressure </ListGroupItem>
                            <ListGroupItem> Cancer </ListGroupItem>
                            <ListGroupItem> HIV </ListGroupItem>
                            <ListGroupItem> Blood disorder, such as sickle cell disease or thalassemia </ListGroupItem>
                            <ListGroupItem> Cerebrovascular disease or neurologic condition, such as stroke or dementia </ListGroupItem>
                            <ListGroupItem> Smoking or vaping </ListGroupItem>
                            <ListGroupItem> Pregnancy </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>,
        answers: ["Yes", "No"],
        correct: [""],
        questionId: "3"
    },
];

//export default (n) => Promise.resolve(qBank.find(element => element === n));

export default (n) => Promise.resolve(qBank.sort().slice(n - 1, n));
