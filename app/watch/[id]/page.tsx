import CommentsForm from '@/components/CommentsForm'
import VideoPlayer from '@/components/VideoPlayer'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { getTitle } from './data'

export default async function Index ({ params }) {
  const session = await getServerSession(authOptions)
  const { id } = params
  const { title } = await getTitle(id)

  return (
    <>
      {/* <div className={'flex'}>
        {' '}
       
        
      </div> */}
      <div class='grid grid-rows-3 grid-flow-col gap-4  '>
        <div className='w-full  flex place-content-center h-[90vh] '>
          {/* <VideoPlayer src={`/hls/${id}/video.m3u8`} /> */}
          <VideoPlayer src={`/api/videos/${id}/video.m3u8`} />
        </div>

        <div>
          <CommentsForm session={session} VideoID={id} Title={title} />
        </div>
      </div>
    </>
  )
}
