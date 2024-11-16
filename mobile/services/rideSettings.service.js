import client from '../components/SanityClient/client'
import { rideSettingsQuery } from '../utils/data'

const rideSettingsService = {
	async get() {
		const rideSettings = await client.fetch(rideSettingsQuery)
		return rideSettings
	},
}
export default rideSettingsService
