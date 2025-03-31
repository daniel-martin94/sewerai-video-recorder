
import * as React from "react";
import { renderHumanReadableDate } from '../../utils/index.js'
import Header from "./header.jsx";
import DataCell from "./data-cell.jsx";

export default function VideosTable() {
  const [videos, setVideos] = React.useState([]);

  window.api.getVideos((data) => {
    console.log(`Received from main process`);
    console.log(data)
    setVideos(data?.results)
  })

  if (videos?.length === 0)
    return (
      <p className="text-lg bg-transparent text-slate-100">
        No videos
      </p>
    );
  return (
    <div className="min-w-full overflow-x-auto rounded-sm bg-white h-full">
      <table className="min-w-full align-middle text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-slate-300">
            <Header text="Date" />
            <Header text="" />
          </tr>
        </thead>
        <tbody>
          {videos.map(
            (
              fileName,
              index
            ) => {
              return (
                <tr
                  key={`video-${fileName}`}
                  className={index % 2 === 0 ? "bg-slate-100" : "bg-slate-50"}
                >
                  <DataCell text={String(renderHumanReadableDate(fileName))} />
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
