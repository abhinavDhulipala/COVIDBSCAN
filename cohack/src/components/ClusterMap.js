import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Spinner} from "react-bootstrap";
import {GoogleMap, useLoadScript, Marker, InfoWindow, Circle} from "@react-google-maps/api";
import MapStyles from "./MapStyleds";


const libraries = ["places"]
const mapContainerStyle = {
    width: '100w',
    height: '100vh'
}
const center = {
    lat: 39.739235,
    lng: -104.990250
}
const options = {
    styles: MapStyles,

    zoomControl: true

}

export default function ClusterMap() {
    const [arr, setArr] = useState([])
    const [called, setCalled] = useState(true)
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
        return (<div>Bad luck old boy google maps or ur internet ain't working</div>)
    }
    if (!isLoaded) return <Spinner animation="border" variant="info" />

    console.log(arr)
    return (
    <div>

        <GoogleMap mapContainerStyle={mapContainerStyle}
                   zoom={8}
                   center={center}
                   options={options}>
        </GoogleMap>
    </div>
    );
}
