"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { disableDraftMode } from "@/app/actions"
import { useDraftModeEnvironment } from "next-sanity/hooks"

export function PreviewBar() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const environment = useDraftModeEnvironment()

  if (environment !== "live" && environment !== "unknown") {
    return null
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode()
      router.refresh()
    })

  return (
    <div className="fixed top-0 left-0 right-0 z-[999999] bg-yellow-400 border-b-2 border-yellow-600 px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-900">
      <div className="flex items-center gap-2">
        <span className="font-bold">Preview Mode</span>
        <span className="text-gray-700">You are viewing draft content</span>
      </div>
      <button
        type="button"
        onClick={disable}
        disabled={pending}
        className="px-4 py-1.5 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs font-semibold"
      >
        {pending ? "Disabling..." : "Exit Preview"}
      </button>
    </div>
  )
}
