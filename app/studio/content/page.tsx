import Movie from './movie'
import { Tabs } from '@/components/ui/tabs'

export default function Users () {
  const tabs = [
    {
      title: 'Movie',
      value: 'movie',
      content: <Movie />
    },

    {
      title: 'TV Series',
      value: 'tv-series',
      content: (
        <div className='w-full overflow-hidden relative h-full rounded-2xl  bg-[#212129]  p-4 text-xl md:text-4xl font-bold text-white '>
          <div className='flex gap-2'>TV Series</div>
          Features Belum Tersedia
        </div>
      )
    }
  ]

  return (
    <div className='h-full md:h-full [perspective:1000px]   flex flex-col   w-full  items-start justify-start '>
      <Tabs tabs={tabs} />
    </div>
  )
}
