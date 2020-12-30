import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, FormControl, Nav, Navbar, Button, Card, CardDeck} from "react-bootstrap";
import MedicalAppointments from "./MedicalAppointments";

const deckStyle = {display: 'flex',
    flexDirection: 'row',
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "30px",
    marginRight: "30px"}


class Medical extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: false
        }
    }
    clickedAppointments = () => {
        this.setState({
            appointments: true
        })
    }

    render() {
        const appointments = this.state.appointments;

        return <div>
            {!appointments && <CardDeck style={deckStyle}>
                <Card style={{flex: 1}}>
                    <Card.Body>
                        <Card.Title> Welcome, Physician Oski </Card.Title>
                        <Card.Text>
                            Click below to view your scheduled appointments.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button  onClick={this.clickedAppointments}> Scheduler </Button>
                    </Card.Footer>
                </Card>
            </CardDeck>}
            {appointments &&
                <MedicalAppointments />
            }
        </div>
    }
}

export default Medical