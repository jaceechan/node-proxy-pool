
import 'antd/dist/antd.less';
import './reset.scss';
import React, { Component } from 'react';
import {
	Admin, Title, API, Auth, Upload, Navigator, Menu
} from 're-admin';

import ips from './tables/ips';
import logs from './tables/logs';

const baseURL = '/api/';

export default class App extends Component {
	render() {
		return (
			<Admin>
				<Title>node-proxy-pool</Title>

				<Navigator>
					<Menu icon="appstore" title="IP池" table="ips" path="/ips" />
					<Menu icon="appstore" title="日志" table="logs" path="/logs" />
				</Navigator>

				<API baseURL={baseURL} />

				<Auth
					basePath="auth"
					loginPath="login"
					getUserPath="getUser"
					defaultLoginRedirection="/sources"
				/>

				<Upload
					imagePath="/api/upload/image"
					filePath="upload/file"
				/>

				{/* Tables */}
				{ips}
				{logs}

			</Admin>
		);
	}
}
