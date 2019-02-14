import mongoose, { Schema } from 'mongoose'
const autoIncrement = require('mongoose-auto-increment')

import config from '../../config/constants'

autoIncrement.initialize(mongoose)

const NodeSchema = new Schema(
	{
		// The field below is Primary Key and is automatically populated
		// _id: Number,
		nodeId: Number,
		name: String,
		devEUI: Number,
		devAddress: Number,
		settings: {
			measurements: [
				{
					type: String,
					updateInterval: Number,
					tooHigh: Number,
					tooLow: Number
				}
			]
		}
	},
	{
		collection: config.mongodb.nodesCollection
	}
)

NodeSchema.plugin(autoIncrement.plugin, 'Node')

NodeSchema.statics = {
	getAllNodes() {
		return this.find({}, (err, response) => {})
	},

	getOneNode(nodeId) {
		const query = { nodeId: nodeId }
		return this.find(query, (err, response) => {})
	}
}

export default mongoose.model('Node', NodeSchema)
