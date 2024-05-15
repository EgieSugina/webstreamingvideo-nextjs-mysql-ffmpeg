import React, { useEffect, useRef } from 'react'
import { getDescriptionVideo } from './Actions'
function formatDate(date) {
  const now = new Date()
  const diff = now - date
  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}
export default function DescriptionVideo({ VideoID }) {
  const [Desc, setDesc] = React.useState(null)
  const hasFetchedData = useRef(false)

  useEffect(() => {
    const getData = async () => {
      const data = await getDescriptionVideo(VideoID)
      console.log(VideoID, data)
      setDesc(data)
    }
    if (!hasFetchedData.current) {
      hasFetchedData.current = true
      getData()
    }
  }, [VideoID])
  if (!Desc) return null
  return (
    <>
      <div className=" bg-zinc-800 p-4 rounded-xl my-4">
        <div className="font-bold">
          {Desc?.views} views {formatDate(Desc?.upload_date)}
        </div>
        <p
          className="text-justif text-medium"
          dangerouslySetInnerHTML={{
            __html: Desc?.description.split('</p><p>')[0].replace('<p>', ''),
          }}
        ></p>
      </div>
    </>
  )
}
