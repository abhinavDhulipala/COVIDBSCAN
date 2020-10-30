import React,{useState} from "react";
import "../index.css";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const QuestionBox = ({ question, options, selected}) => {
    const [answer, setAnswer] = useState(options);

    // using setAnswer so that there is no warning lol
    console.log(setAnswer)

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
                            className="mr-3 mt-2 mb-2"
                            onClick={()=>{
                            selected(text);
                        }}> {text}
                        </Button>
                    ))}
                </Card.Body>
            </Card>
        </div>
    )
};

export default QuestionBox;