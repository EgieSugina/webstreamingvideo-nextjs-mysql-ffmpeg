import CommentsForm from '@/components/CommentsForm'
import VideoPlayer from '@/components/VideoPlayer'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'

export default async function Index ({ params }) {
  const session = await getServerSession(authOptions)

  const { id } = params

  return (
    <>
      {/* <div className={'flex'}>
        {' '}
       
        
      </div> */}
      <div class='grid grid-rows-2 grid-flow-col  gap-4'>
        <div className='w-full  flex place-content-center h-[90vh] '>
          <VideoPlayer src={`/hls/${id}/video.m3u8`} />
        </div>
        <div>
          <CommentsForm session={session} VideoID={id} />
        </div>
      </div>
    </>
  )
}
