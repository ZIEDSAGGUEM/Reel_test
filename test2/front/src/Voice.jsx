// VideoUploader.js
import React, { useState } from "react";
import axios from "axios";

const VideoUploader = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", selectedVideo);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      alert("Video uploaded successfully!");
      setUploadedVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>

      {uploadedVideoUrl && (
        <div>
          <h2>Uploaded Video:</h2>
          <video width="400" controls>
            <source src={uploadedVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
