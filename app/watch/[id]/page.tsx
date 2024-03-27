import CommentsForm from '@/components/CommentsForm'
import VideoPlayer from '@/components/VideoPlayer'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'

export default async function Index ({ params }) {
  const session = await getServerSession(authOptions)

  const { id } = params

  return (
    <>
      <div className={'flex'}>
        {' '}
        <div className='w-full grow flex place-content-center '>
          <VideoPlayer src={`/hls/${id}/video.m3u8`} />
        </div>
        <CommentsForm session={session} VideoID={id} />
      </div>
    </>
  )
}
