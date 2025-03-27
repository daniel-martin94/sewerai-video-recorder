import * as React from 'react';
import WebcamComponent from '../media/webcam.jsx';
import RecordButton from '../buttons/record-button.jsx';

export default function Root() {
    return <div><WebcamComponent />
    <RecordButton />
    </div>
}