import React, {useRef, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Container, Row, Spinner} from "react-bootstrap"
import {GoogleMap, useLoadScript} from "@react-google-maps/api"
import MapStyles from "./MapStyles"
import PlacesAutocomplete from 'react-places-autocomplete'

const libraries = ["places"]

// TODO: find a way to make map container styles match parent dimensions
const mapContainerStyle = {
    width: '91vmin',
    height: '100vmin'
}

const options = {
    styles: MapStyles,
    zoomControl: true
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

    if (loadError) {
        return (<h1>Bad luck old boy google maps or ur internet ain't working</h1>)
    }
    if (!isLoaded) return <Spinner animation="border" variant="info" />
    console.log(arr)
    const onAutoSelect = (textAddress) => {
        setAddress(textAddress)
        const request = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${textAddress}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`)
        console.log(request)
        fetch(request)
            .then(res => res.json()).then(data => setCenter(data.results[0].geometry.location))
            .catch(error => console.log(error))
    }
    return (
    <>
        <Container className={Row} target={target.current}>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={onAutoSelect}>
                {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                  }) => (
                      <div>
                          <input {...getInputProps({className: 'form-control'})}/>
                          <br/>
                          <div className="d-flex justify-content-center">
                              {loading ? <Spinner animation="border" variant="info"/>
                              : suggestions.map((suggestion) => {
                                  const style = {className: "btn btn-outline-primary"}
                                  return (
                                        <div className="d-flex justify-content-around">
                                          <Button variant="outline-dark"
                                                  {...getSuggestionItemProps(suggestion, {style})}>
                                              {suggestion.description}
                                          </Button>
                                        </div>
                                  )
                                  }
                              )}
                          </div>
                      </div>



                )}
            </PlacesAutocomplete>
        </Container>
        <Container ref={target} style={{
            width: mapContainerStyle.width + '30px',
            height: mapContainerStyle.height
        }}>

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
