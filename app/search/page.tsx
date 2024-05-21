'use client'

import { useEffect, useRef, useState } from 'react'

import { Search } from '@/app/studio/content/data'
import VideoCardsWithDetails from '@/components/VideoCardsWithDetails'
import SearchInput from '@/components/Search'
export default function Home({ searchParams: { search } }) {
  // const hasFetchedData = useRef(false)
  const [Data, setData] = useState<any>([])
  useEffect(() => {
    const getData = async () => {
      const data = await Search({ search: search })
      setData(data)
    }
    // if (!hasFetchedData.current) {
    //   hasFetchedData.current = true
    // }
    getData()
  }, [search])

  return (
    <div>
      <div className="mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex mb-3 place-content-end">
          <div className="w-80">
            <SearchInput />
          </div>
        </div>
        {Data.length > 0 ? (
          <>
            <div className="w-full grid grid-cols-6 max-h-[17rem] relative">
              {Data.map((v, i) => (
                <VideoCardsWithDetails key={i + 'mylist'} Data={v} />
              ))}
            </div>
          </>
        ) : (
          <div className=" font-bold">Oops! No results found!</div>
        )}
      </div>
    </div>
  )
}
