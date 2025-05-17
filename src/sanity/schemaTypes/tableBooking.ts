import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tableBooking',
  title: 'Table Booking',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date', validation: Rule => Rule.required() }),
    defineField({ name: 'time', title: 'Time', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'partySize', title: 'Party Size', type: 'number', validation: Rule => Rule.required().min(1) }),
    defineField({ name: 'occasion', title: 'Occasion', type: 'string', options: { list: [ { title: 'None', value: '' }, { title: 'Birthday', value: 'birthday' }, { title: 'Anniversary', value: 'anniversary' }, { title: 'Other', value: 'other' } ] } }),
    defineField({ name: 'notes', title: 'Special Requests', type: 'text', rows: 2 }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: [ { title: 'Pending', value: 'pending' }, { title: 'Confirmed', value: 'confirmed' }, { title: 'Cancelled', value: 'cancelled' }, { title: 'Completed', value: 'completed' } ] }, initialValue: 'pending' }),
    defineField({ name: 'createdAt', title: 'Created At', type: 'datetime', readOnly: true }),
    defineField({ name: 'updatedAt', title: 'Updated At', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'date',
      status: 'status',
    },
    prepare(selection: { title: string; subtitle?: string; status?: string }) {
      return {
        title: selection.title,
        subtitle: `${selection.subtitle || ''} (${selection.status || ''})`,
      }
    },
  },
}) 