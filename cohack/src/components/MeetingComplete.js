import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Table, Card, Alert } from "react-bootstrap";

function Complete() {
    const [show, setShow] = useState(false);

    return (
        <>
            <Alert show={show} variant="success">
                <Alert.Heading>Appointment completed!</Alert.Heading>
                <p>
                    Complete!
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Undo
                    </Button>
                </div>
            </Alert>

            {!show && <Button onClick={() => setShow(true)}>Complete Appointment</Button>}
        </>
    );
}

export default Complete