'use client'

import './studio.css'
import 'react-quill/dist/quill.snow.css'
import { getDataLatestComments, getDataLatestPublish } from './data'
// import { Button } from "@nextui-org/button";
// import { Input } from "@nextui-org/react";
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tooltip } from '@nextui-org/react'
import { MdOutlineInsertComment } from 'react-icons/md'
import { FcLike } from 'react-icons/fc'

export default function HomeStudio() {
  const [Comments, setComments] = useState<any>([])
  const [Videos, setVideos] = useState<any>([])

  // const variant = "underlined"; //["flat", "bordered", "underlined", "faded"];
  const videoRef = useRef(false)
  const commentsRef = useRef(false)

  useEffect(() => {
    const get = async () => {
      const data = await getDataLatestComments()
      setComments(data)
    }
    if (!commentsRef.current) {
      commentsRef.current = true
      get()
    }
  }, [])
  useEffect(() => {
    const get = async () => {
      const data = await getDataLatestPublish()
      setVideos(data)
      console.log(data)
    }
    if (!videoRef.current) {
      videoRef.current = true
      get()
    }
  }, [])
  function formatDate(date) {
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
      <h1 className="font-bold text-3xl text-white">Halaman Admin</h1>
      <div className="grid grid-cols-3 mt-2 gap-4">
        <div className="bg-content1 rounded-xl">
          <h2 className="py-2 px-3 text-zinc-200 font-semibold">
            Published videos
          </h2>
          <div className="px-4 gap-4">
            {Videos &&
              Videos.map((item) => (
                <>
                  <div class="grid grid-rows-3 text-zinc-200 grid-cols-12 grid-flow-col gap-4  my-4 border-b-2">
                    <div class="row-span-3   col-span-4">
                      <Link href={`/watch/${item.video_id}`}>
                        <Image
                          src={`/api/videos/${item.video_id}/thumbnail.png`}
                          width={120 * 1.5}
                          height={50 * 1.5}
                          alt="Picture of the author"
                          className={'rounded shadow'}
                        />
                      </Link>
                    </div>
                    <div class="  col-span-8 ">{item.title}</div>
                    <div class="  row-span-1 col-span-5 flex gap-4">
                      <div className="flex gap-2 items-center">
                        <MdOutlineInsertComment /> {item.comment_count}
                      </div>
                      <div className="flex gap-2 items-center">
                        <FcLike /> {item.like_count}
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="bg-content1 rounded-xl">
          <h2 className="py-2 px-3 text-zinc-200 font-semibold">
            Latest comments
          </h2>
          <div className="  ">
            {Comments &&
              Comments.map((item) => (
                <>
                  <div
                    key={item.id}
                    className="flex flex-row  gap-3 h-fit border-t-2 p-4 border-gray-500"
                  >
                    {item['user.img'] ? (
                      <>
                        <Image
                          src={`data:image/png;base64,${item['user.img']}`}
                          alt={''}
                          title={''}
                          width="100"
                          height="100"
                          className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400"
                        />
                      </>
                    ) : (
                      <>
                        <div className="object-cover w-8 text-center h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400">
                          <h1 className="text-xl text-neutral-200 ">
                            {item['user.fullname'].split('')[0]}
                          </h1>
                        </div>
                      </>
                    )}
                    <div className="grow">
                      <div className="font-bold text-neutral-200">
                        {item['user.fullname'] +
                          ' (' +
                          item['user.username'] +
                          ')'}{' '}
                        <span className="text-neutral-400 font-semibold text-center self-center text-small  p-1  ">
                          {'•'} {formatDate(item.comment_date)}
                        </span>
                      </div>
                      <div className="text-zinc-100">{item.comment_text}</div>
                    </div>
                    <div>
                      <Link href={`/watch/${item.video_id}`}>
                        <Image
                          src={`/api/videos/${item.video_id}/thumbnail.png`}
                          width={120}
                          height={50}
                          alt="Picture of the author"
                          className={'rounded shadow'}
                        />
                      </Link>
                    </div>
                    <div
                      className={
                        'max-w-36 min-w-36 font-normal self-center text-zinc-100'
                      }
                    >
                      {item['video.title']}
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
