"use client";

import { useRouter } from "next/navigation";

export default function Delete({ params }) {
  const router = useRouter();
  fetch(`/api/users/${params.id}`, {
    method: "DELETE"
  });
  return router.push("/studio/users");
}
