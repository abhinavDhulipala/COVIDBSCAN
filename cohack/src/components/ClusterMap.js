import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Spinner} from "react-bootstrap";
import {GoogleMap,useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import MapStyles from "./MapStyles";

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
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries
    });
    if (loadError) {
        return (<div>Bad luck old boy google maps or ur internet ain't working</div>)
    }
    if (!isLoaded) return <Spinner animation="border" variant="info" />

    return (
    <div>
        {/*<img*/}
        {/*    alt=""*/}
        {/*    src={require("../images/covidLogo.png")}*/}
        {/*    width="30"*/}
        {/*    height="30"*/}
        {/*    className="d-inline-block align-top"*/}
        {/*/>*/}
        <GoogleMap mapContainerStyle={mapContainerStyle}
                   zoom={8}
                   center={center}
                   options={options}>

        </GoogleMap>
    </div>
    );
}