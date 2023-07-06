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
            type: 'reference',
            to: [{ type: 'rideTypes' }]
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date',
        },
        {
            name: 'startTime',
            title: 'Start Time',
            type: 'reference',
            to: [{ type: 'rideHours' }]
        },
        {
            name: 'duration',
            title: 'Duration',
            type: 'reference',
            to: [{ type: 'rideDurations' }]
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
        },
        {
            name: 'instructors',
            title: 'Instructors',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{ type: 'user' }]
            }]
        },
    ]
}