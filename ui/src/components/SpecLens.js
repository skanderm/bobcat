import React from "react"

function SpecLens({ base, ep, maxN, ...props }) {
  const imagePaths = Array.from(Array(maxN).keys()).map(
    n => `${base}/spectrograms/${ep}/${ep}_${n}.png`
  )
  return (
    <div className={props.className || ""}>
      <h2>Spec</h2>
      <div className="flex overflow-x-scroll h-64">
        {imagePaths.map((path, i) => (
          <img src={path} key={i} />
        ))}
      </div>
    </div>
  )
}

export default SpecLens
