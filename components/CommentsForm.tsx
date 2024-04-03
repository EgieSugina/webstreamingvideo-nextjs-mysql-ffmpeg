'use client'

import { Button, Textarea } from '@nextui-org/react'

import Image from 'next/image'
import { Likes, AddMyListButton } from './buttons.component'
import { LuSend } from 'react-icons/lu'
import React, { useEffect } from 'react'
import { PostComments, getCommentsByVideoID, imgProp } from './Actions'
export default function CommentsForm ({ session, VideoID }) {
  const [comments, setComments] = React.useState([])
  const formRef = React.useRef(null)
  useEffect(() => {
    const getData = async () => {
      const dataComments = await getCommentsByVideoID(VideoID)
      const data = await Promise.all(
        dataComments.map(async v => {
          const img =  await imgProp(session.user.id)
          return { ...v, img }
        })
      )
      setComments(data)
    }
    getData()
  }, [VideoID])

  async function onSubmit (event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {}
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    data['nama'] = session.user.name
    data['user_id'] = session.user.id
    data['video_id'] = VideoID
    data['img'] = await imgProp(session.user.id)
    PostComments(data)
    setComments([...comments, data])
    formRef.current.reset()
  }

  return (
    <>
      <div className={'flex place-content-center mt-5'}>
        <div className={'w-[83vw] '}>
          <Likes videoID={VideoID} userID={session.user.id}/>
          <AddMyListButton userID={session.user.id} VideoID={VideoID} />
          <div className=' mt-4 glass '>
            <h3 className='font-bold p-2'>Komentar</h3>
            <form ref={formRef} onSubmit={onSubmit}>
              <div className='flex flex-col max-h-[43.5rem] overflow-y-auto'>
                <div className='w-full px-3 my-2'>
                  <Textarea
                    isRequired
                    // label='Description'
                    labelPlacement='outside'
                    placeholder='Type Your Comment'
                    // className='max-w-xs'
                    name='comment_text'
                    variant='underlined'
                  />
                </div>
                <div className='w-full flex justify-between  pb-2 gap-2 px-3'>
                  <Button
                    type='submit'
                    color='success'
                    radius='sm'
                    className='font-semibold rounded-none'
                  >
                    Send <LuSend />
                  </Button>
                </div>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div
                      key={index}
                      className='glass  p-3  border-b-1 border-white'
                    >
                      <div className='flex gap-3 items-center'>
                        {comment.img && (
                          <Image
                            alt=''
                            src={comment.img}
                            width={100}
                            height={100}
                            className='object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400'
                          />
                        )}
                        <h3 className='font-bold'>
                          {comment.nama ||
                            comment.fullname + ' (' + comment.username + ')'}
                        </h3>{' '}
                      </div>
                      <p className='text-gray-200 mt-2'>
                        {comment.comment_text}
                      </p>{' '}
                    </div>
                  ))
                ) : (
                  <>Loading Data Komentar...</>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
