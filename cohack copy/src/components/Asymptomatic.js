import React, { Component } from 'react';
import QuestionBox from "./QuestionBox";

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
            <div className="title"> Asymptomatic Screening Protocol </div>
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
                <p> Testing is not recommended at this time. </p>
                <p> You may be asked to wear a mask. </p>
                <p> Practice social distancing. </p>
                <p> Monitor symptoms:
                    <ul>
                        <li> Check your temperature twice daily for 14 days. </li>
                        <li> Contact your provider if symptoms worsen. </li>
                    </ul>
                </p>
            </div>
            }
            { asymptomatic === -1 &&
            asymptomaticBank.map(({question, answers,
            correct, questionId}) => <QuestionBox question=
            {question} options={answers} key={questionId}
            selected={answer => this.computeAsymptomatic(answer, correct)}/>)
            }
            { (asymptomatic === 3 || asymptomatic === -3) && !isSenior && <div>
                <p> Testing is not recommended at this time. </p>
                <p> Practice social distancing. </p>
            </div>
            }
            { (asymptomatic === 3 || asymptomatic === -3) && isSenior && <div>
                <p> Testing is not recommended at this time. </p>
                <p> Practice social distancing. </p>
                <p>
                    Since you identified yourself as being 65 years of age or over, obtain a
                    30 day supply of medications. This is also pertinent if you have a
                    chronic condition.
                </p>
            </div>
            }
            { asymptomatic === -2 && <div>
                <p> Testing is not recommended at this time. </p>
                <p> Home quarantine. </p>
                <p> Monitor symptoms:
                    <ul>
                        <li> Check your temperature twice daily for 14 days. </li>
                        <li> Contact your provider if symptoms worsen. </li>
                    </ul>
                </p>
            </div>
            }
        </div>
    }
}

export default Asymptomatic