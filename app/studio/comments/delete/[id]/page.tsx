"use client";

import { useRouter } from "next/navigation";

export default function Delete({ params }) {
  const router = useRouter();
  fetch(`/api/comments/${params.id}`, {
    method: "DELETE"
  });
  return router.push("/studio/comments");
}
