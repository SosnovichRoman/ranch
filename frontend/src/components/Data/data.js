export const rideTypesQuery = `*[_type == "rideTypes"] | order(_createdAt asc)`
export const rideDurationsListQuery = `*[_type == "rideDurations"]  | order(duration asc)`
export const rideHoursListQuery = `*[_type == "rideHours"]  | order(startTime asc)`
export const rideFreeHoursQuery = (date) => {
    //dont know is it work
    const query =
        `*[_type == "rideHours" && !(_id in
        *[_type =="rideBusySchedule" && date == "${date}"][0]{
            "refs": busyHours[]._ref
        }.refs
    )]`
    return query
}

export const rideHoursQuery = (date) => {
    const query =
        `*[_type == "rideHours"]|order(startTime asc){
            ...,
            "free": *[_type == "rideBusySchedule" && date == "2023-07-11"][0]{
                "free": count(busyHours[startTime >= ^.^.startTime && startTime >= ^.^.endTime && ^.^.endTime <= ^.dayEnd 
                    || endTime <= ^.^.startTime && endTime <= ^.^.endTime && ^.^.endTime <= ^.dayEnd ]) > 0
              }.free
        }`
    return query;
}

export const isRideIntervalFreeQuery = (date, startTime, duration) => {
    startTime = Number(startTime);
    const endTime = Number(startTime) + Number(duration);
    const query =
        `*[_type == "rideBusySchedule" && date == "${date}"][0]{
        "free": count(busyHours[startTime >= ${startTime} && startTime >= ${endTime} && ${endTime} <= ^.dayEnd 
            || endTime <= ${startTime} && endTime <= ${endTime} && ${endTime} <= ^.dayEnd ]) > 0
      }`
    return query;
}