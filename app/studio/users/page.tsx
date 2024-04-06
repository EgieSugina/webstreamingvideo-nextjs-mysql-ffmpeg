'use client'

import React, { useEffect, useState, useRef } from 'react'

import { FaUserPlus } from 'react-icons/fa'
import Link from 'next/link'
import Tables from '@/components/TablesUsers'
import { Tabs } from '@/components/ui/tabs'
import findAll from './data'
const columns = [
  { name: 'Name', uid: 'fullname' },
  { name: 'Username', uid: 'username' },
  { name: 'Actions', uid: 'actions' }
]
export default function Users () {
  const [Tab, setTab] = useState<any>([])
  const hasFetchedData = useRef(false)
  useEffect(() => {
    const getData = async () => {
      const data = await findAll()

      setTab([
        {
          title: 'Members',
          value: 'members',
          content: (
            <div className='w-full overflow-hidden relative h-full rounded-2xl  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white '>
              <div className='flex gap-2'>
                Members
                <Link
                  href='users/form'
                  className='flex border px-1 m-2 bg-green-600 rounded shadow-2xl hover:bg-green-950 gap-2  text-medium font-medium items-center'
                >
                  <FaUserPlus /> Add
                </Link>
              </div>

              <div className='mt-3'>
                <Tables
                  Data={data.filter((v: any) => v.role == 'Member')}
                  Columns={columns}
                />
              </div>
            </div>
          )
        },
        {
          title: 'Staff',
          value: 'staff',
          content: (
            <div className='w-full overflow-hidden relative h-full rounded-2xl  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white '>
              <div className='flex gap-2'>
                Staff
                <Link
                  href='users/form'
                  className='flex border px-1 m-2 bg-green-600 rounded shadow-2xl hover:bg-green-950 gap-2  text-medium font-medium items-center'
                >
                  <FaUserPlus /> Add
                </Link>
              </div>

              <Tables
                Data={data.filter((v: any) => v.role == 'Staff')}
                Columns={columns}
              />
            </div>
          )
        },
        {
          title: 'Admin',
          value: 'admin',
          content: (
            <div className='w-full overflow-hidden relative h-full rounded-2xl  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white '>
              <div className='flex gap-2'>
                Admin
                <Link
                  href='users/form'
                  className='flex border px-1 m-2 bg-green-600 rounded shadow-2xl hover:bg-green-950 gap-2  text-medium font-medium items-center'
                >
                  <FaUserPlus /> Add
                </Link>
              </div>
              <Tables
                Data={data.filter((v: any) => v.role == 'Admin')}
                Columns={columns}
              />
            </div>
          )
        }
      ])
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      getData()
    }
  }, [])
  if (Tab.length == 0) {
    return <>Loading...</>
  }

  return (
    <div className='h-full md:h-full [perspective:1000px] relative  flex flex-col    w-full  items-start justify-start '>
      <Tabs tabs={Tab} />
    </div>
  )
}
