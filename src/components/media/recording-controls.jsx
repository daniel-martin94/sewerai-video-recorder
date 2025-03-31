import * as React from 'react';
import Webcam from "react-webcam";
import RecordButton from '../buttons/record-button.jsx';
import Button from '../buttons/button.jsx';
import StopButton from '../buttons/stop-button.jsx';
import { formatTime } from '../../utils/index.js';

export default function RecordingControls({ isLoading, handleRecord, handleStop, isRecording, handleSave, isCapturing}) {
    
    if (isLoading) return
    return (
    <div className="relative flex flex-row items-center justify-center w-full">
        {isCapturing ? (
          <StopButton handleStop={handleStop} />
        ) : (
          <RecordButton handleRecord={handleRecord} />
        )}
        {isRecording && (
          <div className='absolute right-2 mt-2'>
            <Button onPress={handleSave}> Save </Button>
          </div>
        )}
      </div> 
      )
    
} 