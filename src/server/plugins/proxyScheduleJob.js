import schedule from 'node-schedule';
import proxySpider from 'spider/proxySpider';
import { logger } from 'claypot';


export default class ProxyJob {
	initServer() {
		schedule.scheduleJob('*/60 * * * *', async () => {
			try {
				logger.info(`[${new Date()}]proxySpider scheduleJob start`);
				await proxySpider.run();
			}
			catch (err) {
				logger.error(`proxySpider scheduleJob error: ${err}`);
			}
		});


		schedule.scheduleJob('*/5 * * * *', async () => {
			try {
				logger.info(`[${new Date()}]Ip check scheduleJob start`);
				await proxySpider.check({ count: 20 });
				logger.info(`[${new Date()}]Ip check scheduleJob end`);
			}
			catch (err) {
				logger.error(`Ip check scheduleJob error: ${err}`);
			}
		});
	}
}
