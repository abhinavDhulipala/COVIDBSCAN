import React, {useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Container, Form, Row, Spinner} from "react-bootstrap";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import MapStyles from "./MapStyles";

const libraries = ["places"]

// TODO: find a way to make map container styles match parent dimensions
const mapContainerStyle = {
    width: '160vh',
    height: '100vh'
}

const options = {
    styles: MapStyles,
    zoomControl: true
}

function objectToParams(obj) {
    let parameters = []
    for (let k in obj) {
        parameters.push(`${k}=${obj.k}`)
    }
    return parameters.join('&')
}

export default function ClusterMap() {
    const [arr, setArr] = useState([])
    const [mapCenter, setCenter] = useState({
        lat: 39.739235,
        lng: -104.990250
    })
    const [called, setCalled] = useState(true)
    const target = useRef(null)
    if (called) {
        setCalled(() => false)
        fetch(`${process.env.REACT_APP_FLASK}/fetch`).then(res => res.json()).then(data => setArr(data))
            .catch(() => console.log('fetch to flask back end failed'))
    }
    arr.map((elem) => console.log(elem))


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries
    })
    if (loadError) {
        return (<h1>Bad luck old boy google maps or ur internet ain't working</h1>)
    }
    if (!isLoaded) return <Spinner animation="border" variant="info" />

    const onInputChange = (partialText) => {
        const parameters = {
            input: partialText,
            key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
            location: mapCenter
        }
        console.log(objectToParams(parameters))
        fetch(`${process.env.REACT_APP_PLACES_AUTOCOMPLETE}${objectToParams(parameters)}`)
            .then(r => console.log(r.json()))
    }

    console.log(arr)
    return (
    <>
        <Container className={Row}>
            <Form.Group controlId="locationID">
                <Form.Label>Enter location</Form.Label>
                <Form.Control type="text" defaultValue="Denver, CO" onChange={onInputChange}/>
                <Button variant="outline-dark" type="submit" block >Search!</Button>
            </Form.Group>
        </Container>
        <Container ref={target} className={Row}>
            <GoogleMap mapContainerStyle={mapContainerStyle}
                       zoom={10}
                       center={mapCenter}
                       options={options}>
            </GoogleMap>
        </Container>
    </>
    );
}
