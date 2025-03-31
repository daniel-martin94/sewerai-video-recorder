import * as React from 'react';
import WebcamComponent from '../media/webcam.jsx';
import VideosTable from '../ui/videos-table.jsx';

export default function Root() {
    return <div className='bg-gray-800 py-16 flex flex-col items-center justify-center mx-auto'>
        <WebcamComponent />
        <VideosTable />
        </div>
}