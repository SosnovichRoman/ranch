export default {
    name: 'rideHours',
    title: 'Ride Schedule Hours',
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
        {
            name: 'endTime',
            title: 'End Time (number e.g. 12)',
            type: 'number',
        },
    ]
}