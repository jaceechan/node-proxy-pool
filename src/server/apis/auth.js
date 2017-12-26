
import { isDev } from 'claypot';

const admin = {
	username: 'admin',
	password: '000000',
};

export default {
	'/login': {
		post: {
			summary: 'Login',
			security: [],
			params: {
				body: {
					schema: {
						type: 'object',
						properties: {
							username: {
								type: 'string',
								required: true,
							},
							password: {
								type: 'string',
								required: true,
							},
						}
					}
				}
			},
			async ctrl() {
				const {
					params: { body: { username, password } },
					sign,
				} = this;
				if (username === admin.username && password === admin.password) {
					return sign({ username });
				}
				else {
					this.throw(400, 'Username or password error');
				}
			}
		}
	},
	'/getUser': {
		get: {
			summary: 'Get user info',
			async ctrl() {
				const { username } = this.states.admin;
				return this.sign({ username });
			}
		}
	},
};
