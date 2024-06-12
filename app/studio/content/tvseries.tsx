// import { FaUserPlus } from "react-icons/fa";
'use client'

import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { LuFileVideo } from 'react-icons/lu'
import Tables from '@/components/TablesContentTVSeries'
import { findAllTvSeries } from './data'

export default function TVSeries () {
  const columns = [
    { name: 'Series', uid: 'title' },
    // { name: 'Cover', uid: 'thumbnailtvseries' },
    { name: 'Title', uid: 'seasons.episodes.video.title' },
    { name: 'Season', uid: 'seasons.season_number' },
    { name: 'Episode', uid: 'seasons.episodes.episode_number' },
    { name: 'Genre', uid: 'seasons.episodes.video.genre' },
    { name: 'Status', uid: 'seasons.episodes.video.status' },
    { name: 'Thumbnail', uid: 'thumbnail' },
    // { name: 'Likes', uid: 'seasons.episodes.video.like_count' },
    // { name: 'Comments', uid: 'seasons.episodes.video.comment_count' },
    { name: 'Views', uid: 'seasons.episodes.video.views' },
    { name: 'Actions', uid: 'actions' }
  ]

  const [Data, setData] = useState<any>([])
  const hasFetchedData = useRef(false)
  useEffect(() => {
    const getData = async () => {
      const data = await findAllTvSeries()
      const updatedData = data.map(v => ({...v, id: v.series_id}))
      setData(updatedData)
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      getData()
    }
  }, [])
  console.log(Data);
  
  return (
    <>
      <div className='w-full  h-full rounded-2xl  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white '>
        <div className='flex gap-2'>
          TV Series
          <div
            // href='content/form'
            className='flex border px-1 m-2 bg-green-600 rounded shadow-2xl hover:bg-green-950 gap-2  text-medium font-medium items-center'
          >
            <LuFileVideo /> Add Content
          </div>
        </div>
        <div className='mt-3 '>
          <Tables Data={Data} Columns={columns} />
        </div>
      </div>
    </>
  )
}
