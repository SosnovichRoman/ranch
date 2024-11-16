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
	async update(id) {
		//TODO: dododo
		console.log('update activity id TO DO:', id)
	},
}

export default rideActivityService
