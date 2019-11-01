import React, { useState } from "react"

import VideoLens from "./VideoLens"

// Lenses to show: Video, RawText, AlignedText, Spect
function Episode({ ep, videoPath }) {
  const [controls, setControls] = useState({})
  return (
    <div>
      <h1>Episode {ep}</h1>
      <VideoLens src={videoPath} onLoad={setControls} />
    </div>
  )
}

export default Episode
