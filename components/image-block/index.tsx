'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Route from '@/components/route'

type ImageBlockProps = {
  active?: boolean
  componentIndex?: number
  anchor?: string
  image?: { asset?: { url?: string }; alt?: string } | null
  content?: unknown
  cta?: { active?: boolean; route?: unknown } | null
}

export default function ImageBlock({
  active = true,
  componentIndex = 0,
  anchor,
  image,
  cta,
}: ImageBlockProps) {
  if (!active) return null

  return (
    <section
      id={anchor || `image-block-${componentIndex}`}
      className="image-block w-full flex justify-center px-5 py-12"
    >
      <div className="container flex flex-col items-center gap-6">
        {image?.asset?.url ? (
          <motion.div
            className="relative w-full aspect-video"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Image
              src={image.asset.url}
              alt={image.alt || 'Image'}
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        ) : null}
        {cta?.active && cta?.route ? (
          <Route data={cta.route as Parameters<typeof Route>[0]['data']}>
            <span className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90">
              {(cta.route as { title?: string }).title || 'Learn More'}
            </span>
          </Route>
        ) : null}
      </div>
    </section>
  )
}
