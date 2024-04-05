'use client'

import { signIn, signOut } from 'next-auth/react'
import { FaPlus, FaCheck } from 'react-icons/fa6'

import { Button } from '@nextui-org/react'
import { FaRegHeart } from 'react-icons/fa6'
import { FcLike } from 'react-icons/fc'
import { IoIosLogOut } from 'react-icons/io'
import { useEffect } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { AddMyList, RemoveMyList, getOnListMyList } from './Actions'
export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  )
}

export const RegisterButton = () => {
  return (
    <Link
      className='inline-block px-7  py-4 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center'
      href='/register'
      style={{ marginRight: 10 }}
    >
      Register
    </Link>
  )
}

export const LogoutButton = () => {
  return (
    <Button
      className=' bg-red-800 rounded-md'
      onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
    >
      Sign Out <IoIosLogOut className=' font-extrabold text-2xl' />
    </Button>
  )
}
export const AddMyListButton = ({ userID, VideoID }) => {
  const [have, setHave] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const data = {
      user_id: userID,
      video_id: VideoID
    }
    const getData = async () => {
      const inList = await getOnListMyList(data)

      setHave(inList)
    }
    getData()
  }, [userID, VideoID])
  const handleAdd = async () => {
    setIsLoading(true)
    const data = {
      user_id: userID,
      video_id: VideoID
    }
    await AddMyList(data)
    setHave(true)
    setIsLoading(false)
  }

  const handleRemove = async () => {
    setIsLoading(true)
    const data = {
      user_id: userID,
      video_id: VideoID
    }
    await RemoveMyList(data)
    setHave(false)
    setIsLoading(false)
  }

  return (
    <Button
      color='secondary'
      variant={have ? 'shadow' : 'bordered'}
      radius='sm'
      className='font-semibold rounded-none'
      onClick={have ? handleRemove : handleAdd}
      isLoading={isLoading}
    >
      {!isLoading && (
        <>
          {have ? (
            <FaCheck className='animate-jump-in text-2xl animate-once animate-ease-in animate-normal animate-fill-both' />
          ) : (
            <FaPlus className='text-2xl' />
          )}
        </>
      )}{' '}
      My List
    </Button>
  )
}

export const ProfileButton = () => {
  return <Link href='/profile'>Profile</Link>
}
import { findOne, Count, destroy, create } from './LikesActions'
export const Likes = ({ userID, videoID }) => {
  const [liked, setLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const _Liked = await findOne(userID, videoID)
      setLiked(_Liked)
      const _Count = await Count(videoID)
      setTotalLikes(_Count)
    }
    getData()
  }, [userID, videoID])

  const handleLike = async () => {
    setLiked(true)
    await create(userID, videoID)
    setTotalLikes(prevTotalLikes => prevTotalLikes + 1)
  }

  const handleUnlike = async () => {
    setLiked(false)

    await destroy(userID, videoID)
    setTotalLikes(prevTotalLikes => prevTotalLikes - 1)
  }

  return (
    <Button
      type='submit'
      radius='sm'
      className='font-semibold rounded-none border-none '
      variant='bordered'
      onClick={liked ? handleUnlike : handleLike}
    >
      {liked ? (
        <FcLike className='animate-jump-in text-3xl animate-once animate-ease-in animate-normal animate-fill-both text-red-700' />
      ) : (
        <FaRegHeart className='text-2xl' />
      )}
      <span>{totalLikes}</span>
    </Button>
  )
}
