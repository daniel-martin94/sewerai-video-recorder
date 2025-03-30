import * as React from 'react';
import WebcamComponent from '../media/webcam.jsx';
import VideosTable from '../ui/videos-table.jsx';

export default function Root() {
    return <div>
        <WebcamComponent />
        <VideosTable />
        </div>
}