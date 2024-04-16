'use client'

import { useEffect, useRef, useState } from 'react'

import { ListMovie } from '@/app/studio/content/data'
import VideoCardsWithDetails from '@/components/VideoCardsWithDetails'

export default function Home () {
  const hasFetchedData = useRef(false)
  const [Data, setData] = useState<any>([])
  useEffect(() => {
    const getData = async () => {
      const data = await ListMovie()
      setData(data)
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      getData()
    }
  }, [])

  return (
    <div>
      <div className='mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='w-full grid grid-cols-6 max-h-[17rem] relative'>
          {Data.map((v, i) => (
            <VideoCardsWithDetails key={i + 'mylist'} Data={v} />
          ))}
        </div>
      </div>
    </div>
  )
}
