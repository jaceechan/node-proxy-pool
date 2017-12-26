
import { Schema } from 'mongoose';
import 'isomorphic-fetch';

const ip = new Schema({
	ip: {
		type: String,
		unique: true,
		index: true,
	},
	port: {
		type: String,
	},
	country: {
		type: String,
		index: true,
	},
	anonymity: {
		type: String,
		index: true,
	},
	address: {
		type: String,
	},
	protocol: {
		type: String,
		index: true,
	},
	speed: {
		type: Number,
		index: true,
	},
	lastCheckTime: {
		type: Date,
		index: true,
	}
},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	});

export default ip;
