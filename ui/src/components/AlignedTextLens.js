import React, { useState, useEffect } from "react"

function AlignedTextLens({ alignmentPath, ...props }) {
  const [aligned, setAligned] = useState({})

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(alignmentPath)
      const aligned = await result.json()
      setAligned(aligned)
    }

    fetchData()
  }, [alignmentPath])
  return (
    <div className={`overflow-y-scroll max-h-screen ${props.className}`}>
      <h2>AlignedText</h2>
      {JSON.stringify(aligned["words"])}
    </div>
  )
}

export default AlignedTextLens
