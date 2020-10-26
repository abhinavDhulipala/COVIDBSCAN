import React, {Component} from "react";
import QuestionBox from "./QuestionBox";
import Result from "./ResultBox";

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
        this.props.compute();
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
            <div className="title"> Screening Protocol </div>
            {
                questionBank.length > 0 && responses < 5 &&
                questionBank.map(({question, answers,
                correct, questionId}) => <QuestionBox question=
                {question} options={answers} key={questionId}
                selected={answer => this.computeAnswer(answer, correct)}/>)
            }
            { responses === 5 ? (
                <Result score={score} playAgain={this.playAgain}/>
            ) : null
            }
        </div>
    }
}

export default StartSymptoms