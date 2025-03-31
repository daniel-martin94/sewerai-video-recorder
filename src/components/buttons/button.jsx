import * as React from 'react';

export default function Button({ onPress, children }) {
    return <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm leading-5 font-semibold text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-xs"
    onClick={() => onPress()}>{children}</button>
}