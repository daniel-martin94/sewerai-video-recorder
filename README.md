# Webcam Recording Component

## Overview
This project provides a React component that enables users to record videos using their webcam. The recorded videos are stored locally via an Electron-based API and displayed in a table format.

## Features
- Start and stop video recording
- Display recording timer
- Save recorded video to local storage
- List recorded videos in a table
- View saved videos directly
- Handle webcam loading states and errors

## Technologies Used
- React
- Webcam.js
- Electron
- TailwindCSS

### Design Choices
- **Native Browser Video Player** is used to play recorded videos since it covers the requirements effectively, eliminating the need for an additional library.
- **React** was chosen over plain JavaScript for better state management capabilities, making it easier to handle UI updates and component reactivity.
- **React Webcam** was used because it provides a lot of out-of-the-box functionality for handling webcam streams, making implementation simpler and more efficient.
- **TailwindCSS** was used for more manageable styling, allowing for utility-based styling without the need for extensive custom CSS.

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- npm

### Steps
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <project_directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the project:
   ```sh
   npm run start
   ```

## Usage
1. Launch the application.
2. Allow webcam access when prompted.
3. Click the "Record" button to start recording.
4. Click the "Stop" button to stop recording.
5. Click "Save" to store the recorded video.
6. View saved videos in the "Recordings" table.
7. Click "View" to open a saved video.

### Note
Recorded videos are saved in the `/public` subdirectory in `.webm` format.

## Code Structure
- `WebcamComponent.jsx`: Handles webcam recording logic.
- `VideosTable.jsx`: Displays a list of recorded videos with view options.
- `record-button.jsx`: Button to start recording.
- `stop-button.jsx`: Button to stop recording.
- `button.jsx`: Generic button component.
- `header.jsx`: Table header component.
- `data-cell.jsx`: Table data cell component.
- `index.js`: Utility functions including `formatTime`, `renderHumanReadableDate`, and `sortFiles`.
- `electron.js`: Electron API integration for saving and fetching videos.

## API Methods
### `window.api.saveVideo(arrayBuffer)`
Saves recorded video as a binary buffer.

### `window.api.getVideos(callback)`
Retrieves saved videos via Electron.

### `window.api.fetchVideos()`
Fetches a list of recorded videos asynchronously.

## Error Handling
- Displays a loading message when the webcam is initializing.
- Shows an error message if webcam access is denied or unavailable.
- Ensures the video list updates dynamically when new videos are saved.

## License
This project is licensed under [MIT License](LICENSE).

