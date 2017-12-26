import { models } from 'claypot';
import checkProxy from 'utils/checkProxy';

const { Ips } = models;

export default {
	'/proxy/fastest': {
		security: [],
		get: {
			summary: 'get fastest proxy ip',
			async ctrl() {
				return Ips.getFastest({});
			}
		},
	},
	'/proxy/check': {
		security: [],
		params: {
			ip: 'query',
			port: 'query',
			protocol: 'query',
		},
		get: {
			summary: 'check proxy',
			async ctrl() {
				const { ip, port, protocol } = this.params;
				return checkProxy({ ip, port, protocol });
			}
		},
	},
};
