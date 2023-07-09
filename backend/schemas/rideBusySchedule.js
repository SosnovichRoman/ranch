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
                type: 'object',
                name: 'busyInterval',
                fields: [
                    {
                        name: 'startTime',
                        type: 'number'
                    },
                    {
                        name: 'endTime',
                        type: 'number'
                    },
                ]
                
            }]
        },
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
        // {
        //     name: 'busyHours',
        //     title: 'Busy Hours',
        //     type: 'array',
        //     of: [{
        //         type: 'reference',
        //         to: [{ type: 'rideHours' }]
        //     }]
        // }
    ]
}