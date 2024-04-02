'use client'

import Image from 'next/image'
import { Pagination } from '@nextui-org/react'

export default function Comments () {
  return (
    <>
      <div className='bg-[#212129] w-full shadow-3xl  text-white relative rounded-md'>
        <h1 className='font-semibold text-3xl p-4 '>Comments</h1>
        <div className='flex flex-row  gap-3 border-b-2 p-4 border-gray-500'>
          <div className='border-2 border-gray-800'>
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
            <div>Kontent</div>
          </div>
        </div>
        <div className='flex flex-row  gap-3 border-b-2 p-4 border-gray-500'>
          <div className='border-2 border-gray-800'>
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
            <div>Kontent</div>
          </div>
        </div>
        <div className='flex flex-row  gap-3 border-b-2 p-4 border-gray-500'>
          <div className='border-2 border-gray-800'>
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
            <div>Kontent</div>
          </div>
        </div>
        <div className='flex flex-row  gap-3 border-b-2 p-4 border-gray-500'>
          <div className='border-2 border-gray-800'>
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
            <div>Kontent</div>
          </div>
        </div>
        <div className='flex flex-row  gap-3 border-b-2 p-4 border-gray-500'>
          <div className='border-2 border-gray-800'>
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
            <div>Kontent</div>
          </div>
        </div>
        <div className='flex flex-row  gap-3 border-b-2 p-4 border-gray-500'>
          <div className='border-2 border-gray-800'>
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
            <div>Kontent</div>
          </div>
        </div>
        <div className='flex flex-row  gap-3 border-b-2 p-4 border-gray-500'>
          <div className='border-2 border-gray-800'>
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
            <div>Kontent</div>
          </div>
        </div>
        <div className='flex flex-row  gap-3 border-b-2 p-4 border-gray-500'>
          <div className='border-2 border-gray-800'>
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
            <div>Kontent</div>
          </div>
        </div>
        <div className="flex flex-row-reverse p-4">
          <Pagination total={10} initialPage={1} className="" variant={"light"} />
        </div>
      </div>
    </>
  )
}
