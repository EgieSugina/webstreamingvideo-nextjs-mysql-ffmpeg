"use client"
// import { FaComment, FaEye, FaHeart } from 'react-icons/fa6'

import Image from 'next/image'
import Link from 'next/link'

export default function VideoCards ({ Data }) {
  const compareDates = date1 => {
    const date1Obj = new Date(date1)
    const date2Obj = new Date()

    const diffMs = Math.abs(date2Obj - date1Obj)

    const diffDays = diffMs / (1000 * 60 * 60 * 24)

    if (diffDays <= 2) {
      return true
    } else {
      return false
    }
  }
  return (
    <>
      <Link href={`/watch/${Data.video_id}`}>
        <div className=' group/item transition duration-200 hover:shadow-2xl ease-in-out transform hover:scale-105 hover:z-50 each mb-10 m-2 shadow-lg border-gray-800 bg-gray-800 relative'>
          <div className='max-h-[160]'>
            <Image
              className='w-full'
              width={280}
              height={160}
              quality={100}
              src={`/api/videos/${Data.video_id}/thumbnail.png`}
              alt={Data.video_id}
            />
            {compareDates(Data.upload_date) && (
              <div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
                Recently Added
              </div>
            )}
          </div>
          {/* <div className='hidden group/edit group-hover/item:flex info-box w-full text-xs p-1 font-semibold text-gray-500 bg-gray-300 text-center'>
            <div className=' grow mr-1 p-1 px-2 font-bold flex flex-nowrap gap-1 items-center justify-center'>
              <FaEye /> {Data.views}
            </div>
            <div className=' grow mr-1 p-1 px-2 font-bold border-l border-gray-400 flex flex-nowrap gap-1 items-center justify-center'>
              <FaHeart className='text-red-700' /> {Data.like_count}
            </div>
            <div className=' grow mr-1 p-1 px-2 font-bold border-l border-gray-400 flex flex-nowrap gap-1 items-center justify-center'>
              <FaComment /> {Data.comment_count}
            </div>
          </div> */}
          <div className='hidden group/edit group-hover/item:flex  desc p-4 text-gray-200'>
            <div className='title font-bold block cursor-pointer hover:underline'>
              {Data.title}
            </div>

            {/* <span className="description text-sm block py-2 border-gray-400 mb-2">
            lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
          </span> */}
          </div>
        </div>
      </Link>
    </>
  )
}
