import xiciSpider from './xiciSpider';
import { models } from 'claypot';

const { Ips } = models;


class ProxySpider {
	constructor({ maxCount, maxPage }) {
		this.maxCount = maxCount;
		this.maxPage = maxPage;
		this.isRuning = false;
	}

	async run() {
		const total = await Ips.$mongoose.find().count().exec();
		if (total < this.maxCount && !this.isRuning) {
			this.isRuning = true;
			await xiciSpider({ maxPage: this.maxPage });
			this.isRuning = false;
		}
	}

	async check({ count = 20 }) {
		return Ips.autoCheck({ count });
	}
}

export default new ProxySpider({ maxCount: 500, maxPage: 1 });
