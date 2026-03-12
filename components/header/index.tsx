'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { headerQuery } from '@/sanity/queries/components/page-nav-query'
import Route from '@/components/route'
import { BaseRouteType } from '@/types/objects/route-type'

export default function Header() {
  const [navigation, setNavigation] = useState<{ items?: BaseRouteType[] } | null>(null)

  useEffect(() => {
    client.fetch(headerQuery).then(setNavigation)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-background px-5">
      <div className="flex h-16 items-center justify-between">
        <Link href="/">
          <h1
            className="text-2xl font-bold tracking-[-0.25rem] leading-none p-0 lg:text-3xl"
            title="Wiggelrhum"
          >
            Wiggelrhum
          </h1>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {navigation?.items?.map((item, i) => (
            <Route key={i} data={item} className="text-sm font-medium hover:opacity-80">
              {item.title || 'Link'}
            </Route>
          ))}
        </nav>
      </div>
    </header>
  )
}
