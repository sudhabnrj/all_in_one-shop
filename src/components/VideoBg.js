import React from 'react'

const VideoBg = ({src}) => {
  return (
    <video id="ess_video" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
        <source src={src} type="video/mp4" />
    </video>
  )
}

export default VideoBg
