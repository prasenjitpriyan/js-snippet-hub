import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'snippet',
  title: 'JavaScript Snippet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'code',
      title: 'Code Snippet',
      type: 'text',
      description: 'JavaScript code snippet',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for filtering (e.g., ES6, React, Node.js)'
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: new Date().toISOString()
    })
  ]
})
