import React, { useState, useEffect } from "react"

function RawTextLens({ textPath, ...props }) {
  const [text, setText] = useState("")

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(textPath)
      const text = await result.text()
      setText(text)
    }

    fetchData()
  }, [textPath])
  return (
    <div className={`overflow-y-scroll ${props.className}`}>
      <h2>RawText</h2>
      {text.split("\n").map((t, i) => (
        <p key={i}>{t}</p>
      ))}
    </div>
  )
}

export default RawTextLens
