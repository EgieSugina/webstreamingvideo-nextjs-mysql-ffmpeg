'use client'

import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from '@nextui-org/react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

import { CiEdit } from 'react-icons/ci'
import Image from 'next/image'
import Link from 'next/link'
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import { contentVisibelity } from '@/app/studio/content/data'

const statusColorMap = {
  done: 'success',
  raw: 'danger',
  failed: 'danger',
  process: 'warning'
}
function Action ({ data }) {
  // const router = useRouter();
  const [Public, setPublic] = React.useState(data.public)
  return (
    <>
      <div className='relative flex items-center gap-2'>
        {/* <Link
          href=''
          onClick={async () => {
            await contentVisibelity(data.id, !Public)
            // router.push(`/studio/content?id=${data.id}`);
            // router.refresh();
            return setPublic(!Public)
          }}
        > */}
          {Public ? (
            <Tooltip color='success' content='Public'>
              <span className='text-lg  cursor-pointer active:opacity-50'>
                <FaRegEye className='text-2xl text-green-900' />
              </span>
            </Tooltip>
          ) : (
            <Tooltip color='danger' content='Private'>
              <span className='text-lg  cursor-pointer active:opacity-50'>
                <FaRegEyeSlash className='text-2xl text-red-900' />
              </span>
            </Tooltip>
          )}
        {/* </Link> */}
        |
        {/* <Link href={`/studio/content/form/${data.id}`}> */}
          <Tooltip content='Edit data' color='warning'>
            <span className='text-lg text-warning cursor-pointer active:opacity-50'>
              <CiEdit className='text-2xl' />
            </span>
          </Tooltip>
        {/* </Link> */}
        |
        {/* <Link href={`/studio/content/delete/${data.id}`}> */}
          <Tooltip color='danger' content='Delete data'>
            <span className='text-lg text-danger cursor-pointer active:opacity-50'>
              <MdDeleteForever className='text-2xl' />
            </span>
          </Tooltip>
        {/* </Link> */}
      </div>
    </>
  )
}
export default function Tables ({ Data, Columns = [] }) {
  const rowsPerPage = 6
  const [page, setPage] = React.useState(1)

  const DataMod = Data//.map(v => ({ ...v, id: v.video_id }))
  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey]

    // const showRef = React.useRef(0);
    console.log("data",data);
    
    switch (columnKey) {
      case 'thumbnail':
        return (
          <Image
            src={`/api/videos/${data['seasons.episodes.video_id']}/thumbnail.png`}
            width={150}
            height={150}
            alt='thumbnail...'
          />
        )
      case 'thumbnailtvseries':
        return (
          <Image
            src={`/api/tvseries/${data.series_id}.png`}
            width={112}
            height={159}
            alt='thumbnail...'
          />
        )
      case 'seasons.episodes.video.description':
        return <div dangerouslySetInnerHTML={{ __html: data['seasons.episodes.video.description'] }} />
      case 'status':
        return (
          <Chip
            className='capitalize'
            color={statusColorMap[data.status]}
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        )
      case 'actions':
        return <Action data={data} />
      default:
        return cellValue
    }
  }, [])
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return DataMod.slice(start, end)
  }, [page, DataMod])
  if (!Data) return <>No Data</>
  const pages = Math.ceil(DataMod.length / rowsPerPage)
  return (
    <Table
      isHeaderSticky
      aria-label='Example table with client side pagination'
      classNames={{
        base: 'max-h-[42rem] overflow-y-visible',
        table: 'min-h-[42rem]'
        //  wrapper: "min-h-[222px]"
      }}
      bottomContent={
        <div className='flex w-full justify-center '>
          <Pagination
            isCompact
            showControls
            showShadow
            color='secondary'
            page={page}
            total={pages}
            onChange={page => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={Columns}>
        {column => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item: any) => (
          <TableRow key={item.name}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
