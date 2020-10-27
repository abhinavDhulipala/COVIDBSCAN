import React, { Component } from 'react';
import QuestionBox from "../QuestionBox";
import exposedAPI from "../../symptomatic/exposed";
import ThirdStagePrimary from "./ThirdStagePrimary";

class SecondStagePrimary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questionBank: [],
            noHome: false,
            clickedNext: false
        }
    }

    getQuestions = () => {
        exposedAPI(2).then(question => {
            this.setState({questionBank: question});
        });
    }

    computeAnswer = (answer, correct) => {
        if (answer === "Yes") {
            this.setState({
                noHome: true
            });
        } else {
            this.setState({
                noHome: false
            });
        }
    }

    clickNext = () => {
        this.setState({
            clickedNext: true
        })
    }

    componentDidMount() {
        this.getQuestions();
    }

    render() {
        const isSenior = this.props.senior;
        const questionBank = this.state.questionBank;
        const clickedNext = this.state.clickedNext;
        const noHome = this.state.noHome;

        return (
            <div>
                {!clickedNext &&
                    questionBank.map(({question, answers,
                    correct, questionId}) => <QuestionBox question=
                    {question} options={answers} key={questionId}
                    selected={answer => this.computeAnswer(answer, correct)}/>)
                }
                {!clickedNext &&
                    <button onClick={this.clickNext}> Next </button>
                }
                {clickedNext && !noHome &&
                    <ThirdStagePrimary senior={isSenior}/>
                }
                {clickedNext && noHome &&
                    <div>
                        <h2> You may be eligible for COVID-19 testing. </h2>
                        <p>
                            Contact a medical provider in the care center, nursing home,
                            or homeless shelter where you live.
                        </p>
                    </div>
                }
            </div>
        )
    }
}

export default SecondStagePrimary