
import request from 'request-promise-native';
import { JSDOM } from 'jsdom';

export default async (url) => {
	const page = await request.get(url);
	return new JSDOM(page);
};
