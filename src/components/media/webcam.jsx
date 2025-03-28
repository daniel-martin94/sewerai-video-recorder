import * as React from 'react';
import Webcam from "react-webcam";
import RecordButton from '../buttons/record-button.jsx';
import SaveButton from '../buttons/save-button.jsx';
import StopButton from '../buttons/stop-button.jsx';


export default function  WebcamComponent () {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const handleDataAvailable = React.useCallback(
        ({ data }) => {
          console.log(data)
          if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
          }
        },
        [setRecordedChunks]
      );
    const handleRecord = React.useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
    });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleStop = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
      }, [mediaRecorderRef, webcamRef, setCapturing]);

      const handleSave = React.useCallback(() => {
        if (recordedChunks.length) {
            window.record.saveVideo()
            console.log(recordedChunks)
        }
      }, [recordedChunks]);
    
    return (
    <>
    <Webcam audio={false} ref={webcamRef} />
    {capturing ? (
        <StopButton handleStop={handleStop} />

      ) : (
        <RecordButton handleRecord={handleRecord} />
      )}
      {recordedChunks.length > 0 && (
        <SaveButton handleSave={handleSave}/>
      )}
    </>)
} 