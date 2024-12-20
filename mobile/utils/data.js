import dayjs from 'dayjs'

export const rideSettingsQuery = `*[_type == "rideSettings"][0]`

export const rideActivityQuery = (id) => {
	const query = `*[_type == 'rideActivity' && _id == '${id}'][0]{
    ...,
    instructors[]->
    }`
	return query
}

//----------------------------------------------------------------------

export const rideTypesQuery = `*[_type == "rideTypes"] | order(_createdAt asc)`
export const rideDurationsListQuery = `*[_type == "rideDurations"]  | order(duration asc)`
export const rideHoursListQuery = `*[_type == "rideHours"]  | order(startTime asc)`
export const rideFreeHoursQuery = (date) => {
	//dont know is it work
	const query = `*[_type == "rideHours" && !(_id in
        *[_type =="rideBusySchedule" && date == "${date}"][0]{
            "refs": busyHours[]._ref
        }.refs
    )]`
	return query
}

export const rideHoursQuery = (date) => {
	const query = `*[_type == "rideHours"]|order(startTime asc){
            ...,
            "free": *[_type == "rideBusySchedule" && date == "2023-07-11"][0]{
                "free": count(busyHours[startTime >= ^.^.startTime && startTime >= ^.^.endTime && ^.^.endTime <= ^.dayEnd 
                    || endTime <= ^.^.startTime && endTime <= ^.^.endTime && ^.^.endTime <= ^.dayEnd ]) > 0
              }.free
        }`
	return query
}

export const isRideIntervalFreeQuery = (date, startTime, duration) => {
	startTime = Number(startTime)
	const endTime = Number(startTime) + Number(duration)
	const query = `*[_type == "rideBusySchedule" && date == "${date}"][0]{
        "free": count(busyHours[startTime >= ${startTime} && startTime >= ${endTime} && ${endTime} <= ^.dayEnd 
            || endTime <= ${startTime} && endTime <= ${endTime} && ${endTime} <= ^.dayEnd ]) > 0
      }`
	return query
}

export const loginQuery = (login, password) => {
	const query = `*[_type == 'user' && login == '${login}' && password == '${password}']{
        ...,
        "role": role->
      }[0]`
	return query
}

export const userQuery = (userId) => {
	const query = `*[_type == 'user' && _id == '${userId}']{
        ...,
        "role": role->
      }[0]`
	return query
}

export const userListQuery = `*[_type == 'user']{
                                    ...,
                                    "role": role->
                                }`

export const unapprovedScheduleQuery = `*[_type == 'rideActivity' && approved == false]{
                                            ...,
                                            rideType->,
                                            duration->,
                                        }`

export const lastRideScheduleQuery = `*[_type == 'rideActivity'][0..30]|order(_updatedAt desc){
                                            ...,
                                            rideType->,
                                            duration->,
                                        }`

export const scheduleQuery = (userId) => {
	const currentDate = dayjs()
	const endDate = currentDate.add(1, 'month')
	const query = `*[_type == 'rideActivity' && approved == true && '${userId}' in instructors[]._ref && 
                    date >= '${currentDate.format(
											'YYYY-MM-DD'
										)}' && date < '${endDate.format('YYYY-MM-DD')}']{
                        ...,
                        rideType->,
                        duration->,
                    }`
	return query
}

export const instructorsQuery = '*[_type == "user"]|order(name asc)'

export const busyScheduleQuery = (date) => {
	const query = `*[_type == "rideBusySchedule" && date == "${date}"][0]{
                     ...,
                     busyHours[]->
                    }`
	return query
}
