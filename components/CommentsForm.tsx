'use client'

import { Button } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

export default function CommentsForm ({ session }) {
  const [Comments, setComments] = React.useState([])
  async function onSubmit (event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {}
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    data['nama'] = "Egie Sugina"
    
    setComments([...Comments, data])
  }
  return (
    <>
      <div className='w-full   p-2  mt-3'>
        <h3 className='font-bold'>Discussion</h3>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col'>
            {Comments.length > 0 && <>
              <div className='bg-content1 border rounded-md p-3 ml-3 my-3'>
              <div className='flex gap-3 items-center'>
                <Image
                  alt=''
                  src='/assets/images/profile.jpg'
                  width={100}
                  height={100}
                  className='object-cover w-8 h-8 rounded-full border-2 border-emerald-400  shadow-emerald-400 '
                />
                <h3 className='font-bold'>{Comments.nama}</h3>
              </div>
              <p className='text-gray-600 mt-2'>{Comments.body}</p>
            </div>
            </>}
           
            
          </div>
          <div className='w-full px-3 my-2'>
            <textarea
              className='bg-gray-100 rounded text-black border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3  placeholder-gray-700 focus:outline-none focus:bg-white'
              name='body'
              placeholder='Type Your Comment'
              required
            ></textarea>
          </div>
          <div className='w-full flex justify-end px-3'>
            <Button type='submit' color='success' radius='sm'>
              Post Comment
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
