'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { footerQuery } from '@/sanity/queries/components/page-nav-query'
import Route from '@/components/route'
import { BaseRouteType } from '@/types/objects/route-type'

export default function Footer() {
  const [navigation, setNavigation] = useState<{ items?: BaseRouteType[] } | null>(null)
  const year = new Date().getFullYear()

  useEffect(() => {
    client.fetch(footerQuery).then(setNavigation)
  }, [])

  return (
    <footer className="border-t-4 border-foreground bg-background px-4 py-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <small className="text-sm">
          © {year} Wiggelrhum. All rights reserved.
        </small>
        <nav className="flex items-center gap-6">
          {navigation?.items?.map((item, i) => (
            <Route key={i} data={item} className="text-sm hover:opacity-80">
              {item.title || 'Link'}
            </Route>
          ))}
        </nav>
      </div>
    </footer>
  )
}
