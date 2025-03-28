import * as React from 'react';

export default function StopButton({ handleStop }) {
    return <button onClick={() => handleStop()}>Stop</button>
}