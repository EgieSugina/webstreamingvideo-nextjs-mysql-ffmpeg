import CommentsForm from '@/components/CommentsForm'
import VideoPlayer from '@/components/VideoPlayer'

export default function Index ({ params }) {
  const { id } = params

  return (
    <>
      <div className={'flex'}>
        {' '}
        <div className='w-full grow flex place-content-center '>
          <VideoPlayer src={`/hls/${id}/video.m3u8`} />
        </div>
        <CommentsForm />
      </div>
    </>
  )
}
