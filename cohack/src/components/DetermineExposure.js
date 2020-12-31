import React, { Component } from 'react';
import QuestionBox from "./QuestionBox";
import Exposed from "./Exposed";
import NotExposed from "./NotExposed"

class DetermineExposure extends Component {
    // Function to compute scores
    computeExposureAnswer = (answer, correctAns) => {
        this.props.compute(answer, correctAns);
    };

    render() {
        const questionBank = this.props.questionBank;
        const exposed = this.props.exposed;
        const isSenior = this.props.senior;

        return <div>
            {exposed === 0 &&
                questionBank.map(({question, answers,
                correct, questionId}) => <QuestionBox question={question} options={answers} key={questionId}
                 selected={answer => this.computeExposureAnswer(answer, correct)}/>)
            }
            {exposed === 1 &&
                <Exposed senior={isSenior}/>
            }
            {exposed === -1 &&
                <NotExposed senior={isSenior}/>
            }
        </div>
    }
}

export default DetermineExposure
