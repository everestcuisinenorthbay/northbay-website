export default {
  name: 'tableBooking',
  title: 'Table Booking',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Booking Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'time',
      title: 'Booking Time',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'partySize',
      title: 'Party Size',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(20)
    },
    {
      name: 'occasion',
      title: 'Special Occasion',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: '' },
          { title: 'Birthday', value: 'birthday' },
          { title: 'Anniversary', value: 'anniversary' },
          { title: 'Business Meal', value: 'business' },
          { title: 'Date Night', value: 'date' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'notes',
      title: 'Special Requests',
      type: 'text'
    },
    {
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' }
        ]
      },
      initialValue: 'pending'
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'date',
      status: 'status'
    },
    prepare({ title, subtitle, status }) {
      return {
        title: `${title} (${status})`,
        subtitle: new Date(subtitle).toLocaleDateString()
      }
    }
  }
} 