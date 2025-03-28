import * as React from 'react';

export default function RecordButton({ handleRecord }) {
    return <button onClick={() => handleRecord()}>Record</button>
}