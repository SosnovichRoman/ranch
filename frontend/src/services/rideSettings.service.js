import client from '@/components/SanityClient/client'
import { rideSettingsQuery } from '@/data/queries'

const rideSettingsService = {
	async getRideSettings() {
		const rideSettings = await client.fetch(rideSettingsQuery)
		return rideSettings
	},
}
export default rideSettingsService
