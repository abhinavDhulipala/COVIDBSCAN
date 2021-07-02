import React, {useCallback, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Jumbotron} from "react-bootstrap";
import Webcam from "react-webcam";
import {Storage} from 'aws-amplify'

function VirtualCheckUp() {
    const webcamRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const [capturing, setCapturing] = useState(false)
    const [recordedChunks, setRecordedChunks] = useState([])

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size) setRecordedChunks(prev => prev.concat(data))
        },
        [setRecordedChunks]
    )

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true)
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        })
        mediaRecorderRef.current.addEventListener(
            'dataavailable',
            handleDataAvailable
        )
        mediaRecorderRef.current.start()
    }, [setCapturing, mediaRecorderRef, handleDataAvailable])

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop()
        setCapturing(false)
    }, [mediaRecorderRef, setCapturing])

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.href = url
            a.download = "react-webcam-stream-capture.webm"
            a.click()
            window.URL.revokeObjectURL(url)
            setRecordedChunks([])
            let name = 'shit'
            Storage.put(name, blob, {
                /* level: 'protected', */
                contentType: 'video/webm',
            })
                .then(result => console.log(result))
                .catch(err => {
                    alert(`Error: ${err}`)
                    console.log(`Storage Put service error: ${err}`)
                })

        }
    }, [recordedChunks])

    return <>
        <Jumbotron>
            <h1 aria-live="polite" align="center">Virtual Assistant</h1>
            <p className="text-md-left">
                On this page we will ask you to submit a simple video to help describe your symptoms as well and give
                our volunteers some symptoms so that we can process your concerns. This is mainly for data validation
                so don't worry too much about it. Just submit a video so we know you are genuine and not trying to flood
                our servers with false data-points :).
                You could use several materials like:
            </p>
            <ul>
                <li>Tongue depressors</li>
                <li>Thermometers</li>
                <li>Swabs</li>
                <li>Anything thing that helps us get an accurate picture of your symptoms...</li>
            </ul>
            <Container className={'flex'}>
                <div align="center">
                    <Webcam ref={webcamRef}/>
                </div>
                <div className={'flex'} align="center">
                    {capturing && <Button onClick={handleStopCaptureClick}>Stop Capture</Button>}
                    {!capturing && <Button onClick={handleStartCaptureClick}>Start Capture</Button>}
                    {recordedChunks.length > 0 && <Button onClick={handleDownload}>Download & Upload</Button>}
                </div>
            </Container>
        </Jumbotron>
    </>

}

export default VirtualCheckUp
