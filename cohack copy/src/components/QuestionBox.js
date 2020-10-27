import React,{useState} from "react";
import "../index.css";

const QuestionBox = ({ question, options, selected}) => {
    const [answer, setAnswer] = useState(options);
    return (
        <div className="questionBox">
            <div className="question">{question}</div>
            {answer.map((text,index) => (
                <button
                    key={index}
                    className="answerBtn"
                    onClick={()=>{
                        selected(text);
                    }}> {text}
                </button>
            ))}
        </div>
    )
};

export default QuestionBox;