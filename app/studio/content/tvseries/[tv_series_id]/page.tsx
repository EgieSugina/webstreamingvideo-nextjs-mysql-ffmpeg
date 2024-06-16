'use client'
import Image from 'next/image'
import {
  findByPk,
  getSeasonBySeries,
  getEpisodesBySeason,
  getVideoById,
  getSeasonById,
  createSeason,
  updateSeason,
  deleteSeason,
} from './data'
import { contentVisibelityTVSeries } from '../../data'

import { Tooltip, Button } from '@nextui-org/react'
import React, { useState, useRef, useEffect } from 'react'
import {
  Accordion,
  AccordionItem,
  Divider,
  Link,
  Modal,
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Code,
} from '@nextui-org/react'
import { FaTrashCanArrowUp } from 'react-icons/fa6'
import { LuSaveAll } from 'react-icons/lu'
import { IoReturnDownBack } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever, MdFormatListBulletedAdd } from 'react-icons/md'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
export default function TvSeriesSeason({ params: { tv_series_id } }) {
  const [data, setData] = useState({})
  const [season, setSeason] = useState([])
  const hasFetchedData = useRef(false)
  const hasFetchedDataSeason = useRef(false)

  useEffect(() => {
    const getData = async () => {
      const data = await findByPk(tv_series_id)
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
  if (!data) {
    return <>Loading...</>
  }
  const MenuAccordion = ({ SeasonID, SeriesID }) => {
    return (
      <>
        <FormSeason SeriesID={SeriesID} Status={'Edit'} SeasonID={SeasonID} />

        <Tooltip content="Add Episode">
          <span className="text-lg text-sky-600 cursor-pointer active:opacity-50">
            <MdFormatListBulletedAdd className="text-2xl" />
          </span>
        </Tooltip>
      </>
    )
  }
  const [Public, setPublic] = React.useState(data.public)

  return (
    <>
      <div className="container flex gap-4  p-8 border-b-2 border-zinc-600 border-double text-zinc-300  ">
        <div className="row-span-3 w-56 min-w-56  ">
          {data && data.series_id && (
            <Image
              src={`/api/tvseries/${data.series_id}.png`}
              width={225}
              height={318}
              alt="Cover"
            />
          )}
        </div>
        <div className="gap-4">
          {data && data.title && (
            <div className="text-4xl my-2 flex items-center gap-2">
              {data.title}

              <Button
                isIconOnly
                className="px-0 border-none"
                size="sm"
                variant="ghost"
                onClick={async () => {
                  await contentVisibelityTVSeries(data.series_id, !Public)
                  // router.push(`/studio/content?id=${data.series_id}`);
                  // router.refresh();
                  return setPublic(!Public)
                }}
              >
                {Public ? (
                  <Tooltip color="success" content="Public">
                    <span className="text-lg  cursor-pointer active:opacity-50">
                      <FaRegEye className="text-2xl text-green-700" />
                    </span>
                  </Tooltip>
                ) : (
                  <Tooltip color="danger" content="Private">
                    <span className="text-lg  cursor-pointer active:opacity-50">
                      <FaRegEyeSlash className="text-2xl text-red-900" />
                    </span>
                  </Tooltip>
                )}
              </Button>
              <Button
                isIconOnly
                className="px-0 border-none"
                size="sm"
                variant="ghost"
              >
                <Link href={`/studio/content/tvseries/form/${data.series_id}`}>
                  <Tooltip content="Edit data" color="warning">
                    <span className="text-lg text-warning cursor-pointer active:opacity-50">
                      <CiEdit className="text-2xl" />
                    </span>
                  </Tooltip>
                </Link>
              </Button>
              <Button
                isIconOnly
                className="px-0 border-none"
                size="sm"
                variant="ghost"
              >
                <Link
                  href={`/studio/content/tvseries/delete/${data.series_id}`}
                >
                  <Tooltip color="danger" content="Delete data">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <MdDeleteForever className="text-2xl" />
                    </span>
                  </Tooltip>
                </Link>
              </Button>
            </div>
          )}
          {data && data.description && (
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
          {data && data.genre && (
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
            <FormSeason SeriesID={tv_series_id} Status={'New'} />
          </div>
        </h2>
        <div className=" bg-zinc-800">
          <Accordion
            defaultExpandedKeys={[season.length - 1 || '0']}
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
                      Season {item.season_number}{' '}
                      <MenuAccordion
                        SeasonID={item.season_id}
                        SeriesID={tv_series_id}
                      />
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
                aria-label={`No Seasons available`}
                title={`No Seasons available`}
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
      <div
        // href={`/watch/${video_id}`}
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
      </div>
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
          <p className="text-white">No episodes available</p>
        )}
      </div>
    </>
  )
}
const FormSeason = ({ Status, SeriesID, SeasonID = null }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [seasonToDelete, setSeasonToDelete] = useState(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [season, setSeason] = useState('')
  const [totalEpisode, setTotalEpisode] = useState('')

  useEffect(() => {
    async function getData(id) {
      const _season = await getSeasonById(id)
      console.log(_season)

      setSeason(_season.season_number)
      setTotalEpisode(_season.total_episode)
    }
    if (SeasonID && isOpen) {
      getData(SeasonID)
    }
  }, [SeasonID, isOpen])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      season_number: season,
      total_episode: totalEpisode,
      series_id: SeriesID,
    }
    try {
      let _result
      if (Status == 'New') {
        _result = await createSeason(formData)
      } else if (Status == 'Edit') {
        _result = await updateSeason(SeasonID, formData)
      }
      console.log(_result, formData)
      onOpenChange(false) // Close the modal after successful creation
      window.location.reload() // Replace router.refresh() with window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    setSeasonToDelete(SeasonID)
    setConfirmOpen(true)
  }
  const onDelete = async (seasonToDelete) => {
    await deleteSeason(seasonToDelete)
    window.location.reload()
  }
  const onClose = () => {
    onOpenChange(false)
    setSeason('')
    setTotalEpisode('')
  }
  const Title = Status == 'New' ? 'Add' : 'Edit'
  return (
    <>
      <Button
        size="sm"
        variant="light"
        color="primary"
        className="text-sky-600 font-semibold"
        onPress={onOpen}
      >
        {Status == 'New' ? (
          <>
            <Tooltip color="info" content="New Season">
              <span className="text-lg  cursor-pointer active:opacity-50">
                <MdFormatListBulletedAdd className="text-2xl " />
              </span>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip content="Edit Season">
              <span className="text-lg text-yellow-600 cursor-pointer active:opacity-50">
                <CiEdit className="text-2xl" />
              </span>
            </Tooltip>
          </>
        )}
      </Button>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this season?"
        SeasonID={SeasonID}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={true}
        isKeyboardDismissDisabled={true}
        onClose={onClose}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex gap-2 justify-between ">
            {Title} Season
            {SeasonID && (
              <>
                <Code className="mr-4">
                  ID {SeasonID}-{SeriesID}
                </Code>
              </>
            )}
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Input
                type="number"
                label="Season"
                labelPlacement={'outside'}
                value={season}
                onChange={(event) => setSeason(event.target.value)}
                required
              />
              <Input
                type="number"
                label="Total Episode"
                labelPlacement={'outside'}
                value={totalEpisode}
                onChange={(event) => setTotalEpisode(event.target.value)}
                required
              />

              <ModalFooter className="flex justify-between">
                {Status == 'Edit' && (
                  <Button
                    color="danger"
                    variant="bordered"
                    startContent={<FaTrashCanArrowUp />}
                    type="button"
                    onPress={handleDelete}
                  >
                    Delete
                  </Button>
                )}
                {/* <div
                  className={`flex gap-2 ${
                    Status !== 'Edit' && 'justify-between'
                  }`}
                > */}
                <Button
                  color="primary"
                  variant="light"
                  type="button"
                  startContent={<IoReturnDownBack />}
                  onPress={onClose}
                >
                  Cancel
                </Button>

                <Button
                  color="primary"
                  type="submit"
                  startContent={<LuSaveAll />}
                >
                  Save
                </Button>
                {/* </div> */}
              </ModalFooter>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  SeasonID,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>

        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            type="button"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="button"
            onPress={() => onConfirm(SeasonID)}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
