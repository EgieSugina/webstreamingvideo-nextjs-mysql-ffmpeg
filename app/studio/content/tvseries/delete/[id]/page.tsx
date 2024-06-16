'use client'

import { useRouter } from 'next/navigation'

export default function Delete({ params }) {
  const router = useRouter()
  fetch(`/api/tvseries/${params.id}`, {
    method: 'DELETE',
  })
  return router.push('/studio/content')
}
