import * as React from 'react';

export default function SaveButton({ handleSave }) {
    return <button onClick={() => handleSave()}>Save</button>
}