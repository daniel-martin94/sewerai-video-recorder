import * as React from "react";

export default function DataCell({ text, children }) {
  return (
    <td
      className="text-center border-b-2 border-gray-200/50 pr-3 py-4 font-semibold text-slate-600"
    >
      {text || children}
    </td>
  );
}
