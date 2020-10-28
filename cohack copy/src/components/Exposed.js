import React, { Component } from 'react';
import QuestionBox from "./QuestionBox";
import exposedAPI from "../symptomaticQuestions/exposed";
import SecondStagePrimary from "./exposedRoutes/SecondStagePrimary";
import SecondStageSecondary from "./exposedRoutes/SecondStageSecondary";
import Button from "react-bootstrap/Button";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

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
                {!clickedNext &&
                    questionBank.map(({question, answers,
                    correct, questionId}) => <QuestionBox question=
                    {question} options={answers} key={questionId}
                    selected={answer => this.computeAnswer(answer, correct)}/>)
                }
                {!clickedNext &&
                    <Button onClick={this.clickNext.bind(this)}> Next </Button>
                }
                {clickedNext && primarySymptoms > 0 &&
                    <SecondStagePrimary senior={isSenior}/>
                }
                {clickedNext && primarySymptoms === 0 && secondarySymptoms > 0 &&
                    <SecondStageSecondary senior={isSenior}/>
                }
                {clickedNext && otherSymptoms > 0 && primarySymptoms === 0 && secondarySymptoms === 0 &&
                    <div>
                        <Card className="mb-3" style={{ color: "#000" }}>
                            <Card.Body>
                                <Card.Title className="font-weight-bolder">
                                    No COVID-19 testing needed at this time.
                                </Card.Title>
                                <Card.Text>
                                    Recommended steps are to stay home (or keep your child at home) and monitor
                                    your (or your child's) symptoms.
                                </Card.Text>
                                <Card.Subtitle className="font-weight-bolder">
                                    Call your (or your child's) medical provider if you get worse
                                </Card.Subtitle>
                                <ListGroup>
                                    <ListGroupItem> Long-term care facility </ListGroupItem>
                                    <ListGroupItem> Nursing home </ListGroupItem>
                                    <ListGroupItem> Homeless shelter </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                }
            </div>
        )
    }
}

export default Exposed