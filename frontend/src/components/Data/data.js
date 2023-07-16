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
    console.log(date)
    const query =
        `*[_type == "rideHours" && startTime >= *[_type == "constants"][0].dayStart && endTime <= *[_type == "constants"][0].dayEnd]|order(startTime asc){
            ...,
            "busy": @._id in *[_type == "rideBusySchedule" && date== "${date}"].busyHours[]._ref 
          }`
    return query;
}

export const isRideIntervalBusyQuery = (date, startTime, duration) => {
    startTime = Number(startTime);
    const endTime = Number(startTime) + Number(duration);
    const query =
        `defined(
            *[_type == "rideBusySchedule" && date == "${date}" && references(
              *[_type == "rideHours" && startTime >= ${startTime} && endTime <= ${endTime}]._id
            ) || ${endTime} > *[_type == "constants"][0].dayEnd][0]
          )`
    return query;
}