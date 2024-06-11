import Movie from './movie'
import TVSeries from './tvseries'
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
      content: <TVSeries/>
    }
  ]

  return (
    <div className='h-full md:h-full [perspective:1000px]   flex flex-col   w-full  items-start justify-start '>
      <Tabs tabs={tabs} />
    </div>
  )
}
