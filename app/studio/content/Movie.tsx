// import { FaUserPlus } from "react-icons/fa";
'use client'

import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { LuFileVideo } from 'react-icons/lu'
import Tables from '@/components/TablesContent'
import { findAll } from './data'

export default function Movie () {
  const columns = [
    { name: 'Title', uid: 'title' },
    { name: 'Thumbnail', uid: 'thumbnail' },
    { name: 'Description', uid: 'description' },
    { name: 'Genre', uid: 'genre' },
    { name: 'Status', uid: 'status' },
    { name: 'Likes', uid: 'like_count' },
    { name: 'Comments', uid: 'comment_count' },
    { name: 'Views', uid: 'views' },
    { name: 'Actions', uid: 'actions' }
  ]

  const [Data, setData] = useState<any>([])
  const hasFetchedData = useRef(false)
  useEffect(() => {
    const getData = async () => {
      const data = await findAll()
      setData(data)
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      getData()
    }
  }, [])
  return (
    <>
      <div className='w-full  h-full rounded-2xl  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white '>
        <div className='flex gap-2'>
          Movie
          <Link
            href='content/form'
            className='flex border px-1 m-2 bg-green-600 rounded shadow-2xl hover:bg-green-950 gap-2  text-medium font-medium items-center'
          >
            <LuFileVideo /> Add Content
          </Link>
        </div>
        <div className='mt-3 '>
          <Tables Data={Data} Columns={columns} />
        </div>
      </div>
    </>
  )
}
