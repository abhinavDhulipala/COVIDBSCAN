import React, {Component} from "react";
import QuestionBox from "./QuestionBox";

class StartSymptoms extends Component {
    constructor(props) {
        super(props);

        this.getQuestions = this.getQuestions.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.computeAnswer = this.computeAnswer.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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
        const questionBank = this.props.questionBank;
        const responses = this.props.responses;

        return <div>
            <div className="title"> Preliminary Screening Protocol </div>
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

export default StartSymptoms