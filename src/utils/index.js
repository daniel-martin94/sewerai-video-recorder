// Filters an array of files based on the specified file type (extension)
export function filterFilesByType(fileList, fileType) {
  return fileList.filter((file) => {
    // Get the file name or assume the file is the name itself
    const fileName = file.name || file;

    // Extract the file extension from the file name
    const fileExtension = fileName.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
    );

    // Return whether the file's extension matches the specified file type
    return fileExtension === fileType;
  });
}

// Converts a filename containing a timestamp to a human-readable date format
export function renderHumanReadableDate(fileName) {
  // Extract timestamp from filename using regex matching
  const match = fileName.match(/(\d+)\.webm$/);
  if (!match) {
    console.error("Invalid filename format");
    return "Invalid date"; // Return an error message if format is invalid
  }

  // Convert extracted timestamp to integer and create a Date object
  const timestamp = parseInt(match[1], 10);
  const date = new Date(timestamp);

  // Format the Date object into a human-readable date string
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString(undefined, options); // Return formatted date string
}

// Compares two filenames containing timestamps and sorts them in descending order
export function sortFiles(fileNameOne, fileNameTwo) {
  // Extract timestamp from both filenames using regex
  const match1 = fileNameOne.match(/(\d+)\.webm$/);
  const match2 = fileNameTwo.match(/(\d+)\.webm$/);

  // Convert extracted timestamps to integers
  const timestampOne = parseInt(match1[1], 10);
  const timestampTwo = parseInt(match2[1], 10);

  // Return difference between timestamps to sort in descending order
  return timestampTwo - timestampOne;
}

// Formats time in seconds into a string format of "MM:SS"
export const formatTime = (timeInSeconds) => {
  // Calculate minutes and remaining seconds from the given time in seconds
  const minutes = Math.floor(timeInSeconds / 60);
  const remainingSeconds = timeInSeconds % 60;

  // Return formatted string with leading zeros if necessary
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};
