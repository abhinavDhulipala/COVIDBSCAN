import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import './index.css';
import App from './App';
import questionAPI from './preliminaryQuestions';
import asymptomaticAPI from './asymptomaticQuestions';
import exposureAPI from './determineExposureQuestions';
import UserWelcome from "./components/UserWelcome";
import ToggleAge from "./components/ToggleAge";
import StartSymptoms from "./components/StartSymptoms";
import Disagree from "./components/Disagree";
import Minor from "./components/Minor";
import Asymptomatic from "./components/Asymptomatic";
import DetermineExposure from "./components/DetermineExposure";
import ToggleSenior from "./components/ToggleSenior";

const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

const engine = new Styletron();

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: [],
            responses: 0,
            agree: false,
            refresh: true,
            atQuiz: false,

            // for keeping track of age state
            ageClicked: false,
            isSenior: false,
            isOfAge: false,
            isMinor: false,

            // state for asymptomaticQuestions sections
            asymptomatic: 0,
            asymptomaticBank: [],
            initialAsym: true,

            // for determineExposureQuestions page
            exposureQuestion: [],
            exposed: 0
        };

        this.getQuestions = this.getQuestions.bind(this);
        this.computeAnswer = this.computeAnswer.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleAge = this.toggleAge.bind(this);
        this.toggleAgree = this.toggleAgree.bind(this);
        this.getAsymptomaticQuestions = this.getAsymptomaticQuestions.bind(this);
    }


    // Function to get preliminaryQuestions from ./preliminaryQuestions
    getQuestions = () => {
        questionAPI().then(question => {
            this.setState({questionBank: question});
        });
    }

    getAsymptomaticQuestions = () => {
        asymptomaticAPI(1).then(question => {
            this.setState({
                asymptomaticBank: question
            });
        });
    }

    getExposureQuestions = () => {
        exposureAPI(1).then(question => {
            this.setState({
                exposureQuestion: question
            });
        });
    }

    // Function to compute scores
    computeAnswer = (answer, correctAns) => {
        let i;
        for (i = 0; i < correctAns.length; i++) {
            if (answer === "None of the Above") {
                this.setState({
                   responses: -1
                });
            } else {
                this.setState({
                    responses: 1
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
            } else if (this.state.asymptomatic === 1 && (answer === "Contact with a COVID-19 positive person" ||
                answer === "International Travel")) {
                this.setState({
                    asymptomatic: this.state.asymptomatic + 1
                });
            } else if (this.state.asymptomatic === 1 && (answer === "Live in or have visited a place where COVID-19 is widespread" ||
                        answer === "No")) {
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
            } else if (this.state.asymptomatic === -1 && answer === "No") {
                this.setState({
                    asymptomatic: this.state.asymptomatic - 2
                });
            }
        }
    };

    computeExposureAnswer = (answer, correctAns) => {
        if (answer === "Yes") {
            this.setState({
                exposed: 1
            });
        } else {
            this.setState({
               exposed: -1
            });
        }
    }

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

    // componentDidMount function to get preliminaryQuestions
    componentDidMount() {
        this.getQuestions();
        this.getAsymptomaticQuestions();
        this.getExposureQuestions();
    }

    render() {
        const isOfAge = this.state.isOfAge;
        const questionBank = this.state.questionBank;
        const responses = this.state.responses;
        const agree = this.state.agree;
        const refresh = this.state.refresh;
        const atQuiz = this.state.atQuiz;
        const isMinor = this.state.isMinor;
        const isSenior = this.state.isSenior;
        const asymptomatic = this.state.asymptomatic;
        const asymptomaticBank = this.state.asymptomaticBank;
        const exposureQuestion = this.state.exposureQuestion;
        const exposed = this.state.exposed;

        return (
        <div className="container">
            {refresh && <UserWelcome toggleAgree={this.toggleAgree}
                                     toggleDisagree={this.toggleDisagree}
                                     toggleRefresh={this.toggleRefresh} />}

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

            {!isSenior && !atQuiz && isOfAge && !isMinor && !refresh &&
                <ToggleSenior toggleSenior={this.toggleSenior}
                              toggleNotSenior={this.toggleNotSenior}/>
            }

            {(isSenior || !isSenior) && atQuiz && responses !== -1 && responses !== 1 &&
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

            {responses === 1 &&
                <DetermineExposure
                    questionBank={exposureQuestion}
                    compute={this.computeExposureAnswer}
                    exposed={exposed}
                    senior={isSenior}
                />
            }

        </div>)
    }
}

export default Quiz

ReactDOM.render(
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <App />
    </StyletronProvider>, document.getElementById("root"));
