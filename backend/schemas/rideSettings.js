export default {
  name: 'rideSettings',
  title: 'Ride Settings',
  type: 'document',
  fields: [
    {
      name: 'dayStart',
      title: 'Day Start',
      type: 'number',
    },
    {
      name: 'dayEnd',
      title: 'Day End',
      type: 'number',
    },
    {
      title: 'Durations',
      name: 'durations',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'duration',
              title: 'Duration (in hours)',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      title: 'Ride Types',
      name: 'rideTypes',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      title: 'Work Hours',
      name: 'workHours',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'name',
              title: 'Name of  (number e.g. 11:30)',
              type: 'string',
            },
            {
              name: 'startTime',
              title: 'Start Time (number e.g. 11.5)',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
}
