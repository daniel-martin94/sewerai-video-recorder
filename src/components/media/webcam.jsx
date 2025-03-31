import * as React from 'react';
import Webcam from "react-webcam";
import RecordingControls from './recording-controls.jsx';
import RecordingIndicators from './recording-indicators.jsx';

export default function WebcamComponent () {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [seconds, setSeconds] = React.useState(0);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const isLoading = loading && !isError
    
    React.useEffect(() => {
      let intervalId;
  
      if (capturing) {
        intervalId = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
      }
  
      return () => clearInterval(intervalId);
    }, [capturing]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
          if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
          }
        },
        [setRecordedChunks]
      );

    const handleRecord = React.useCallback(() => {
        setCapturing(true);
        setRecordedChunks([])
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
        setSeconds(0)
      }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleSave = React.useCallback(async () => {
      if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, {
            type: "video/webm"
          });
          const arrayBuffer = await blob.arrayBuffer()
          await window.api.saveVideo(arrayBuffer);
          setRecordedChunks([])
          setSeconds(0)
      }
    }, [recordedChunks]);

    return (
    <div className="max-w-5xl">
      <div className='relative'>
        {isLoading && (
          <p className='text-white text-lg text-center'>Loading webcam...</p>
        )}
        {isError && (
          <p className='text-red-500 text-lg text-center'>Unable to load webcam. Please check your system permissions.</p>
        )}
        <RecordingIndicators isCapturing={capturing} seconds={seconds} />
        <Webcam audio ref={webcamRef}  onLoadedData={() => setLoading(false)} onUserMediaError={() => setIsError(true)}/>
      </div>
      <RecordingControls 
        isLoading={isLoading}
        isCapturing={capturing}
        handleStop={handleStop} 
        handleRecord={handleRecord} 
        isRecording={recordedChunks.length > 0 && !capturing} 
        handleSave={handleSave}
      />
    </div>)
} 