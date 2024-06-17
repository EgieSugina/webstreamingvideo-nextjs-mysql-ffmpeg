'use client'

import { useRouter } from 'next/navigation'

export default function Delete({ params: { tv_series_id, id } }) {
  const router = useRouter()
  fetch(`/api/episodes/${id}`, {
    method: 'DELETE',
  })
  return router.push(`/studio/content/tvseries/${tv_series_id}`)
}
