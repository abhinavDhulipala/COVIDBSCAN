import React, { Component } from 'react';
import QuestionBox from "./QuestionBox";

class DetermineExposure extends Component {
    constructor(props) {
        super(props);

    }

    // Function to get question from ./question
    getQuestions() {
        this.props.loadQuestions();
    };

    // Set state back to default and call function
    playAgain = () => {
        this.props.replay();
    };

    // Function to compute scores
    computeAnswer = (answer, correctAns) => {
        this.props.compute(answer, correctAns);
    };

    // componentDidMount function to get question
    componentDidMount() {
        this.getQuestions();
    }

    render() {
        const isOfAge = this.props.isOfAge;
        const score = this.props.score;
        const questionBank = this.props.questionBank;
        const responses = this.props.responses;

        return <div>
            <div className="title"> Potential Exposure </div>
            {
                questionBank.length > 0 && responses < 7 &&
                questionBank.map(({question, answers,
                                      correct, questionId}) => <QuestionBox question=
                                                                                {question} options={answers} key={questionId}
                                                                            selected={answer => this.computeAnswer(answer, correct)}/>)
            }
        </div>
    }
}

export default DetermineExposure