import React, {useCallback, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Jumbotron} from "react-bootstrap";
import Webcam from "react-webcam";
import Amplify, {Storage} from 'aws-amplify'
import awsConfig from '../../aws-exports'
import {withAuthenticator} from '@aws-amplify/ui-react'

Amplify.configure(awsConfig)

function VirtualCheckUp() {
    const webcamRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const [capturing, setCapturing] = useState(false)
    const [recordedChunks, setRecordedChunks] = useState([])

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size) setRecordedChunks((prev) => prev.concat(data))
        },
        [setRecordedChunks]
    )

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            'dataavailable',
            handleDataAvailable
        );
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
                .then((result) => console.log(result))
                .catch(err => alert(`Error: ${err}`))

        }
    }, [recordedChunks])

    return <>
        <Jumbotron>
            <h1 aria-live="" align="center">Virtual Assistant</h1>
            <Container className={'flex'}>
                <div align="center">
                    <Webcam audio={false} ref={webcamRef}/>
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

export default withAuthenticator(VirtualCheckUp)
