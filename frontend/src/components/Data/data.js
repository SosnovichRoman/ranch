export const rideTypesQuery = `*[_type == "rideTypes"] | order(_createdAt asc)`
export const rideDurationsListQuery = `*[_type == "rideDurations"]  | order(duration asc)`
export const rideHoursListQuery = `*[_type == "rideHours"]  | order(hour asc)`
export const rideFreeHoursQuery = (date) => {
    //dont know is it work
    const query =
    `*[_type == "rideHours" && !(_id in
        *[_type =="rideBusySchedule" && date == "${date}][0]{
            "refs": busyHours[]._ref
        }.refs
    )]`
    return query
}

export const rideHoursQuery = (date) => {
    const query =
    `*[_type == "rideHours"]|order(hour asc){
        ...,
        "busy": _id in *[_type =="rideBusySchedule" && date == "${date}"][0]{
          "refs": busyHours[]._ref
        }.refs
    }`
    return query;
}