import * as React from 'react';
import { formatTime } from '../../utils/index.js';

export default function RecordingIndicators ({ isCapturing, seconds }) {
    if (!isCapturing) return
    return (
      <>
        <div className='top-4 left-4 absolute w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75'/>
        <div className='top-4 left-4 absolute w-4 h-4 bg-red-400 rounded-full'/>
        <p className='top-4 right-4 absolute text-base text-white'>{formatTime(seconds)}</p>
      </>
    )
} 