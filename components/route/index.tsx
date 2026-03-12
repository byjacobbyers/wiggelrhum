'use client'

import Link from 'next/link'
import { BaseRouteType } from '@/types/objects/route-type'
import { buildRouteProps } from '@/lib/route-resolver'
import { ReactNode } from 'react'

interface RouteProps {
  data: BaseRouteType
  children: ReactNode
  className?: string
}

export default function Route({ data, children, className }: RouteProps) {
  if (!data || !data.linkType) {
    return <>{children}</>
  }

  const routeProps = buildRouteProps(data)
  const isExternal =
    data.linkType === 'external' || data.linkType === 'email' || data.linkType === 'telephone'
  const isFileDownload = data.linkType === 'file'
  const isAnchor = data.linkType === 'anchor'

  if (isExternal || isFileDownload || data.blank) {
    return (
      <a {...routeProps} className={className}>
        {children}
      </a>
    )
  }

  if (isAnchor) {
    return (
      <a {...routeProps} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link {...routeProps} className={className}>
      {children}
    </Link>
  )
}
