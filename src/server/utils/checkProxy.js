import superagent from 'superagent';
import superagentProxy from 'superagent-proxy';

const proxyRequest = superagentProxy(superagent);

const proxyRP = (url, proxy) => new Promise((resolve, reject) => {
	proxyRequest
		.get(url)
		.proxy(proxy)
		.end((err, res) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(res);
			}
		});
});

export default async ({ ip, port, protocol }) => {
	try {
		const proxy = `${protocol.toLowerCase()}://${ip}:${port}`;
		const res = await proxyRP('http://ip.chinaz.com/getip.aspx', proxy);
		return res;
	}
	catch (err) {
		return false;
	}
};
