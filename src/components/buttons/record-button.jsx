import * as React from 'react';

export default function RecordButton({ handleRecord }) {
    return <button className="w-8 h-8 bg-red-400 rounded-full border border-white mt-4" onClick={() => handleRecord()}></button>
}