'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { Pagination } from '@nextui-org/react'
import { getData } from './data'

export default function Comments () {
  const [Data, setData] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const get = async () => {
      const data = await getData()
      setData(data)
      console.log(data)
    }
    get()
  }, [])
  if (Data.length == 0) return <>No Data</>
  const itemsPerPage = 10
  const totalItems = Data.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const displayedItems = Data.slice(startIndex, endIndex)

  const handlePageChange = page => {
    setCurrentPage(page)
  }
  return (
    <>
      <div className='bg-[#212129] w-full shadow-3xl  text-white relative rounded-md'>
        <h1 className='font-semibold text-3xl p-4 '>Comments</h1>

        {displayedItems.map(item => (
          <>
            <div
              key={item.id}
              className='flex flex-row  gap-3 border-b-2 p-4 border-gray-500'
            >
              <div className='  '>
                <Image
                  src='/assets/images/profile.jpg'
                  width={50}
                  height={50}
                  alt='Picture of the author'
                  className={'rounded-full'}
                />
              </div>
              <div>
                <div>@nama</div>
                <div>{item.comment_text}</div>
              </div>
              <div>
                <Image
                  src='/assets/images/profile.jpg'
                  width={50}
                  height={50}
                  alt='Picture of the author'
                  className={'rounded-full'}
                />
              </div>
            </div>
          </>
        ))}
        <div className='flex flex-row-reverse p-4'>
          <Pagination
            total={totalItems - 1}
            current={currentPage}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            className=''
            variant={'light'}
          />
        </div>
      </div>
    </>
  )
}
