import { defineType, defineField } from 'sanity'
import { PresentationIcon } from '@sanity/icons'

export default defineType({
  title: 'CTA Block',
  name: 'ctaBlock',
  type: 'object',
  icon: PresentationIcon,
  fields: [
    defineField({
      title: 'Active?',
      name: 'active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({ title: 'Anchor', name: 'anchor', type: 'string' }),
    defineField({
      title: 'Alignment',
      name: 'alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'text-left' },
          { title: 'Center', value: 'text-center' },
          { title: 'Right', value: 'text-right' },
        ],
      },
      initialValue: 'text-center',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'simpleText',
      description: 'Text displayed above the button',
    }),
    defineField({ title: 'CTA', name: 'cta', type: 'cta' }),
  ],
  preview: {
    select: { active: 'active' },
    prepare({ active }) {
      return { title: 'CTA', subtitle: active ? 'Active' : 'Inactive' }
    },
  },
})
