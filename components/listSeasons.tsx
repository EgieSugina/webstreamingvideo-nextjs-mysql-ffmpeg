'use client'

import { Accordion, AccordionItem, Link } from '@nextui-org/react'
import {
  getEpisodesBySeason,
  getSeasonBySeries,
  getTVSeriesByid,
  getTVSeriesWithSeasonsAndEpisodes,
  getVideoById,
} from '@/app/tvseries/[id]/data'
import { useEffect, useState } from 'react'

import Image from 'next/image'

const CardEpisodes = ({ Data, Season, VideoID }) => {
  const { episode_number, video_id } = Data
  const [Video, setVideo] = useState([])
  useEffect(() => {
    async function getData(id) {
      const data_episode = await getVideoById(id)

      setVideo(data_episode)
    }

    if (video_id) {
      getData(video_id)
    }
  }, [video_id])
  return (
    <>
      <Link
        href={`/watch/${video_id}`}
        className={` border-b-1 mx-4 flex items-center gap-4 hover:bg-zinc-800  hover:shadow-2xl hover:scale-105  hover:px-8 ${
          VideoID === video_id ? 'bg-zinc-800 text-green-400' : 'text-zinc-300'
        } `}
      >
        <div className="min-w-28">
          <Image
            width={120}
            height={60}
            quality={100}
            src={`/api/videos/${video_id}/thumbnail.png`}
            alt={video_id}
          />
        </div>
        <div className="border-r-2 p-4 min-w-32">
          Episode {Season}-{episode_number}
        </div>

        <div className=" min-w-48 border-r-2 py-4">{Video.title}</div>
        <div
          className=" rounded-md  min-h-20 max-h-20 h text-ellipsis text-justify pr-2"
          dangerouslySetInnerHTML={{
            __html: Video?.description?.split('</p><p>')[0].replace('<p>', ''),
          }}
        ></div>
      </Link>
    </>
  )
}
function ListEpisodes({ Season, VideoID }) {
  const [Episode, setEpisode] = useState([])

  useEffect(() => {
    async function getData(id) {
      const data_episode = await getEpisodesBySeason(id)

      setEpisode(data_episode)
    }

    if (Season.season_id) {
      getData(Season.season_id)
    }
  }, [Season])
  return (
    <>
      <div className=" flex flex-col overflow-hidden">
        {Episode && Episode.length > 0 ? (
          Episode.map((episode, index) => (
            <CardEpisodes
              key={index}
              Data={episode}
              Season={Season.season_number}
              VideoID={VideoID}
            />
          ))
        ) : (
          <p>No episodes available</p>
        )}
      </div>
    </>
  )
}
export default function ListSeasons({ id }) {
  const [Series, setSeries] = useState({})
  const [Season, setSeason] = useState([])
  useEffect(() => {
    async function getData() {
      const data_joins = await getTVSeriesWithSeasonsAndEpisodes(id)
      const data_series = await getTVSeriesByid(data_joins)
      
      setSeries(data_series)
    }
    getData()
  }, [id])
  useEffect(() => {
    async function getData(id) {
      const data_season = await getSeasonBySeries(id)
      setSeason(data_season)
    }
    if (Series && Series.series_id) {
      getData(Series.series_id)
    }
  }, [Series])

  // const Genre = [
  //   'Documentary',
  //   'Drama',
  //   'Family',
  //   'Fantasy',
  //   'Horror',
  //   'Romance',
  //   'Science Fiction',
  //   'Thriller',
  //   'War',
  //   'Slice of Life',
  //   'Sports',
  // ]

  const itemClasses = {
    trigger: 'px-2 py-0 bg-zinc-800 h-14 flex items-center',
  }
  return (
    <>
      {Series && Object.keys(Series).length > 0 &&
      (
        <>
          {' '}
          <div className=" bg-zinc-900 rounded-md   gap-4  p-2">
            <h2 className="mb-2 text-xl font-semibold text-zinc-200">
              Seasons and episodes
            </h2>
            <div>
              <Accordion
                defaultExpandedKeys={['0']}
                itemClasses={itemClasses}
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      height: 'auto',
                      transition: {
                        height: {
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                          duration: 1,
                        },
                        opacity: {
                          easings: 'ease',
                          duration: 1,
                        },
                      },
                    },
                    exit: {
                      y: -10,
                      opacity: 0,
                      height: 0,
                      transition: {
                        height: {
                          easings: 'ease',
                          duration: 0.25,
                        },
                        opacity: {
                          easings: 'ease',
                          duration: 0.3,
                        },
                      },
                    },
                  },
                }}
              >
                {Season && Season.length > 0 ? (
                  Season.map((item, index) => (
                    <AccordionItem
                      key={index}
                      aria-label={`${Series?.title} - Season ${item.season_number}`}
                      title={`${Series?.title} - Season ${item.season_number}`}
                      subtitle={
                        <p className="flex">{`${item.total_episode} Episodes`}</p>
                      }
                    >
                      <ListEpisodes Season={item} VideoID={id} />
                    </AccordionItem>
                  ))
                ) : (
                  <AccordionItem
                    key={1}
                    aria-label={`Loading...`}
                    title={`Loading...`}
                  ></AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </>
      )}
    </>
  )
}
