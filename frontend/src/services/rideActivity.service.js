import client from '@/components/SanityClient/client'

const rideActivityService = {
	async addRideActivity(doc) {
		const rideActivity = await client.create(doc)
		return rideActivity
	},
}
export default rideActivityService
