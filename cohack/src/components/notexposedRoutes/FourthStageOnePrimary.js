import React, { Component } from 'react';
import QuestionBox from "../QuestionBox";
import notexposedAPI from "../../symptomaticQuestions/notexposed";
import Button from "react-bootstrap/Button";

class FourthStageOnePrimary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questionBank: [],
            urgent: false,
            clickedNext: false
        }
    }

    getQuestions = () => {
        notexposedAPI(4).then(question => {
            this.setState({questionBank: question});
        });
    }

    computeAnswer = (answer, correct) => {
        if (answer === "Yes") {
            this.setState({
                urgent: true
            });
        } else {
            this.setState({
                urgent: false
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
        const urgent = this.state.urgent;

        return (
            <div>
                {!clickedNext &&
                questionBank.map(({question, answers,
                                      correct, questionId}) => <QuestionBox question=
                                                                                {question} options={answers} key={questionId}
                                                                            selected={answer => this.computeAnswer(answer, correct)}/>)
                }
                {!clickedNext &&
                <Button onClick={this.clickNext.bind(this)}> Next </Button>
                }
                {clickedNext && isSenior &&
                <div>
                    <h2> You may be eligible for COVID-19 testing. </h2>
                    <p> Stay home and take care of yourself. Call your medical provider. </p>
                </div>
                }
                {clickedNext && !urgent && !isSenior &&
                <div>
                    <h2> You may be eligible for COVID-19 testing. </h2>
                    <p> Stay home (or keep your child home) and take care of yourself (or your child).
                        Call your (or your child’s) medical provider if you get (or your child gets) worse. </p>
                </div>
                }
            </div>
        )
    }
}

export default FourthStageOnePrimary