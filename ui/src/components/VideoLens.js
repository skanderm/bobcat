import React, { useLayoutEffect, useRef, useState } from "react"
import videojs from "video.js"

import "video.js/dist/video-js.css"

const play = player => () => {
  if (player) player.play()
}
const pause = player => () => {
  if (player) player.pause()
}

const playPause = player => () => {
  if (player) player.paused() ? player.play() : player.pause()
}

const getPlayerTime = player => () => {
  if (player) return player.currentTime()
}

const setPlayerTime = player => time => {
  if (player) player.currentTime(time)
}

const rewind = player => seconds => {
  if (player) setPlayerTime(player)(getPlayerTime(player)() - seconds)
}

const forward = player => seconds => {
  if (player) rewind(player)(-seconds)
}

const setPlaybackRate = player => rate => {
  if (player) player.setPlaybackRate(rate)
}

// Specify src, control playback, speed, etc
function VideoLens({ src, onLoad } = { onLoad: () => {} }) {
  const [key, setKey] = useState(0)
  let videoNode = useRef(null)
  const options = {
    /* autoplay: true, */
    controls: true,
    sources: [{ src }]
  }

  useLayoutEffect(() => {
    const player = videojs(videoNode.current, options, function() {
      onLoad({
        play: play(this),
        pause: pause(this),
        playPause: playPause(this),
        getPlayerTime: getPlayerTime(this),
        setPlayerTime: setPlayerTime(this),
        rewind: rewind(this),
        forward: forward(this),
        setPlaybackRate: setPlaybackRate(this)
      })
    }).ready()

    return () => {
      if (player) {
        player.dispose()
        setKey(key + 1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.sources.src])

  return (
    <div data-vjs-player key={`video-${key}`}>
      <video ref={videoNode} className="video-js vjs-16-9"></video>
    </div>
  )
}

export default VideoLens
