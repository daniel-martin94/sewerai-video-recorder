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
