'use client'

import './layout.css'

// import { useEffect, useState } from 'react'

import Account from './Profile'
// import { FaPlay } from 'react-icons/fa'
import Image from 'next/image'
// import { IoMdInformationCircleOutline } from 'react-icons/io'
import Menu from './menu'
// import VideoBackground from '@/components/layout/home/videoBackground'
// import { findOne } from './dataVideo'

// import { Button } from "@nextui-org/react";

export default function HomeLayout ({ children }) {
  // const [Data, setData] = useState<any>(null)
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await findOne()
  //     setData(data)
  //   }
  //   getData()
  // }, [])
  return (
    <>
      {/* <VideoBackground Data={Data}> */}
      <div className='min-h-full '>
        {/* <VideoBackground> */}
        <nav className='glass sticky top-0 z-50'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <Image
                    src={'/assets/images/logo.svg'}
                    width={150}
                    height={150}
                    alt='Logo'
                  />
                </div>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    <Menu name='Home' href='/home' />
                    <Menu name='Movie' href='/movie' />
                    <Menu name='TV Series' href='/tvseries' />
                    <Menu name='My List' href='/mylist' />
                  </div>
                </div>
              </div>

              <Account />
            </div>
          </div>
        </nav>

        <main>{children}</main>
      </div>
      {/* </VideoBackground> */}
    </>
  )
}
