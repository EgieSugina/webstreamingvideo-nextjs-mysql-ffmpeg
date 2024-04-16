'use client'

import { Pagination, Tooltip } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { MdDeleteForever } from 'react-icons/md'
import { getData } from './data'

export default function Comments () {
  const [Data, setData] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1)
  const hasFetchedData = useRef(false)

  useEffect(() => {
    const get = async () => {
      const data = await getData()
      setData(data)
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      get()
    }
  }, [])
  if (Data.length == 0) return <>No Data</>
  const itemsPerPage = 5
  const totalItems = Data.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const displayedItems = Data.slice(startIndex, endIndex)

  const handlePageChange = page => {
    setCurrentPage(page)
  }
  function formatDate (date) {
    const now = new Date()
    const diff = now - date
    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else {
      return 'Just now'
    }
  }
  return (
    <>
      <div className='bg-[#212129] w-full min-h-full shadow-3xl text-white relative rounded-md'>
        <h1 className='font-semibold text-3xl p-4 '>Comments</h1>
        <div className='  '>
          {displayedItems.map(item => (
            <>
              <div
                key={item.id}
                className='flex flex-row  gap-3 h-fit border-t-2 p-4 border-gray-500'
              >
                {item['user.img'] ? (
                  <>
                    <Image
                      src={`data:image/png;base64,${item['user.img']}`}
                      alt={''}
                      title={''}
                      width='100'
                      height='100'
                      className='object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400'
                    />
                  </>
                ) : (
                  <>
                    <div className='object-cover w-8 text-center h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400'>
                      <h1 className='text-xl text-gray '>
                        {item['user.fullname'].split('')[0]}
                      </h1>
                    </div>
                  </>
                )}
                <div className='grow'>
                  <div className='font-bold'>
                    {item['user.fullname'] + ' (' + item['user.username'] + ')'}{' '}
                    <span className='text-neutral-500 font-semibold text-center self-center text-small  p-1  '>
                      {'•'} {formatDate(item.comment_date)}
                    </span>
                  </div>
                  <div>{item.comment_text}</div>
                </div>
                <div>
                  <Link href={`/watch/${item.video_id}`}>
                    <Image
                      src={`/api/videos/${item.video_id}/thumbnail.png`}
                      width={120}
                      height={50}
                      alt='Picture of the author'
                      className={'rounded shadow'}
                    />
                  </Link>
                </div>
                <div className={'max-w-36 min-w-36 font-normal self-center'}>
                  {item['video.title']}
                </div>
                <div className=" content-center">
                  <Link href={`/studio/comments/delete/${item.comments_id}`}>
                    <Tooltip color='danger' content='Delete Comments'>
                      <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                        <MdDeleteForever className='text-2xl' />
                      </span>
                    </Tooltip>
                  </Link>
                </div>
              </div>
            </>
          ))}
        </div>

        <div className='flex absolute bottom-0 w-full flex-row-reverse p-4 border-t-2'>
          <Pagination
            total={totalPages}
            // current={currentPage}
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
