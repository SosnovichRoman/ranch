export default {
    name: 'rideBusySchedule',
    title: 'Ride Busy Schedule',
    type: 'document',
    fields: [
        {
            name: 'date',
            title: 'Date',
            type: 'date',
        },
        {
            name: 'busyHours',
            title: 'Busy Hours',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{ type: 'rideHours' }]
            }],
        },
    ]
}