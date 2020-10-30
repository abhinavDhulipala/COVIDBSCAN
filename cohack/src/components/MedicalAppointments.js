import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Table, Card} from "react-bootstrap";
import Complete from "./MeetingComplete";

const deckStyle = {display: 'flex',
    flexDirection: 'row',
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "30px",
    marginRight: "30px"}


class MedicalAppointments extends Component {
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

        return <Card><Table striped bordered hover>
            <thead>
            <tr>
                <th>Patient Number</th>
                <th>Name</th>
                <th>Appointment Time</th>
                <th>Zoom Link</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Carol Christ</td>
                <td>2020-10-30T13:45:30</td>
                <td>zoommtg://zoom.us/join?confno=8529015944&pwd=&uname=Nobody%20-%2051800000000</td>
                <td><Complete/></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Nicholas Dirks</td>
                <td>2020-10-30T13:45:30</td>
                <td>zoommtg://zoom.us/join?confno=8529015944&pwd=&uname=Nobody%20-%2051800000000</td>
                <td><Complete/></td>
            </tr>
            <tr>
                <td>3</td>
                <td>Oski Bear</td>
                <td>2020-10-30T13:45:30</td>
                <td>zoommtg://zoom.us/join?confno=8529015944&pwd=&uname=Nobody%20-%2051800000000</td>
                <td><Complete/></td>
            </tr>
            </tbody>
        </Table></Card>
    }
}

export default MedicalAppointments