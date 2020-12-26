import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button, CardDeck} from "react-bootstrap";
import Quiz from "../index";
import ClusterMap from "./ClusterMap";

const deckStyle = {display: 'flex',
    flexDirection: 'row',
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "30px",
    marginRight: "30px"}

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }


    clickedQuiz = () => {
        this.setState({
            page: this.state.page + 1
        })
    }

    clickedMap = () => {
        this.setState({
            page: this.state.page - 1
        })
    }

    render() {
        const start = this.state.page;
        return <div>
            {start === 0 && <div className="shadow-box-example z-depth-5"> <CardDeck style={deckStyle}>
                <Card style={{flex: 1}}>
                    <Card.Img variant="top"  src={require("../images/laying.svg")} />
                    <Card.Body>
                        <Card.Title> Check Your Status </Card.Title>
                        <Card.Text>
                            Make smart decisions about what to do next. Get started to know your status.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button  onClick={this.clickedQuiz}> Login & Participate </Button>
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
                        <Button onClick={this.clickedMap}>View Map</Button>
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
                        <Button href={'https://devpost.com/software/covidb'}> Learn More </Button>
                    </Card.Footer>
                </Card>
            </CardDeck>
            </div>}
            {start === 1 && <Quiz/>}

            {start === -1 && <ClusterMap/>}
        </div>
    }

}

export default HomePage
