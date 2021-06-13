import React, {useCallback, useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Jumbotron} from "react-bootstrap";
import Webcam from "react-webcam";


function VirtualCheckUp() {
    const vidConstraints = {facingMode: 'default'}
    const webcamRef = useRef(null)
    const containerRef = useRef(null)
    const handleUpload = useCallback(() => webcamRef.current.getScreenshot(), [webcamRef])

    return(
    <div>
        <Jumbotron>
            <h1 >Welcome to your Virtual Checkout</h1>
            <p className="text-md-left">
                On this page we will ask you to submit a simple video to help describe your symptoms as well and give
                our volunteers some symptoms so that we can process your concerns
            </p>
            <p>
                Please have the following materials ready:
                <ul>
                    <li>Tongue depressor</li>
                    <li>TODO: Determine the minimum amount of requisite materials</li>
                </ul>
            </p>
            <Container ref={containerRef}>
                <Webcam
                    audio={true}
                    ref={webcamRef}
                    videoConstraints={vidConstraints}
                />
                <Button onClick={handleUpload}>Describe symptoms</Button>
            </Container>
        </Jumbotron>
    </div>
    )

}

export default VirtualCheckUp;
