import React, { useState } from "react"

import VideoLens from "./VideoLens"
import RawTextLens from "./RawTextLens"
import AlignedTextLens from "./AlignedTextLens"
import SpecLens from "./SpecLens"

const base = "http://localhost:8080"

const videoPath = ep => `${base}/video/mp4/${ep}.mp4`
const rawTextPath = ep => `${base}/text/raw/${ep}.txt`
const alignedTextPath = ep => `${base}/text/aligned/${ep}.json`

// Lenses to show: Video, RawText, AlignedText, Spect
function Episode({ ep }) {
  const noop = () => {}
  const [controls, setControls] = useState({
    play: noop,
    pause: noop,
    playPause: noop,
    getPlayerTime: noop,
    setPlayerTime: noop,
    rewind: noop,
    forward: noop,
    setPlaybackRate: noop
  })
  return (
    <div>
      <h1>Episode {ep}</h1>
      <div className="flex" style={{ height: "50vh" }}>
        <VideoLens
          src={videoPath(ep)}
          onLoad={setControls}
          className={"w-1/3"}
        />
        <RawTextLens textPath={rawTextPath(ep)} className={"w-1/3"} />
        <AlignedTextLens
          alignmentPath={alignedTextPath(ep)}
          className={"w-1/3"}
        />
      </div>
      <div className="flex" style={{ height: "50vh", maxWidth: "100vw" }}>
        <SpecLens ep={ep} base={base} maxN={22} />
      </div>
    </div>
  )
}

export default Episode
