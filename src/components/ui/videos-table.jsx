
import * as React from "react";
import { renderHumanReadableDate, sortFiles } from '../../utils/index.js'
import Header from "./header.jsx";
import DataCell from "./data-cell.jsx";

export default function VideosTable() {
  const [filePath, setFilePath] = React.useState("")
  const [videos, setVideos] = React.useState([]);

  window.api.getVideos((data) => {
    setVideos(data?.videos)
    setFilePath(data?.filePath)
  })

  React.useEffect(() => {
    window.api.fetchVideos()
  }, [])

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
          {videos.sort(sortFiles).map(
            (
              fileName,
              index
            ) => {
              return (
                <tr
                  key={`video-${fileName}`}
                  className={index % 2 === 0 ? "bg-slate-100" : "bg-slate-50"}
                >
                  <button onClick={() =>  window.open(` file:///${filePath}/${fileName}`, '_blank', 'top=500,left=200,popup=true')}/>
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
