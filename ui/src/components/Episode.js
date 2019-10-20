import React from "react"

function Episode({ ep, videoPath }) {
  return (
    <div>
      <h1>Episode {ep}</h1>
      <video controls src={videoPath} />
    </div>
  )
}

export default Episode
