import React from "react"

import Episode from "./components/Episode"

const ep = "e05"
const videoPath = `http://localhost:8080/video/mp4/${ep}.mp4`

function App() {
  return (
    <div>
      <Episode videoPath={videoPath} ep={ep} />
    </div>
  )
}

export default App
