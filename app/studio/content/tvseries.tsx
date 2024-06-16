// import { FaUserPlus } from "react-icons/fa";
'use client'

import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { LuFileVideo } from 'react-icons/lu'
import Tables from '@/components/TablesContentTVSeries'
import { findAllTvSeries } from './data'

export default function TVSeries() {
  const columns = [
    { name: 'Series Title', uid: 'title' },
    { name: 'Genre', uid: 'genre' },
    { name: 'Description', uid: 'description' },

    { name: 'Cover', uid: 'thumbnailtvseries' },
    { name: 'Actions', uid: 'actions' },
  ]

  const [Data, setData] = useState<any>([])
  const hasFetchedData = useRef(false)
  useEffect(() => {
    const getData = async () => {
      const data = await findAllTvSeries()
      const updatedData = data.map((v) => ({ ...v, id: v.series_id }))
      setData(updatedData)
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      getData()
    }
  }, [])
  console.log(Data)

  return (
    <>
      <div className="w-full  h-full rounded-2xl  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white ">
        <div className="flex gap-2">
          TV Series
          <Link
            href="content/tvseries/form"
            className="flex border px-1 m-2 bg-green-600 rounded shadow-2xl hover:bg-green-950 gap-2  text-medium font-medium items-center"
          >
            <LuFileVideo /> Add Content
          </Link>
        </div>
        <div className="mt-3 ">
          <Tables Data={Data} Columns={columns} />
        </div>
      </div>
    </>
  )
}
