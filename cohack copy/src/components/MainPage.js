import React from "react";
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps"
import 'bootstrap/dist/css/bootstrap.min.css'
import AnimationRevealPage from "../../treact/src/helpers/AnimationRevealPage";

function Map () {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat: 28.538336, lng: -81.379234}}
            />
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function AnalysisPage() {
    return (<AnimationRevealPage>
            <div>Rewire complete</div>
        </AnimationRevealPage>

    );
}