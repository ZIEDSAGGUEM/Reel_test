import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded videos when the component mounts
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/videos");
        setUploadedVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []); // Run this effect only once when the component mounts

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video file");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData
      );
      const { videoPath } = response.data;
      setVideoPath(videoPath);

      // After uploading, fetch the updated list of videos
      const videosResponse = await axios.get("http://localhost:3001/videos");
      setUploadedVideos(videosResponse.data.videos);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div>
      <h1>Video Upload Example</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>

      {videoPath && (
        <div>
          <h2>Uploaded Video</h2>
          <video width="400" controls>
            <source
              src={`http://localhost:3001/${videoPath}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div>
        <h2>Uploaded Videos</h2>
        <ul>
          {uploadedVideos.map((video, index) => (
            <li key={index}>
              <video
                width="400"
                controls
                href={`http://localhost:3001/uploads/${video}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <source
                  src={`http://localhost:3001/${videoPath}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
