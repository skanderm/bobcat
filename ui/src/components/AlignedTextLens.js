import React, { useState, useEffect } from "react"

function Word({ word, start, end }) {
  return (
    <span
      data-start-time={start && start.toFixed(2)}
      data-end-time={end && end.toFixed(2)}
    >
      {word}{" "}
    </span>
  )
}

// Pass in groupings, tags
function AlignedTextLens({ alignmentPath, ...props }) {
  const [aligned, setAligned] = useState({})
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(alignmentPath)
      const aligned = await result.json()
      setAligned(aligned)
      setFetched(true)
    }

    fetchData()
  }, [alignmentPath])
  return (
    <div className={`${props.className} overflow-hidden`}>
      <h2 className="border-bottom p-2 bg-indigo-200 shadow">AlignedText</h2>
      <div className="aligned-text overflow-y-scroll max-h-screen">
        {fetched && aligned.words.map((word, i) => <Word {...word} key={i} />)}
      </div>
    </div>
  )
}

export default AlignedTextLens
