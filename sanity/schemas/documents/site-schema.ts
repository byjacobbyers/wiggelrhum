import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'site',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Site Title', type: 'string' }),
    defineField({ name: 'seo', title: 'Default Site SEO / Share Settings', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Site Settings' }
    },
  },
})
