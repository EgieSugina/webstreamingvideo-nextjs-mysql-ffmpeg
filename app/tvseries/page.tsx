'use client'

import { useEffect, useState, useRef } from 'react'

// import Slider from '@/components/Slider'
import VideoCardsTVSeries from '@/components/VideoCardsTVSeries'
import { getTVSeries } from './data'

// import VideoPlayer from "@/components/VideoPlayer";

export default function Home ({searchParams: { genre } }) {
  const hasFetchedData = useRef(false)
  const [Data, setData] = useState<any>([])
  useEffect(() => {
    const getData = async () => {
      const data = await getTVSeries(genre)
      setData(data)
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      getData()
    }
  }, [])
  
  // const hlsUrl = "/hls/video.m3u8";

  return (
    <div>
      <div className='mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='w-full grid grid-cols-8 max-h-[17rem] relative'>
          {Data.map((v, i) => (
            <VideoCardsTVSeries key={i + 'tvseries'} Data={v} />
          ))}
        </div>
      </div>
    </div>
  )
}
