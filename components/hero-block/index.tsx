'use client'

import { motion } from 'framer-motion'
import Route from '@/components/route'
import Image from 'next/image'

type HeroBlockProps = {
  active?: boolean
  componentIndex?: number
  content?: unknown
  layout?: string
  anchor?: string
  image?: { asset?: { url?: string }; alt?: string } | null
  cta?: { active?: boolean; route?: unknown } | null
}

export default function HeroBlock({
  active = true,
  componentIndex = 0,
  layout = 'image-right',
  anchor,
  image,
  cta,
}: HeroBlockProps) {
  if (!active) return null

  const layoutClass = layout === 'image-left' ? 'md:flex-row-reverse' : 'md:flex-row'

  return (
    <section
      id={anchor || `hero-block-${componentIndex}`}
      className="hero-block w-full flex justify-center px-5 py-12"
    >
      <div
        className={`container flex flex-wrap md:flex-nowrap ${layoutClass} flex-col-reverse items-center w-full gap-8`}
      >
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: componentIndex !== 0 ? 0.5 : 0 }}
        >
          {cta?.active && cta?.route ? (
            <Route data={cta.route as Parameters<typeof Route>[0]['data']} className="inline-flex mt-5">
              <span className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90">
                {(cta.route as { title?: string }).title || 'Learn More'}
              </span>
            </Route>
          ) : null}
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 aspect-video relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: componentIndex !== 0 ? 0.5 : 0 }}
        >
          {image?.asset?.url ? (
            <Image
              src={image.asset.url}
              alt={image.alt || 'Hero'}
              fill
              className="object-cover rounded-lg"
            />
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
