import spider from './core';
import { models, logger } from 'claypot';
import wait from 'utils/wait';

const { Ips } = models;
const xiciNNUrl = 'http://www.xicidaili.com/nn/';

const evaluatePage = (page, pageFunc) => {
	const { window: { document } } = page;
	return pageFunc(document);
};

const pageFunc = (document) => {
	const listItems = document.querySelector('#ip_list').querySelectorAll('tr');
	const ips = Array.prototype.map.call(listItems, (item) => {
		const args = item.querySelectorAll('td');
		if (args.length === 0) {
			return null;
		}
		else {
			const speedText = args[6].querySelector('div').getAttribute('title');
			const speed = parseFloat(speedText);
			return {
				ip: args[1].textContent,
				port: args[2].textContent,
				country: 'china',
				address: args[3].textContent,
				anonymity: args[4].textContent,
				protocol: args[5].textContent,
				speed
			};
		}
	});
	ips.shift();
	return ips;
};

export default async ({ maxPage }) => {

	const start = Date.now();
	let indexPage = 1;
	try {
		while (indexPage <= +maxPage) {
			const link = xiciNNUrl + indexPage;
			const page = await spider(link);
			const ips = evaluatePage(page, pageFunc);
			ips.forEach(async (ipItem) => {
				Ips.spiderCreate(ipItem);
			});
			await wait(1000);
			indexPage++;
		}
	}
	catch (err) {
		logger.error(`xiciSpider Error Exit, currentIndexPage:${indexPage}`);
		logger.error(err);
		spider.close();
	}
	return {
		spiderName: 'xiciSpider',
		useTime: `${Date.now() - start}ms`,
		status: 'finished'
	};
};

