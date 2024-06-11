'use client'

import { Accordion, AccordionItem, Divider, Link } from '@nextui-org/react'
import {
  getEpisodesBySeason,
  getSeasonBySeries,
  getTVSeriesByid,
  getVideoById,
} from './data'
import React , { useEffect, useState } from 'react'

import Image from 'next/image'

const CardEpisodes = ({ Data, Season }) => {
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
        className=" border-b-1 mx-4 flex items-center gap-4 hover:bg-zinc-800  hover:shadow-2xl hover:scale-105  hover:px-8 text-zinc-300 "
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
          className=" rounded-md  min-h-20 max-h-20 h text-ellipsis text-justify"
          dangerouslySetInnerHTML={{
            __html: Video?.description?.split('</p><p>')[0].replace('<p>', ''),
          }}
        ></div>
      </Link>
    </>
  )
}
function ListEpisodes({ Season }) {
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
            />
          ))
        ) : (
          <p>No episodes available</p>
        )}
      </div>
    </>
  )
}
export default function TVSeriesDetails({ params: { id } }) {

  const [Series, setSeries] = useState({})
  const [Season, setSeason] = useState([])
  useEffect(() => {
    async function getData() {
      const data_series = await getTVSeriesByid(id)
      setSeries(data_series)
    }
    getData()
  }, [id])
  useEffect(() => {
    async function getData(id) {
      const data_season = await getSeasonBySeries(id)
      setSeason(data_season)
    }
    if (Series.series_id) {
      getData(Series.series_id)
    }
  }, [Series])

  const Genre = [
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Horror',
    'Romance',
    'Science Fiction',
    'Thriller',
    'War',
    'Slice of Life',
    'Sports',
  ]

  const itemClasses = {
    // base: 'py-0 w-full bg-zinc-900',
    // title: 'font-normal text-medium',
    trigger: 'px-2 py-0 bg-zinc-800 h-14 flex items-center',
    // indicator: 'text-medium',
    // content: 'text-small px-2 ',
  }
  console.log("Series?.genre",Series?.genre?.slice(","));
  
  return (
    <>
      <div className="w-full flex flex-col items-center ">
        <div className=" bg-zinc-900 container flex gap-4  p-8 border-b-2 border-zinc-600 border-double">
          <div className="row-span-3 w-56 min-w-56  ">
            <Image
              // src="https://cdn.myanimelist.net/images/anime/1015/138006.jpg"
              src={`/api/tvseries/${Series?.series_id}.png`}
              width={225}
              height={318}
              alt="Cover"
            />
          </div>
          <div className="gap-4">
            <div className="text-4xl my-2">{Series?.title}</div>
            <div className=" border-y-1 border-zinc-600 py-2 text-justify">
              {Series?.description}
            </div>
            <div
              id="genre"
              className="flex h-5 items-center space-x-4 text-sm flex-wrap my-2 "
            >
              {Series.genre && Series.genre.includes(",") ? Series.genre.split(", ").map((v, i) => (
                <React.Fragment key={i}>
                  <Link className="text-white" href={`/tvseries?genre=${v}`}>
                    {v}
                  </Link>
                  {i !== Series.genre.split(", ").length - 1 && <Divider orientation="vertical" />}
                </React.Fragment>
              )) : <Link className="text-white" href={`/tvseries?genre=${Series.genre}`}>{Series.genre}</Link>}
            </div>
          </div>
        </div>
        <div className=" bg-zinc-900 container   gap-4  p-8">
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
                    aria-label={`Season ${item.season_number}`}
                    title={`Season ${item.season_number}`}
                    subtitle={
                      <p className="flex">{`${item.total_episode} Episodes`}</p>
                    }
                  >
                    <ListEpisodes Season={item} />
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
      </div>
    </>
  )
}
