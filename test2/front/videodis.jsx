import React from "react";

const VideoDisplay = () => {
  return (
    <div>
      <video controls width="400">
        <source src="http://localhost:5000/uploads/x.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoDisplay;
