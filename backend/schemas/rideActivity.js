export default {
  name: 'rideActivity',
  title: 'Ride Activity',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    },
    {
      name: 'clientPhone',
      title: 'Client Phone',
      type: 'string',
    },
    {
      name: 'personCount',
      title: 'Person Count',
      type: 'number',
    },
    {
      name: 'rideType',
      title: 'Ride Type',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'startTime',
      title: 'Start Time',
      type: 'number',
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'number',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'instructors',
      title: 'Instructors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
    },
  ],
}
