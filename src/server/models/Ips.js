import checkProxy from 'utils/checkProxy';

export default class Ips {
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

	async getFastest(params) {
		const findOptions = {};
		const { protocol, anonymity } = params;
		if (protocol) {
			findOptions.protocol = protocol;
		}

		if (anonymity) {
			findOptions.anonymity = anonymity;
		}

		const res = await this
			.$mongoose
			.find(findOptions)
			.sort({ speed: 1 })
			.exec();
		return res[0];
	}

	async create(data) {
		return this.$mongoose.create(data);
	}

	async spiderCreate(data) {
		const { ip, port, protocol } = data;
		const startTS = Date.now();
		const res = await checkProxy({ ip, port, protocol });
		console.log({ ip, result: res.status });
		if (res && res.status === 200) {
			data.speed = Date.now() - startTS;
			data.lastCheckTime = new Date();
			return this.$mongoose.findOneAndUpdate({ ip }, data, { new: true, upsert: true });
		}
	}

	async autoCheck({ count = 20 }) {
		const ips = await this
			.$mongoose
			.find()
			.sort({ checkTimes: 1, lastCheckTime: 1 })
			.limit(count)
			.exec()
		;
		ips.forEach(async (ipItem) => {
			const { ip, port, protocol } = ipItem;
			const startTS = Date.now();
			const res = await checkProxy({ ip, port, protocol });
			if (res && res.status === 200) {
				this
					.$mongoose
					.findOneAndUpdate(
					{ ip },
					{
						speed: Date.now() - startTS,
						lastCheckTime: new Date(),
					})
					.exec();
			}
			else {
				this
					.$mongoose
					.findOneAndRemove({ ip })
					.exec();
			}
		});
	}
}
