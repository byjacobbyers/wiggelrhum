import { Metadata } from 'next'
import { urlFor } from '@/sanity/lib/image'

function normalizeBaseUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

function buildUrl(base: string, path: string): string {
  const normalizedBase = normalizeBaseUrl(base)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')

const defaultTitle = 'Wiggelrhum'
const defaultDescription = 'Wiggelrhum'
const defaultOgImage = `${baseUrl}/opengraph-image.png`

type SeoType = {
  metaTitle?: string
  metaDesc?: string
  noIndex?: boolean
  shareGraphic?: {
    asset?: { url?: string }
  }
}

export function generateMetadata(
  pageSeo?: SeoType,
  globalSeo?: SeoType,
  fallbackTitle?: string,
  fallbackDescription?: string,
  options?: { url?: string; titleSuffix?: string }
): Metadata {
  const title = pageSeo?.metaTitle || globalSeo?.metaTitle || fallbackTitle || defaultTitle
  const description = pageSeo?.metaDesc || globalSeo?.metaDesc || fallbackDescription || defaultDescription
  const noIndex = pageSeo?.noIndex ?? false
  const ogImage = pageSeo?.shareGraphic?.asset?.url
    ? urlFor(pageSeo.shareGraphic.asset as Parameters<typeof urlFor>[0]).width(1200).height(630).url()
    : globalSeo?.shareGraphic?.asset?.url
    ? urlFor(globalSeo.shareGraphic.asset as Parameters<typeof urlFor>[0]).width(1200).height(630).url()
    : defaultOgImage
  const pageUrl = options?.url
    ? (options.url.startsWith('http') ? options.url : buildUrl(baseUrl, options.url))
    : baseUrl
  const finalTitle = options?.titleSuffix ? `${title}${options.titleSuffix}` : title

  return {
    metadataBase: new URL(baseUrl),
    title: finalTitle,
    description,
    robots: { index: !noIndex, follow: true },
    openGraph: {
      title: finalTitle,
      description,
      url: pageUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: finalTitle }],
    },
    twitter: { card: 'summary_large_image', title: finalTitle, description },
  }
}

export function generateWebPageJsonLd(data: {
  title: string
  description?: string
  url: string
  seo?: { shareGraphic?: { asset?: { url: string } } }
  _updatedAt?: string
}) {
  const pageUrl = data.url.startsWith('http') ? data.url : buildUrl(baseUrl, data.url)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.title,
    ...(data.description && { description: data.description }),
    url: pageUrl,
    ...(data._updatedAt && { dateModified: new Date(data._updatedAt).toISOString() }),
  }
}

export function generateEventJsonLd(data: {
  title: string
  description?: string
  url: string
  startDate: string
  endDate?: string
  location?: string
  image?: { asset?: { url?: string } }
  _updatedAt?: string
}) {
  const eventUrl = data.url.startsWith('http') ? data.url : buildUrl(baseUrl, data.url)
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.title,
    ...(data.description && { description: data.description }),
    url: eventUrl,
    startDate: data.startDate,
    ...(data.endDate && { endDate: data.endDate }),
    ...(data.location && { location: { '@type': 'Place', name: data.location } }),
    ...(data.image?.asset?.url && {
      image: urlFor(data.image.asset as Parameters<typeof urlFor>[0]).width(1200).height(630).url(),
    }),
    ...(data._updatedAt && { dateModified: new Date(data._updatedAt).toISOString() }),
  }
}

function extractTextFromPortableText(content: unknown): string {
  if (typeof content === 'string') return content
  if (!content || !Array.isArray(content)) return ''
  return (content as Array<{ _type?: string; children?: Array<{ text?: string }> }>)
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children.map((c) => c.text || '').join(' ')
      }
      return ''
    })
    .join(' ')
    .trim()
}

export function generateFAQJsonLd(faqs: Array<{ question: string; answer: unknown }>) {
  if (!faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs
      .map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: extractTextFromPortableText(faq.answer),
        },
      }))
      .filter((item) => item.acceptedAnswer.text),
  }
}
