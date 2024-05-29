'use client'

import { useEffect, useRef, useState } from 'react'

import { OnlyMyList } from '@/studio/content/Data'
import VideoCards from '@/components/VideoCards'

// import Slider from '@/components/Slider'



// import VideoPlayer from "@/components/VideoPlayer";

export default function Home () {
  const hasFetchedData = useRef(false)
  const [Data, setData] = useState<any>([])
  useEffect(() => {
    const getData = async () => {
      const data = await OnlyMyList()
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
        <div className='w-full grid grid-cols-6 max-h-[17rem] relative'>
          {Data.map((v, i) => (
            <VideoCards key={i + 'mylist'} Data={v} />
          ))}
        </div>
      </div>
    </div>
  )
}
