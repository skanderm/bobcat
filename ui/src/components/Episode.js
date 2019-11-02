import React, { useState } from "react"

import VideoLens from "./VideoLens"
import RawTextLens from "./RawTextLens"

const base = "http://localhost:8080"

const videoPath = ep => `${base}/video/mp4/${ep}.mp4`
const rawTextPath = ep => `${base}/text/raw/${ep}.txt`

// Lenses to show: Video, RawText, AlignedText, Spect
function Episode({ ep }) {
  const [controls, setControls] = useState({})
  return (
    <div>
      <h1>Episode {ep}</h1>
      <div className="flex">
        <VideoLens src={videoPath(ep)} onLoad={setControls} />
        <RawTextLens textPath={rawTextPath(ep)} />
      </div>
    </div>
  )
}

export default Episode
