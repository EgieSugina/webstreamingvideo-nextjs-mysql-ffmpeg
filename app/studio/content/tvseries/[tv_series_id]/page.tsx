'use client'
import Image from 'next/image'
import {
  findByPk,
  getSeasonBySeries,
  getEpisodesBySeason,
  getVideoById,
} from './data'
import { Tooltip, Button } from '@nextui-org/react'
import React, { useState, useRef, useEffect } from 'react'
import {
  Accordion,
  AccordionItem,
  Divider,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever, MdFormatListBulletedAdd } from 'react-icons/md'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

export default function TvSeriesSeason({ params: { tv_series_id } }) {
  const [data, setData] = useState({})
  const [season, setSeason] = useState([])
  const hasFetchedData = useRef(false)
  const hasFetchedDataSeason = useRef(false)

  useEffect(() => {
    const getData = async () => {
      const data = await findByPk(tv_series_id)
      console.log(data)
      setData(data)
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      getData()
    }
  }, [tv_series_id])

  useEffect(() => {
    const getSeasonData = async () => {
      const seasonData = await getSeasonBySeries(tv_series_id)
      setSeason(seasonData)
    }
    if (!hasFetchedDataSeason.current) {
      hasFetchedDataSeason.current = true
      getSeasonData()
    }
  }, [tv_series_id])

  const itemClasses = {
    trigger: 'px-2 py-0 bg-zinc-800 h-14 flex items-center',
  }
  const MenuAccordion = ({ indicator, isOpen, isDisabled }) => {
    return (
      <>
        <Tooltip content="Edit Season">
          <span className="text-lg text-yellow-600 cursor-pointer active:opacity-50">
            <CiEdit className="text-2xl" />
          </span>
        </Tooltip>

        <Tooltip content="Add Episode">
          <span className="text-lg text-sky-600 cursor-pointer active:opacity-50">
            <MdFormatListBulletedAdd className="text-2xl" />
          </span>
        </Tooltip>
      </>
    )
  }
  return (
    <>
      <div className="container flex gap-4  p-8 border-b-2 border-zinc-600 border-double text-zinc-300">
        <div className="row-span-3 w-56 min-w-56  ">
          {data.series_id && (
            <Image
              src={`/api/tvseries/${data.series_id}.png`}
              width={225}
              height={318}
              alt="Cover"
            />
          )}
        </div>
        <div className="gap-4">
          {data.title && (
            <div className="text-4xl my-2 flex items-center gap-2">
              {data.title}
              <Tooltip color="success" content="Public">
                <span className="text-lg  cursor-pointer active:opacity-50">
                  <FaRegEye className="text-2xl text-green-600" />
                </span>
              </Tooltip>
              <Tooltip content="Edit TV Series">
                <span className="text-lg text-yellow-600 cursor-pointer active:opacity-50">
                  <CiEdit className="text-2xl" />
                </span>
              </Tooltip>

              <Tooltip color="danger" content="Delete TV Series">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <MdDeleteForever className="text-2xl" />
                </span>
              </Tooltip>
            </div>
          )}
          {data.description && (
            <div className=" border-y-1 border-zinc-600 py-2 text-justify">
              <p
                className="text-justify text-medium"
                dangerouslySetInnerHTML={{
                  __html: data.description
                    .split('</p><p>')[0]
                    .replace('<p>', ''),
                }}
              ></p>
            </div>
          )}
          {data.genre && (
            <div
              id="genre"
              className="flex h-5 items-center space-x-4 text-sm flex-wrap my-2 "
            >
              {data.genre.includes(',') ? (
                data.genre.split(', ').map((v, i) => (
                  <React.Fragment key={i}>
                    <Link className="text-white" href={`/tvseries?genre=${v}`}>
                      {v}
                    </Link>
                    {i !== data.genre.split(', ').length - 1 && (
                      <Divider orientation="vertical" />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <Link
                  className="text-white"
                  href={`/tvseries?genre=${data.genre}`}
                >
                  {data.genre}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className=" container   gap-4  p-8">
        <h2 className="mb-2 text-xl font-semibold text-zinc-200 flex gap-3 items-center ">
          <div>Seasons </div>
          <div>
            <FormSeason Status={"New"}/>
          </div>
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
            {season && season.length > 0 ? (
              season.map((item, index) => (
                <AccordionItem
                  key={index}
                  aria-label={`Season ${item.season_number}`}
                  title={
                    <p className="flex items-center gap-2">
                      Season {item.season_number} <MenuAccordion />
                    </p>
                  }
                  subtitle={
                    <p className="flex">{`${item.total_episode} Episodes`}</p>
                  }
                  // indicator={MenuAccordion}
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
    </>
  )
}
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
        className=" border-b-1 mx-4 flex items-center gap-4  text-zinc-300 "
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
        <div className=" min-w-48 border-r-2 py-4">{Video.genre}</div>
        <div
          className="  truncate border-r-2 py-4   max-h-20 h  "
          dangerouslySetInnerHTML={{
            __html: Video?.description?.split('</p><p>')[0].replace('<p>', ''),
          }}
        ></div>
        <div className="flex gap-2">
          <Tooltip color="success" content="Public">
            <span className="text-lg  cursor-pointer active:opacity-50">
              <FaRegEye className="text-2xl text-green-600" />
            </span>
          </Tooltip>
          <Tooltip content="Edit Episode">
            <span className="text-lg text-yellow-600 cursor-pointer active:opacity-50">
              <CiEdit className="text-2xl" />
            </span>
          </Tooltip>

          <Tooltip color="danger" content="Delete Episode">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <MdDeleteForever className="text-2xl" />
            </span>
          </Tooltip>
        </div>
      </Link>
    </>
  )
}
const ListEpisodes = ({ Season }) => {
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
const FormSeason = ({ Status }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button
        size="sm"
        variant="light"
        color="primary"
        className="text-sky-600 font-semibold"
        onPress={onOpen}
      >
        <Tooltip color="info" content="Add Season">
          <span className="text-lg  cursor-pointer active:opacity-50">
            <MdFormatListBulletedAdd className="text-2xl " />
          </span>
        </Tooltip>
        Add Seasons
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={true}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {Status} Season
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
