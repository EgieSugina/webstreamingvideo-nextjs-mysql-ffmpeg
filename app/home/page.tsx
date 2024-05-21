'use client'

import './home.css'

import { useEffect, useState, useRef } from 'react'

import Layout from '@/components/layout/home'
import { OnlyPublic, OnlyRecentlyWatched } from '@/app/studio/content/data'
import Slider from '@/components/Slider'
import VideoCards from '@/components/VideoCards'

// import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const hasFetchedData = useRef(false)
  const [RecentlyWatched, setRecentlyWatched] = useState<any>([])
  const [Data, setData] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await OnlyPublic()
      console.log(result)

      setData(result)
      const resultRecentlyWatched = await OnlyRecentlyWatched()

      setRecentlyWatched(resultRecentlyWatched)
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      fetchData()
    }
  }, [])
  // const hlsUrl = "/hls/video.m3u8";

  return (
    <>
      <Layout>
        {RecentlyWatched.length > 0 && (
          <>
            <div className="mx-auto py-6 sm:px-6 lg:px-8">
              <div className="text-white">Recently Watched</div>
              <Slider id={'slider-1'} type={'track'} autoplay={false}>
                {RecentlyWatched.map((v, i) => (
                  <VideoCards
                    key={i + 'new'}
                    Data={v}
                    isRecentlyWatched={true}
                  />
                ))}
              </Slider>
            </div>
          </>
        )}
        <div className="mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-white">New Releases</div>
          {Data.length > 0 && (
            <>
              <Slider id={'slider-2'}>
                {Data.map((v, i) => (
                  <VideoCards key={i + 'new'} Data={v} />
                ))}
              </Slider>
            </>
          )}
        </div>
      </Layout>
    </>
  )
}
