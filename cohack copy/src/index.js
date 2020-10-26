import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import questionAPI from './question';
import QuestionBox from "./components/QuestionBox";
import Result from "./components/ResultBox";
import UserWelcome from "./components/UserWelcome";
import ToggleAge from "./components/ToggleAge";
import StartSymptoms from "./components/StartSymptoms";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: [],
            score: 0,
            responses: 0,
            isOfAge: false,
            ageClicked: false
        };

        this.getQuestions = this.getQuestions.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.computeAnswer = this.computeAnswer.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleAge = this.toggleAge.bind(this);
    }

    // Function to get question from ./question
    getQuestions = () => {
        questionAPI().then(question => {
            this.setState({questionBank: question});
        });
    };

    // Set state back to default and call function
    playAgain = () => {
        this.getQuestions();
        this.setState({score: 0, responses: 0});
    };

    // Function to compute scores
    computeAnswer = (answer, correctAns) => {
        if (answer === correctAns) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5
                ? this.state.responses + 1
                : 5
        });
    };

    toggleAge = () => {
        this.setState({
            isOfAge: !this.state.isOfAge,
            ageClicked: !this.state.ageClicked
        });
    };

    // componentDidMount function to get question
    componentDidMount() {
        this.getQuestions();
    }

    render() {
        const score = this.state.score;
        const isOfAge = this.state.isOfAge;
        const ageClicked = this.state.ageClicked;
        const questionBank = this.state.questionBank;
        const questionBankLength = this.state.questionBank.length;
        const responses = this.state.responses;

        return (
        <div className="container">
            {!ageClicked && <ToggleAge toggleAge={this.toggleAge}/>}
            {isOfAge &&
            <StartSymptoms
                score={score}
                isOfAge={isOfAge}
                questionBank={questionBank}
                questionBankLength={questionBankLength}
                responses={responses}
                loadQuestions={this.getQuestions}
                replay={this.playAgain}
                compute={this.computeAnswer}
            />}

            {!isOfAge && ageClicked ? (
                <div>
                    <h2> This is intended only for people who are >= 18 years </h2>
                    <a href="https://www.cdc.gov/"> Visit the Centers for Disease Control and Prevention website for more information. </a>
                </div>
            ) : (
                !isOfAge && !ageClicked ? (
                    <div> Are you 18 years or older? </div>
                ) : (
                    <div> </div>
                )
            )}
        </div>)
    }
}

ReactDOM.render(<Quiz/>, document.getElementById("root"));