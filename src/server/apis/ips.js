
export default {
	'/': {
		get: {
			summary: 'Get Ips',
			operator: 'get',
			params: {
				count: {
					in: 'query',
					maximum: 50,
					minimum: 0,
				},
				page: 'query',
				ip: 'query',
				protocol: 'query',
				anonymity: 'query',
			},
		},
	},
	'/fastest': {
		get: {
			summary: 'Get fastest Ip',
			operator: 'getFastest',
			params: {
				protocol: 'query',
				anonymity: 'query',
			},
		},
	},
};
