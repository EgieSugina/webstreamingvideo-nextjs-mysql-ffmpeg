'use client'

import React, { useEffect, useRef } from 'react'

export default function Banner ({ children, Data }) {
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch(error => {
            console.error('Autoplay prevented:', error)
          })
      }
    }
  }, [Data])
  return (
    <>
      <div className='relative '>
        {Data?.video_id ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              className={'fixed  w-full'}
            >
              <source src={`/api/videos/${Data.video_id}/clip.mp4`} />
            </video>
          </>
        ) : null}
        <div className='absolute w-full h-screen'>{children}</div>
      </div>
    </>
  )
}
