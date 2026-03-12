'use client'

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'

type TextBlockProps = {
  active?: boolean
  componentIndex?: number
  anchor?: string
  contentAlignment?: string
  content?: unknown
}

export default function TextBlock({
  active = true,
  componentIndex = 0,
  anchor,
  contentAlignment = 'left',
  content,
}: TextBlockProps) {
  if (!active) return null

  const alignClass =
    contentAlignment === 'center' ? 'text-center' : contentAlignment === 'right' ? 'text-right' : 'text-left'

  return (
    <section
      id={anchor || `text-block-${componentIndex}`}
      className="text-block w-full flex justify-center px-5 py-12"
    >
      <motion.div
        className={`container prose max-w-none ${alignClass}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {content && Array.isArray(content) ? (
          <PortableText value={content as Parameters<typeof PortableText>[0]['value']} />
        ) : null}
      </motion.div>
    </section>
  )
}
