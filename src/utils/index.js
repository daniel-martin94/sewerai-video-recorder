export function filterFilesByType(fileList, fileType) {
  return fileList.filter((file) => {
    const fileName = file.name || file;
    const fileExtension = fileName.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
    );
    return fileExtension === fileType;
  });
}

export function renderHumanReadableDate(fileName) {
  // Extract timestamp from filename
  const match = fileName.match(/(\d+)\.webm$/);
  if (!match) {
    console.error("Invalid filename format");
    return "Invalid date";
  }

  // Convert timestamp to integer and create Date object
  const timestamp = parseInt(match[1], 10);
  const date = new Date(timestamp);

  // Format date to a readable string
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString(undefined, options);
}

export function sortFiles(fileNameOne, fileNameTwo) {
  // Extract timestamp from filename
  const match1 = fileNameOne.match(/(\d+)\.webm$/);
  const match2 = fileNameTwo.match(/(\d+)\.webm$/);

  // Convert timestamp to integer
  const timestampOne = parseInt(match1[1], 10);
  const timestampTwo = parseInt(match2[1], 10);

  return timestampTwo - timestampOne;
}
