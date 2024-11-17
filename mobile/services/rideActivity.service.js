import client from '../components/SanityClient/client'
import { rideActivityQuery } from '../utils/data'

const rideActivityService = {
	async getById(id) {
		const rideActivity = await client.fetch(rideActivityQuery(id))
		return rideActivity
	},
	async getAll() {
		//TODO: dododo
		console.log('get all activity TO DO:')
	},
	async add(doc) {
		//TODO: dododo
		console.log('add activity doc TO DO:', doc)
	},
	async update(id, doc) {
		//TODO: dododo
		console.log('update', id, doc)
		const response = client
			.patch(id) // Document ID to patch
			.set(doc) // Shallow merge
			.commit() // Perform the patch and return a promise
		return response
	},
}

export default rideActivityService
