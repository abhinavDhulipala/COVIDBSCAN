import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button, CardDeck} from "react-bootstrap";
import Quiz from "../index";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getStarted: false
        }
    }

    clickedStart = () => {
        this.setState({
            getStarted: true
        })
    }

    render() {
        const getStarted = this.state.getStarted;

        return <div>
            {!getStarted && <div className="shadow-box-example z-depth-5"> <CardDeck style={{display: 'flex',
                flexDirection: 'row',
                marginTop: "30px",
                marginBottom: "30px",
                marginLeft: "30px",
                marginRight: "30px"}}>
                <Card style={{flex: 1}}>
                    <Card.Img variant="top" src={require("../images/laying.svg")} />
                    <Card.Body>
                        <Card.Title> Check Your Status </Card.Title>
                        <Card.Text>
                            Make smart decisions about what to do next. Get started to know your status.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={this.clickedStart}> Get Started </Button>
                    </Card.Footer>
                </Card>
                <Card style={{flex: 1}}>
                    <Card.Img variant="top" src={require("../images/globe.svg")} />
                    <Card.Body>
                        <Card.Title>Density Map</Card.Title>
                        <Card.Text>
                            Be aware of nearby hotspots and detect when a new hotspot may breakout in your area.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={this.clickedStart}> View Map </Button>
                    </Card.Footer>
                </Card>
                <Card style={{flex: 1}}>
                    <Card.Img variant="top" src={require("../images/learn.svg")} />
                    <Card.Body>
                        <Card.Title> Our Project </Card.Title>
                        <Card.Text>
                            Learn more about our project for the Berkeley Hack Month event from October 2020.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={this.clickedStart}> Learn More </Button>
                    </Card.Footer>
                </Card>
            </CardDeck> </div>
            }
            {getStarted &&
                <Quiz/>
            }
        </div>
    }
}

export default HomePage