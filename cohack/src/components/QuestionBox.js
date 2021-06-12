import React,{useState} from "react";
import "../index.css";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const QuestionBox = ({ question, options, selected}) => {
    const [answer,] = useState(options)
    const [clicked,] = useState(new Array(answer.length).fill(false))
    const isYesNoQuestion = JSON.stringify(answer.sort().map(str => str.toLowerCase())) === JSON.stringify(['no', 'yes'])
    return (
        <div>
            <Card className="mb-3" style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title className="font-weight-normal">
                        {question}
                    </Card.Title>
                    {answer.map((text,index) => (
                        <Button
                            key={index}
                            className={`mr-3 mt-2 mb-2 ${clicked[index] ? 'btn-secondary': ''}`}
                            onClick={()=> {
                                selected(text)
                                clicked[index] = !clicked[index]
                                if (isYesNoQuestion && clicked.every(c => c)) clicked[1 - index] = false
                            }}> {text}
                        </Button>
                    ))}
                </Card.Body>
            </Card>
        </div>
    )
};

export default QuestionBox;
