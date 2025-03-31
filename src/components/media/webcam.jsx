import * as React from 'react';
import Webcam from "react-webcam";
import RecordButton from '../buttons/record-button.jsx';
import Button from '../buttons/button.jsx';
import StopButton from '../buttons/stop-button.jsx';
import { formatTime } from '../../utils/index.js';

export default function  WebcamComponent () {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [seconds, setSeconds] = React.useState(0);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

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
        {capturing && 
        <>
          <div className='top-4 left-4 absolute w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75'/>
          <div className='top-4 left-4 absolute w-4 h-4 bg-red-400 rounded-full'/>
        </>
        }
        <Webcam audio={false} ref={webcamRef} />
        {capturing && 
          <p className='top-4 right-4 absolute text-base text-white'>{formatTime(seconds)}</p>
        }
      </div>
      <div className="relative flex flex-row items-center justify-center w-full">
        {capturing ? (
          <StopButton handleStop={handleStop} />
        ) : (
          <RecordButton handleRecord={handleRecord} />
        )}
        {recordedChunks.length > 0 && !capturing && (
          <div className='absolute right-2 mt-2'>
            <Button onPress={handleSave}> Save </Button>
          </div>
        )}
      </div>
    </div>)
} 