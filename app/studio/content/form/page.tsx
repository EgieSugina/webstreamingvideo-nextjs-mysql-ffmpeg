'use client'
import 'react-quill/dist/quill.snow.css'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import axios from 'axios'
import { FormEvent } from 'react'
import MsgBox from '@/components/ToastMsgBox'
import dynamic from 'next/dynamic'
import { navigate } from '@/components/Actions'
import { toast } from 'react-toastify'
// import ReactQuill from "react-quill";
export default function FormUsers() {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )
  const variant = 'underlined' //["flat", "bordered", "underlined", "faded"];
  const [value, setValue] = useState('Deskripsi....')
  const [ProgressUpload, setProgressUpload] = useState(0)
  const [ValuesSelect, setValuesSelect] = useState([])
  const handleSelectionChange = (e) => {
    setValuesSelect(new Set(e.target.value.split(',')))
  }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      // formData.append("files", fileInput.files[0]);
      const config = {
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          )
          setProgressUpload(percentCompleted)
        },
      }
      const response = await axios.post('/api/content', formData, config)

      if (response.status !== 200) {
        toast.error(<MsgBox MsgError={response.data} />, {
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
        toast.success('Upload Video Success!', {
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
        return navigate(`/studio/content/form/${response.data.video_id}`)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred during the upload.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }
  // SELECT  `user_id`, ``, `description`, `duration`, `status`, `release_date`, `upload_date`, `type` FROM `videos` WHERE 1
  return (
    <>
      <form onSubmit={onSubmit} className={'flex bg-[#212129] '}>
        <div className=" w-full   p-3  rounded-lg">
          <h1 className="font-bold text-2xl text-white">Video Content</h1>
          <hr className="mb-3" />
          <input name={'description'} type="text" value={value} hidden />
          <input
            name={'genre'}
            type="text"
            value={Array.from(ValuesSelect).join(', ')}
            hidden
          />
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                isRequired
                name={'title'}
                type="text"
                variant={variant}
                label="Title"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input
                // isRequired
                name={'video_file'}
                accept="video/mp4,video/x-m4v,video/*,.mkv"
                type="file"
                variant={variant}
                // onChange={handleFileChange}
                // label="File"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <Select
                items={[
                  {
                    label: 'Movie',
                    value: 'movie',
                  },
                ]}
                isRequired
                name={'type'}
                label="Type"
                // type="text"
                variant={variant}
              >
                {(x) => <SelectItem key={x.value}>{x.label}</SelectItem>}
              </Select>
            </div>
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
                // name={"genre"}
                label="Genre"
                selectionMode="multiple"
                // type="text"
                variant={variant}
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
            <Button
              type="submit"
              color={ProgressUpload === 100 ? 'success' : 'primary'}
              radius="sm"
              isLoading={ProgressUpload > 0 && ProgressUpload < 100}
            >
              {ProgressUpload === 100
                ? 'Done'
                : ProgressUpload === 0
                ? 'Simpan'
                : `${ProgressUpload}% Uploading...`}
            </Button>
            <Button radius="sm">Back</Button>
          </div>
        </div>
      </form>
    </>
  )
}
