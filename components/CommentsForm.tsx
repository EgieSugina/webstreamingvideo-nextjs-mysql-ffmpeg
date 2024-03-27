'use client'

import { Button, Textarea } from '@nextui-org/react'

import { FaPlus } from 'react-icons/fa6'
import Image from 'next/image'
import { Likes } from './buttons.component'
import { LuSend } from 'react-icons/lu'
import React from 'react'

export default function CommentsForm ({ session, VideoID }) {
  const [comments, setComments] = React.useState([])
  const formRef = React.useRef(null)
  async function onSubmit (event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {}
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    data['nama'] = session.user.name;
    data['user_id'] = session.user.id;

    setComments([...comments, data])
    formRef.current.reset()
  }

  return (
    <>
      <div className='w-full  mr-3 mt-4 glass '>
        <h3 className='font-bold p-2'>Discussion</h3>
        <form ref={formRef} onSubmit={onSubmit}>
          <div className='flex flex-col min-h-[43.5rem] max-h-[43.5rem] overflow-y-auto'>
            {comments.map(
              (
                comment,
                index // Map through comments array
              ) => (
                <div
                  key={index}
                  className='glass  p-3  border-b-1 border-white'
                >
                  <div className='flex gap-3 items-center'>
                    <Image
                      alt=''
                      src='/assets/images/profile.jpg'
                      width={100}
                      height={100}
                      className='object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400'
                    />
                    <h3 className='font-bold'>{comment.nama}</h3>{' '}
                    {/* Access 'nama' from comment object */}
                  </div>
                  <p className='text-gray-200 mt-2'>{comment.body}</p>{' '}
                  {/* Access 'body' from comment object */}
                </div>
              )
            )}
          </div>
          <div className='w-full px-3 my-2'>
            <Textarea
              isRequired
              // label='Description'
              labelPlacement='outside'
              placeholder='Type Your Comment'
              className='max-w-xs'
              name='body'
              variant='underlined'
            />
          </div>
          <div className='w-full flex justify-between  pb-2 gap-2 px-3'>
            <Likes />
            <Button
              type='submit'
              color='secondary'
              variant='bordered'
              radius='sm'
              className='font-semibold rounded-none'
            >
              <FaPlus /> My List
            </Button>
            <Button
              type='submit'
              color='success'
              radius='sm'
              className='font-semibold rounded-none'
            >
              Send <LuSend />
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
