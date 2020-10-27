import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import questionAPI from './question';
import asymptomaticAPI from './asymptomatic';
import UserWelcome from "./components/UserWelcome";
import ToggleAge from "./components/ToggleAge";
import StartSymptoms from "./components/StartSymptoms";
import UnderAge from "./components/UnderAge";
import Disagree from "./components/Disagree";
import Minor from "./components/Minor";
import Asymptomatic from "./components/Asymptomatic";
import DetermineExposure from "./components/DetermineExposure";
import ToggleSenior from "./components/ToggleSenior";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: [],
            asymptomaticBank: [],
            score: 0,
            responses: 0,
            isOfAge: false,
            isMinor: false,
            ageClicked: false,
            agree: false,
            refresh: true,
            atQuiz: false,
            asymptomatic: 0,
            isSenior: false,
            initialAsym: true
        };

        this.getQuestions = this.getQuestions.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.computeAnswer = this.computeAnswer.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleAge = this.toggleAge.bind(this);
        this.toggleAgree = this.toggleAgree.bind(this);
        this.getAsymptomaticQuestions = this.getAsymptomaticQuestions.bind(this);
    }

    // Function to get question from ./question
    getQuestions = () => {
        questionAPI().then(question => {
            this.setState({questionBank: question});
        });
    };

    getAsymptomaticQuestions = () => {
        asymptomaticAPI(1).then(question => {
            this.setState({
                asymptomaticBank: question
            });
        });
    }

    // Set state back to default and call function
    playAgain = () => {
        this.getQuestions();
        this.setState({score: 0, responses: 0});
    };

    // Function to compute scores
    computeAnswer = (answer, correctAns) => {
        let i;
        for (i = 0; i < correctAns.length; i++) {
            if (answer === "None of the Above") {
                this.setState({
                   responses: -1
                });
            } else {
                if (answer === correctAns[i]) {
                    this.setState({
                        score: this.state.score + 1
                    });
                }
                this.setState({
                    responses: this.state.responses < 5
                        ? this.state.responses + 1
                        : 5
                });
            }
        }
    };

    computeAsymptomatic = (answer, correctAns) => {
        let i;
        for (i = 0; i < correctAns.length; i++) {
            if (answer === "Yes") {
                this.setState({
                    asymptomatic: this.state.asymptomatic + 1,
                });

                asymptomaticAPI(2).then(question => {
                    this.setState({
                        asymptomaticBank: question
                    });
                });
            } else if (answer === "No") {
                this.setState({
                    asymptomatic: this.state.asymptomatic - 1,
                });

                asymptomaticAPI(2).then(question => {
                    this.setState({
                        asymptomaticBank: question
                    });
                });
            } else if (answer === "Contact with a COVID-19 positive person" ||
                answer === "International Travel") {
                this.setState({
                    asymptomatic: this.state.asymptomatic + 1
                });
            } else if (answer === "Live in or have visited a place where COVID-19 is widespread" ||
                        answer === "No exposure") {
                this.setState({
                    asymptomatic: this.state.asymptomatic + 2
                });
            } else if (this.state.asymptomatic === -1 &&
                (answer === "Contact with a COVID-19 positive person" ||
                    answer === "International Travel" ||
                    answer === "Live in or have visited a place where COVID-19 is widespread")) {
                this.setState({
                    asymptomatic: this.state.asymptomatic - 1
                });
            } else if (this.state.asymptomatic === -1 && answer === "No exposure") {
                this.setState({
                    asymptomatic: this.state.asymptomatic - 2
                });
            }
        }
    };

    toggleAge = () => {
        this.setState({
            isOfAge: !this.state.isOfAge,
            ageClicked: !this.state.ageClicked,
            isMinor: false,
        });
    };

    toggleAgree = () => {
        this.setState({
            agree: true
        });
    }

    toggleDisagree = () => {
        this.setState({
            agree: false
        });
    }

    toggleRefresh = () => {
        this.setState({
            refresh: false
        });
    }

    toggleMinor = () => {
        this.setState({
            isMinor: true
        });
    }

    toggleSenior = () => {
        this.setState({
            isSenior: true,
            atQuiz: true
        });
    }

    toggleNotSenior = () => {
        this.setState({
            isSenior: false,
            atQuiz: true
        });
    }

    // componentDidMount function to get question
    componentDidMount() {
        this.getQuestions();
        this.getAsymptomaticQuestions();
    }

    render() {
        const score = this.state.score;
        const isOfAge = this.state.isOfAge;
        const ageClicked = this.state.ageClicked;
        const questionBank = this.state.questionBank;
        const questionBankLength = this.state.questionBank.length;
        const responses = this.state.responses;
        const agree = this.state.agree;
        const refresh = this.state.refresh;
        const atQuiz = this.state.atQuiz;
        const isMinor = this.state.isMinor;
        const isSenior = this.state.isSenior;
        const asymptomatic = this.state.asymptomatic;
        const asymptomaticBank = this.state.asymptomaticBank;

        return (
        <div className="container">
            {refresh && <UserWelcome toggleAgree={this.toggleAgree}
                                     toggleDisagree={this.toggleDisagree}
                                     toggleRefresh={this.toggleRefresh}/>}
            {(agree && !atQuiz && !isMinor && !isSenior) ? (
                <ToggleAge toggleAge={this.toggleAge} toggleMinor={this.toggleMinor}/>
            ) : (
                (!refresh && !agree) ? (
                    <Disagree />
                ) : (
                    <div> </div>
                )
            )}

            {isMinor && <Minor />}

            {!isSenior && !atQuiz && isOfAge && !isMinor && !refresh && <ToggleSenior toggleSenior={this.toggleSenior}
                                                  toggleNotSenior={this.toggleNotSenior}/>}

            {(isSenior || !isSenior) && atQuiz && responses !== -1 &&
            <StartSymptoms
                questionBank={questionBank}
                responses={responses}
                loadQuestions={this.getQuestions}
                replay={this.playAgain}
                compute={this.computeAnswer}
            />}

            {responses === -1 &&
                <Asymptomatic
                    questionBank={asymptomaticBank}
                    responses={asymptomatic}
                    loadQuestions={this.getAsymptomaticQuestions}
                    replay={this.playAgain}
                    compute={this.computeAsymptomatic}
                    senior={isSenior}
                />
            }

            {responses > 0 &&
                <DetermineExposure />
            }

        </div>)
    }
}

ReactDOM.render(<Quiz/>, document.getElementById("root"));