'use client'

import Script from 'next/script'

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

const OrgJsonLd = () => {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Wiggelrhum',
      url: baseUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Wiggelrhum',
      url: baseUrl,
    },
  ]

  return (
    <Script
      id="organization-ld-json"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  )
}

export default OrgJsonLd
