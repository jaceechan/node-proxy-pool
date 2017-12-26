
const { name } = require('./package.json');
const hostname = require('os').hostname();

const isRemoteServer = hostname === 'VM_248_55_centos';

const {
	NODE_ENV,
	PORT = 3000,
	DEV_PORT = 3001,
	MONGO_USER = '',
	MONGO_PASS = '',
} = process.env;
const isDev = NODE_ENV === 'development';

module.exports = {
	name,

	port: isRemoteServer ? +PORT : +DEV_PORT,
	baseDir: isDev ? 'src/server' : 'lib/server',
	daemon: !isDev,
	inspect: isDev,
	production: !isDev,
	logsDir: isRemoteServer ? '../../../.logs' : '../../.logs',
	execCommand: isDev ? 'babel-node' : 'node',
	historyAPIFallback: !isDev,
	static: isDev ? false : '../static',
	favicon: '../assets/favicon.ico',
	proxy: {
		'/': {
			enable: isDev,
			target: `http://127.0.0.1:${DEV_PORT}`,
		},
	},

	plugins: [
		{
			module: 'claypot-mongoose-plugin',
		},
		{
			module: 'claypot-api-plugin',
			options: {
				controllersPath: 'apis',
				definitionsPath: 'defs',
				info: {
					version: '0.0.0',
				},
				securities: {
					admin: 'X-ACCESS-TOKEN',
				},
				defaultSecurity: ['*admin'],
			},
		},
		'claypot-redis-plugin',
		// './plugins/proxyScheduleJob',
	],

	watch: {
		enable: isDev,
	},

	dbs: {
		redis: {
			store: 'redis',
			prefix: name,
			cache: {
				ttl: 86400,
			},
		},
		mongoose: {
			store: 'mongoose',
			database: name,
			native_parser: true,
			user: isRemoteServer ? 'YOUR_MONGO_USER' : MONGO_USER,
			pass: isRemoteServer ? 'YOUR_MONGO_PASS' : MONGO_PASS,
			authSource: 'admin',
			autoReconnect: true,
		},
	},
};
