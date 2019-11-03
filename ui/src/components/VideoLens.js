import React, { useLayoutEffect, useRef, useState } from "react"
import videojs from "video.js"
import "videojs-hotkeys"

import "video.js/dist/video-js.css"

function VideoLens({ src, onLoad, ...props } = { onLoad: () => {} }) {
  const [key, setKey] = useState(0)
  let videoNode = useRef(null)
  const playbackRates = [0.5, 1, 1.5, 2, 2.5, 3]
  const options = {
    playbackRates,
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

      this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        enableJogStyle: true,
        customKeys: {
          slowDown: {
            key: e => e.shiftKey && e.which === 188, // '<' key
            handler: (player, _options, _event) => {
              const currentRate = getPlaybackRate(player)()
              const rateIdx = playbackRates.indexOf(currentRate)
              const newIdx = Math.max(0, rateIdx - 1)
              setPlaybackRate(player)(playbackRates[newIdx])
            }
          },
          speedUp: {
            key: e => e.shiftKey && e.which === 190, // '>' key
            handler: (player, _options, _event) => {
              const currentRate = getPlaybackRate(player)()
              const rateIdx = playbackRates.indexOf(currentRate)
              const newIdx = Math.min(playbackRates.length - 1, rateIdx + 1)
              setPlaybackRate(player)(playbackRates[newIdx])
            }
          }
        }
      })
    })

    return () => {
      if (player) {
        player.dispose()
        setKey(key + 1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.sources.src])

  return (
    <div data-vjs-player key={`video-${key}`} className={props.className}>
      <video ref={videoNode} className="video-js max-h-full" />
    </div>
  )
}

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
  if (player) player.playbackRate(rate)
}

const getPlaybackRate = player => () => {
  if (player) return player.playbackRate()
}

export default VideoLens
