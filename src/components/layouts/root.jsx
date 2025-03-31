import * as React from 'react';
import WebcamComponent from '../media/webcam.jsx';
import VideosTable from '../ui/videos-table.jsx';

export default function Root() {
    return <div className='container flex flex-col items-center justify-center mx-32'>
        <WebcamComponent />
        <VideosTable />
        </div>
}