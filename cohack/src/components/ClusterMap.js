import React, {useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Container, Form, Row, Spinner} from "react-bootstrap";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import PlacesAutocomplete from 'react-places-autocomplete'
import scriptLoader from "react-async-script-loader"

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

function ClusterMap() {

    const [arr, setArr] = useState([])
    const [address, setAddress] = useState('Denver, CO')
    const [mapCenter, setCenter] = useState({
        lat: 39.739235,
        lng: -104.990250
    })
    const [called, setCalled] = useState(true)
    const target = useRef(null)
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
        libraries
    })
    if (called) {
        setCalled(() => false)
        fetch(`${process.env.REACT_APP_FLASK}/fetch`).then(res => res.json()).then(data => setArr(data))
            .catch(() => console.log('fetch to flask back end failed'))
    }
    arr.map((elem) => console.log(elem))
    /*if (!isScriptLoaded || !isScriptLoadedSucceed) {
        return (<h1 className="display-4 bg-warning d-flex flex-lg-shrink-1">
            Our scripts are not loading, please try again (make sure to enable javascript if you haven't done so already)
        </h1>)
    }*/


    if (loadError) {
        return (<h1>Bad luck old boy google maps or ur internet ain't working</h1>)
    }
    if (!isLoaded) return <Spinner animation="border" variant="info" />
    console.log(arr)
    return (
    <>
        <Container className={Row}>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={setAddress}>
                {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                  }) => (
                      <div>
                          <input {...getInputProps(
                              {
                                  placeholder: 'enter address',
                                  className: 'form-control'
                              }
                          )}/>
                          <div>
                              {loading && <Spinner animation="border" variant="info"/>}
                              {suggestions.map((suggestion) => {
                                  const style = {className: "btn btn-outline-primary"}
                                  console.log(suggestion.description)
                                  return (
                                      <div {...getSuggestionItemProps(suggestion, {style})}>
                                          {suggestion.description}
                                      </div>
                                  )
                                  }
                              )}
                          </div>
                      </div>



                )}
            </PlacesAutocomplete>
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
export default ClusterMap
