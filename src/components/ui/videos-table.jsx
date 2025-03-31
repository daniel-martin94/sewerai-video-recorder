
import * as React from "react";
import { renderHumanReadableDate, sortFiles } from '../../utils/index.js'
import Header from "./header.jsx";
import DataCell from "./data-cell.jsx";
import Button from "../buttons/button.jsx";

export default function VideosTable() {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [filePath, setFilePath] = React.useState("")
  const [videos, setVideos] = React.useState([]);

  // Runs once on initialization to fetch videos
  if (!isLoaded) {
    window.api.fetchVideos()
    setIsLoaded(true)
  }

  // Listens to the context bridge to update the state when new videos are created
  // Not ideal because we're not removing the listener on unmount to avoid memory leaks,
  // but we don't want to expose ipcRenderer context here.
  React.useEffect(() => {
    const handleResponse =  (data) => {
        setVideos(data?.videos)
        setFilePath(data?.filePath)
      }
    window.api.getVideos(handleResponse)
  });

  if (videos?.length === 0) return

  return (
    <div className="flex flex-col items-start justify-start mt-8">
      <p className="text-white text-base text-left mb-4">Recordings</p>
      <div className="min-w-2xl overflow-x-auto rounded-sm bg-white h-full">
        <table className="min-w-full align-middle text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-300">
              <Header text="Created" />
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
                    <DataCell text={String(renderHumanReadableDate(fileName))} />
                    <DataCell><Button onPress={() =>  window.open(` file:///${filePath}/${fileName}`, '_blank', 'popup=true')}>View</Button></DataCell>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
