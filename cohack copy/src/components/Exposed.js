import React, { Component } from 'react';
import QuestionBox from "./QuestionBox";
import exposedAPI from "../symptomatic/exposed";
import SecondStagePrimary from "./exposedmessages/SecondStagePrimary";
import SecondStageSecondary from "./exposedmessages/SecondStageSecondary";

class Exposed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questionBank: [],
            answerBank: [],
            primarySymptoms: 0,
            secondarySymptoms: 0,
            otherSymptoms: 0,
            positive: false,

            clickedNext: false,

            count: 0
        }
    }

    getQuestions = () => {
        exposedAPI(1).then(question => {
            this.setState({questionBank: question});
        });
    }

    loadAnswers = (answer) => {
        this.setState({
            answerBank: this.state.answerBank.concat([answer])
        });
    }

    computeAnswer = (answer, correct) => {
        let primary1 = "Fever or feeling feverish (such as chills, sweating)";
        let primary2 = "Cough";
        let primary3 = "Mild or moderate difficulty breathing";

        let secondary1 = "Sore throat";
        let secondary2 = "Muscle aches or body aches";
        let secondary3 = "Vomiting or diarrhea";
        let secondary4 = "New loss of taste or smell";
        let secondary5 = "Congestion or runny nose";

        let other = "Other symptoms";

        if (answer === primary1 || answer === primary2 || answer === primary3) {
            this.setState(state => ({
                primarySymptoms: state.primarySymptoms + 1
            }));
        } else if (answer === secondary1 || answer === secondary2 || answer === secondary3 ||
            answer === secondary4 || answer === secondary5) {
            this.setState(state => ({
                secondarySymptoms: state.secondarySymptoms + 1
            }));
        } else if (answer === other) {
            this.setState(state => ({
                otherSymptoms: state.otherSymptoms + 1
            }));
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
        const primarySymptoms = this.state.primarySymptoms;
        const secondarySymptoms = this.state.secondarySymptoms;
        const otherSymptoms = this.state.otherSymptoms;

        return (
            <div>
                <div className="title"> Symptomatic With Exposure </div>
                {!clickedNext &&
                    questionBank.map(({question, answers,
                    correct, questionId}) => <QuestionBox question=
                    {question} options={answers} key={questionId}
                    selected={answer => this.computeAnswer(answer, correct)}/>)
                }
                {!clickedNext &&
                    <button onClick={this.clickNext.bind(this)}> Next </button>
                }
                {clickedNext && primarySymptoms > 0 &&
                    <SecondStagePrimary senior={isSenior}/>
                }
                {clickedNext && primarySymptoms === 0 && secondarySymptoms > 0 &&
                    <SecondStageSecondary senior={isSenior}/>
                }
                {clickedNext && otherSymptoms > 0 && primarySymptoms === 0 && secondarySymptoms === 0 &&
                    <div>
                        <h2> No COVID-19 testing needed at this time. </h2>
                        <p> Sorry you are (or your child is) feeling sick. </p>
                        <p> Stay home (or keep your child at home) and monitor your (or your child's) symptoms. </p>
                        <p> Call your (or your child's) medical provider if you get worse. </p>
                    </div>
                }
            </div>
        )
    }
}

export default Exposed