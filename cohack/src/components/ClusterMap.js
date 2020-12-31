import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Spinner, Form, Row, Col, Overlay} from "react-bootstrap";
import {GoogleMap, useLoadScript, Marker, InfoWindow, Circle} from "@react-google-maps/api";
import MapStyles from "./MapStyles";

const libraries = ["places"]
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}

const options = {
    styles: MapStyles,
    zoomControl: true
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
        setCalled((prevState => false))
        fetch(`${process.env.REACT_APP_FLASK}/fetch`).then(res => res.json()).then(data => setArr(data))
            .catch(() => console.log('fetch to flask back end failed'))
    }
    arr.map((elem) => console.log(elem))


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries
    });
    if (loadError) {
        return (<h1>Bad luck old boy google maps or ur internet ain't working</h1>)
    }
    if (!isLoaded) return <Spinner animation="border" variant="info" />

    console.log(arr)
    return (
    <>
        <Overlay target={target.current} show={true} placement="top-start">
            <Form.Group controlId="locationID">
                <Form.Label>Enter location</Form.Label>
                <brk/>
                <Form.Control type="text" defaultValue="Denver, CO"/>
            </Form.Group>
        </Overlay>
        <div ref={target} className="container-fluid m-0 p-0">
            <GoogleMap mapContainerStyle={mapContainerStyle}
                       zoom={8}
                       center={mapCenter}
                       options={options}>
            </GoogleMap>
        </div>
    </>
    );
}
