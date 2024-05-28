'use client'
// import { FaComment, FaEye, FaHeart } from 'react-icons/fa6'
import { Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function VideoCards({ Data }) {
  const compareDates = (date1) => {
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
  // href={`/watch/${Data.video_id}`}
  return (
    <>
      <Link href={`/tvseries/${Data.series_id}`}>
        <div className="max-w-[16rem] group/item transition duration-200 hover:shadow-2xl ease-in-out transform hover:scale-105 hover:z-50 each mb-10 m-2 shadow-lg border-gray-800 bg-gray-800 relative">
          <div className="max-w-[16rem]">
            <Image
              className="max-w-[16rem]"
              width={215}
              height={318}
              quality={100}
              src={`/api/tvseries/${Data?.series_id}.png`}
              alt={Data.series_id}
            />
            {/* {compareDates(Data.upload_date) && (
              <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">
                Recently Added
              </div>
            )} */}
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
          <div className="hidden group/edit group-hover/item:flex group-hover/item:flex-col desc p-4 text-gray-200">
            <div className="title font-bold block cursor-pointer hover:underline">
              {Data.title}
            </div>
            {/* <div className="description text-sm block py-2 border-gray-400 mb-2">
              <Select
                variant={'underlined'}
                label="Select season"
                className="max-w-xs"
              >
                {[1, 2, 3].map((season) => (
                  <SelectItem key={season} value={season}>
                    {`Season ${season}`}
                  </SelectItem>
                ))}
              </Select>
            </div> */}
            {/* <span className="description text-sm block py-2 border-gray-400 mb-2">
            lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
          </span> */}
          </div>
        </div>
      </Link>
    </>
  )
}
