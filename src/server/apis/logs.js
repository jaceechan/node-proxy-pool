
export default {
	'/': {
		get: {
			summary: 'Get Logs',
			operator: 'get',
			params: {
				count: {
					in: 'query',
					maximum: 50,
					minimum: 0,
				},
				_id: 'query',
				type: 'query',
			},
		},
	},
};
