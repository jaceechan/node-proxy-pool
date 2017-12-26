
import { Schema } from 'mongoose';

const source = new Schema({
	level: {
		type: String,
	},
	type: {
		type: String,
	},
	detail: {
		type: String,
	},
	refs: {
		type: String,
	},
},
	{
		timestamps: true,
	}
);

export default source;
