import * as React from 'react';

export default function StopButton({ handleStop }) {
    return <button className="w-8 h-8 bg-white rounded-md mt-4" onClick={() => handleStop()}/>
}