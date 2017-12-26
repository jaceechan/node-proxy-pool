
export default class Logs {
	async create(data) {
		return this.$mongoose.create(data);
	}

	async get(params) {
		const { page = 1, count = 20, ...options } = params;
		const res = await this
			.$mongoose
			.find(options)
			.sort({ _id: -1 })
			.skip((+page - 1) * +count)
			.limit(20)
			.exec();
		const total = await this.$mongoose.find().count().exec();
		return { total, list: res };
	}
}
