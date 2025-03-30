
import * as React from "react";
import Header from "./header.jsx";
import DataCell from "./data-cell.jsx";

export default function VideosTable() {
  const videos= []

  window.api.getVideos((data) => {
    console.log(`Received from main process`);
    console.log(data)
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
            <Header text="ID" />
            <Header text="First Name" />
            <Header text="Last Name" />
            <Header text="City" />
            <Header text="Degree" />
            <Header text="Specialties" />
            <Header text="Years of Experience" />
            <Header text="Phone Number" />
          </tr>
        </thead>
        <tbody>
          {/* {advocates.map(
            (
              {
                firstName,
                lastName,
                city,
                degree,
                specialties,
                yearsOfExperience,
                phoneNumber,
                id,
              }
              index: number
            ) => {
              return (
                <tr
                  key={`advocate-${id}`}
                  className={index % 2 === 0 ? "bg-slate-100" : "bg-slate-50"}
                >
                  <TableDataCell text={String(id)} />
                  <TableDataCell text={firstName} />
                  <TableDataCell text={lastName} />
                  <TableDataCell text={city} />
                  <TableDataCell text={degree} />
                  <TableDataCell>
                    {specialties.map((s: string, index: number) => (
                      <div key={`advocate-${id}-speciality-${index}`}>{s}</div>
                    ))}
                  </TableDataCell>
                  <TableDataCell text={String(yearsOfExperience)} />
                  <TableDataCell text={String(phoneNumber)} />
                </tr>
              );
            }
          )} */}
        </tbody>
      </table>
    </div>
  );
}
