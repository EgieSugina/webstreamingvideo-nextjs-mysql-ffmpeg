'use client'
import 'react-quill/dist/quill.snow.css'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useMemo, useState, useEffect } from 'react'
import { FormEvent } from 'react'
import dynamic from 'next/dynamic'
import { navigate } from '@/components/Actions'
import { toast } from 'react-toastify'
import { UpdateTVSeries, findByPk } from './data'
import MsgBox from '@/components/ToastMsgBox'

export default function TVSeriesForm({ params }) {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )
  const { id_tvseries } = params
  const variant = 'underlined'
  const [data, setData] = useState(null)
  const [value, setValue] = useState('')
  const [ValuesSelect, setValuesSelect] = useState(new Set())
  const handleSelectionChange = (e) => {
    setValuesSelect(new Set(e.target.value.split(',')))
  }

  useEffect(() => {
    const getData = async () => {
      const data = await findByPk(id_tvseries)
      setData(data)
      setValue(data.description)
      setValuesSelect(new Set(data.genre.split(',')))
    }
    getData()
  }, [id_tvseries])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await UpdateTVSeries(formData, id_tvseries)
    if (!response.success) {
      toast.error(<MsgBox MsgError={response.message} />, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        // transition: Bounce
      })
    } else {
      toast.success(response.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        // transition: Bounce
      })

      return navigate(`/studio/content/tvseries/${response.data.series_id}`)
    }
  }

  if (!data) {
    return <>Loading...</>
  }
  const Genres = data.genre.split(',').map((v) => v.trimStart())
  console.log(Genres)

  return (
    <>
      <form onSubmit={onSubmit} className={'flex bg-[#212129] '}>
        <div className=" w-full   p-3  rounded-lg">
          <h1 className="font-bold text-2xl text-white">Edit TV Series - {id_tvseries}</h1>
          <hr className="mb-3" />
          <input name={'description'} type="text" value={value} hidden />
          <input
            name={'genre'}
            type="text"
            value={Array.from(ValuesSelect).join(', ')}
            hidden
          />
          <input name={'id'} type="hidden" value={id_tvseries} />
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                isRequired
                name={'title'}
                type="text"
                variant={variant}
                label="Title"
                defaultValue={data.title}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input
                isRequired
                name={'cover_file'}
                accept=".png"
                type="file"
                variant={variant}
                labelPlacement="outside"
                label="Cover TV Series"
                placeholder="Cover TV Series"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            {/* <div className="w-full md:w-1/2 px-3">
              <Select
                items={[
                  {
                    label: 'TV Series',
                    value: 'tv_series',
                  },
                ]}
                isRequired
                name={'type'}
                label="Type"
                defaultSelectedKeys={['tv_series']}
                variant={variant}
              >
                {(x) => <SelectItem key={x.value}>{x.label}</SelectItem>}
              </Select>
            </div> */}
            <div className="w-full md:w-1/2 px-3">
              <Select
                onChange={handleSelectionChange}
                items={[
                  {
                    label: 'Action',
                    value: 'Action',
                  },
                  {
                    label: 'Adventure',
                    value: 'Adventure',
                  },
                  {
                    label: 'Animation',
                    value: 'Animation',
                  },
                  {
                    label: 'Comedy',
                    value: 'Comedy',
                  },
                  {
                    label: 'Crime',
                    value: 'Crime',
                  },
                  {
                    label: 'Documentary',
                    value: 'Documentary',
                  },
                  {
                    label: 'Drama',
                    value: 'Drama',
                  },
                  {
                    label: 'Family',
                    value: 'Family',
                  },
                  {
                    label: 'Fantasy',
                    value: 'Fantasy',
                  },
                  {
                    label: 'Horror',
                    value: 'Horror',
                  },
                  {
                    label: 'Mystery',
                    value: 'Mystery',
                  },
                  {
                    label: 'Romance',
                    value: 'Romance',
                  },
                  {
                    label: 'Science Fiction',
                    value: 'Science Fiction',
                  },
                  {
                    label: 'Thriller',
                    value: 'Thriller',
                  },
                  {
                    label: 'War',
                    value: 'War',
                  },
                  {
                    label: 'Slice of Life',
                    value: 'Slice of Life',
                  },
                  {
                    label: 'Sports',
                    value: 'Sports',
                  },
                ]}
                isRequired
                label="Genre"
                selectionMode="multiple"
                variant={variant}
                defaultSelectedKeys={Genres}
                value={Array.from(ValuesSelect).join(', ')}
              >
                {(x) => <SelectItem key={x.value}>{x.label}</SelectItem>}
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6   h-80">
              <div className={'bg-white h-[18.6rem]'}>
                <ReactQuill
                  theme="snow"
                  className={'bg-white h-64'}
                  value={value}
                  onChange={setValue}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 place-content-end">
            <Button type="submit" color="success" radius="sm">
              Update
            </Button>
            <Button radius="sm">Back</Button>
          </div>
        </div>
      </form>
    </>
  )
}
