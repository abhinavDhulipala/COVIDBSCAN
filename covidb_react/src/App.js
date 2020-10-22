import React, {Component} from 'react';
import Amplify, {Auth} from "aws-amplify";
import awsExports from "./aws-exports";
import './App.css';
import {Button, Card, Container, Form} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {withAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";

Amplify.configure(awsExports);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()}
    }
    render() {
        return (
            <div className="App">
                <Button> <AmplifySignOut/> </Button>
                <header className="App-header">
                    <Container className="mw-50">
                        <Card>
                            <Card.Body>
                                <Card.Text className="text-info">
                                    Congrats! you are logged in
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                </header>
            </div>
        );
    }
}

export default withAuthenticator(App, true);
