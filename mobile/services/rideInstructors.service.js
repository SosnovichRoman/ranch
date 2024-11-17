import client from '../components/SanityClient/client'
import { instructorsQuery } from '../utils/data'

const rideInstructorsService = {
	async getAll() {
		const instructors = client.fetch(instructorsQuery)
		return instructors
	},
}

export default rideInstructorsService
