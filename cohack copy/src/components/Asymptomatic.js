import React, { Component } from 'react';
import QuestionBox from "./QuestionBox";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

class Asymptomatic extends Component {
    constructor(props) {
        super(props);

        this.getAsymptomaticQuestions = this.getAsymptomaticQuestions.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.computeAsymptomatic = this.computeAsymptomatic.bind(this);
    }

    // Function to get preliminaryQuestions from ./preliminaryQuestions
    getAsymptomaticQuestions() {
        this.props.loadQuestions();
    };

    // Set state back to default and call function
    playAgain = () => {
        this.props.replay();
    };

    // Function to compute scores
    computeAsymptomatic = (answer, correctAns) => {
        this.props.compute(answer, correctAns);
    };

    // componentDidMount function to get preliminaryQuestions
    componentDidMount() {
        this.getAsymptomaticQuestions();
    }

    render() {
        const asymptomaticBank = this.props.questionBank;
        const asymptomatic = this.props.responses;
        const isSenior = this.props.senior;

        return <div>
            {
                asymptomaticBank.length > 0 && asymptomatic === 0 &&
                asymptomaticBank.map(({question, answers,
                correct, questionId}) => <QuestionBox question=
                {question} options={answers} key={questionId}
                selected={answer => this.computeAsymptomatic(answer, correct)}/>)
            }
            { asymptomatic === 1 &&
            asymptomaticBank.map(({question, answers,
            correct, questionId}) => <QuestionBox question=
            {question} options={answers} key={questionId}
            selected={answer => this.computeAsymptomatic(answer, correct)}/>)
            }
            { asymptomatic === 2 && <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bold">
                            Testing is not recommended at this time.
                        </Card.Title>
                        <Card.Text>
                            Recommended steps are to wear a mask and practice social distancing.
                        </Card.Text>
                        <Card.Subtitle className="font-weight-bolder">
                            Monitor symptoms:
                        </Card.Subtitle>
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem className="font-italic"> Check your temperature twice daily for 14 days. </ListGroupItem>
                        <ListGroupItem className="font-italic"> Contact your medical provider if symptoms worsen. </ListGroupItem>
                    </ListGroup>
                </Card>
            </div>
            }
            { asymptomatic === -1 &&
            asymptomaticBank.map(({question, answers,
            correct, questionId}) => <QuestionBox question=
            {question} options={answers} key={questionId}
            selected={answer => this.computeAsymptomatic(answer, correct)}/>)
            }
            { (asymptomatic === 3 || asymptomatic === -3) && !isSenior && <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bold">
                            Testing is not recommended at this time.
                        </Card.Title>
                        <Card.Text>
                            Recommended steps are to practice social distancing.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            }
            { (asymptomatic === 3 || asymptomatic === -3) && isSenior && <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                    <Card.Body>
                        <Card.Title className="font-weight-bold">
                            Testing is not recommended at this time.
                        </Card.Title>
                        <Card.Text>
                            Recommended steps are to practice social distancing.
                        </Card.Text>
                        <Card.Text>
                            Since you identified yourself as being 65 years of age or over, try to obtain a
                            30 day supply of medications for your conditions. This is also pertinent if you have a
                            chronic condition.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            }
            { asymptomatic === -2 && <div>
                <Card className="mb-3" style={{ color: "#000" }}>
                <Card.Body>
                        <Card.Title className="font-weight-bold">
                            Testing is not recommended at this time.
                        </Card.Title>
                        <Card.Text>
                            Recommended steps are to stay home and quarantine.
                        </Card.Text>
                        <Card.Subtitle className="font-weight-bolder">
                            Monitor symptoms:
                        </Card.Subtitle>
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem className="font-italic"> Check your temperature twice daily for 14 days. </ListGroupItem>
                        <ListGroupItem className="font-italic"> Contact your medical provider if symptoms worsen. </ListGroupItem>
                    </ListGroup>
                </Card>
            </div>
            }
        </div>
    }
}

export default Asymptomatic