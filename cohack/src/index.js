import React from 'react'
import ReactDOM from 'react-dom'
import {DebugEngine, Provider as StyletronProvider} from "styletron-react"
import {Client as Styletron} from "styletron-engine-atomic"
import Navbar from "./components/NavBar"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Quiz from "./components/Quiz"
import HomePage from "./components/HomePage"
import ClusterMap from "./components/ClusterMap"
import VirtualCheckUp from "./components/exposedEndpoint/DataCollection"
import Amplify from 'aws-amplify'
import awsmobile from "./aws-exports"
import './index.css'
import {withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(awsmobile)

const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

const engine = new Styletron();

function redirect(to) {
    return () => window.location.href = to
}

function Index() {

    return (
        <div>
            <Navbar/>
            <Router>
                <Switch>
                    <Route path="/quiz" component={withAuthenticator(Quiz)}/>
                    <Route path="/map" component={withAuthenticator(ClusterMap)}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/test" component={VirtualCheckUp}/>
                    <Route path="/" component={redirect('/home')}/>
                </Switch>
            </Router>
        </div>
    )
}

ReactDOM.render(
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <Index/>
    </StyletronProvider>, document.getElementById("root"));
