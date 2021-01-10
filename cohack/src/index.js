import React from 'react'
import ReactDOM from 'react-dom'
import {DebugEngine, Provider as StyletronProvider} from "styletron-react"
import {Client as Styletron} from "styletron-engine-atomic"
import './index.css'
import Navbar from "./components/NavBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Quiz from "./components/Quiz";
import HomePage from "./components/HomePage";
import ClusterMap from "./components/ClusterMap";

const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

const engine = new Styletron();

function Index () {
    return (
        <div>
            <Navbar/>
            <Router>
                <Switch>
                    <Route path="/quiz">
                        <Quiz/>
                    </Route>
                    <Route path="/map">
                        <ClusterMap/>
                    </Route>
                    <Route path="/">
                        <HomePage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

ReactDOM.render(
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <Index/>
    </StyletronProvider>, document.getElementById("root"));
