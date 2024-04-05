'use client'

import './layout.css'

import { useEffect, useState,useRef } from 'react'

import Account from './Profile'
import { FaPlay } from 'react-icons/fa'
import Image from 'next/image'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import Menu from './menu'
import VideoBackground from '@/components/layout/home/videoBackground'
import { findOne } from './dataVideo'

// import { Button } from "@nextui-org/react";

export default function HomeLayout ({ children }) {
  const [Data, setData] = useState<any>(null)
  const hasFetchedData = useRef(false)


  useEffect(() => {
    const fetchData = async () => {
      const result = await findOne();
      setData(result);
    };
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      fetchData();
    }
  }, [hasFetchedData]);
  return (
    <>
      <VideoBackground Data={Data}>
        <div className='min-h-full bg-gradient-to-b from-transparent  to-slate-900'>
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
          <main>
            {Data && (
              <>
                {' '}
                <div className=' h-[30rem] p-8'>
                  <div className='flex items-center h-full'>
                    <div className='text-5xl gap-4'>
                      {Data.title}
                      <p
                        className='mt-2  text-justif text-medium w-[40rem] max-h-[20rem]'
                        dangerouslySetInnerHTML={{
                          __html: Data.description
                            .split('</p><p>')[0]
                            .replace('<p>', '')
                        }}
                      ></p>

                      <div className='flex gap-2 mt-3'>
                        <button className='z-0 text-gray-800 rounded-md group relative  inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-3xl gap-unit-2 [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover   bg-white'>
                          <FaPlay /> Play
                        </button>
                        <button
                          className='z-0 text-gray-800 rounded-md group relative  inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-3xl gap-unit-2 [&amp;>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover 
                          color-secondary hover:bg-opacity-40'
                        >
                          <IoMdInformationCircleOutline /> More Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {children}
          </main>
        </div>
      </VideoBackground>
    </>
  )
}
