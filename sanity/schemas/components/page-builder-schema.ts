import { defineField } from 'sanity'

export default defineField({
  title: 'Page sections',
  name: 'sections',
  type: 'array',
  of: [
    { type: 'heroBlock' },
    { type: 'coverBlock' },
    { type: 'coverVideo' },
    { type: 'ctaBlock' },
    { type: 'textBlock' },
    { type: 'faqBlock' },
    { type: 'imageBlock' },
    { type: 'embedBlock' },
    { type: 'formBlock' },
    { type: 'spacerBlock' },
    { type: 'dividerBlock' },
  ],
})
