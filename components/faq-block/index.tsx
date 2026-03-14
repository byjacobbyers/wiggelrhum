'use client'

import { motion } from 'framer-motion'
import SimpleText from '@/components/simple-text'

type Faq = {
  question?: string
  answer?: unknown
}

type FaqBlockProps = {
  active?: boolean
  componentIndex?: number
  anchor?: string
  faqs?: Faq[]
}

export default function FaqBlock({
  active = true,
  componentIndex = 0,
  anchor,
  faqs = [],
}: FaqBlockProps) {
  if (!active || !faqs?.length) return null

  return (
    <section
      id={anchor || `faq-block-${componentIndex}`}
      className="faq-block w-full flex justify-center px-5 py-12"
    >
      <div className="container max-w-3xl">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              {faq.answer ? (
                <div className="prose prose-sm max-w-none">
                  <SimpleText content={faq.answer} />
                </div>
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
