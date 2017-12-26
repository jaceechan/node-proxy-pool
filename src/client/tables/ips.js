
import React from 'react';
import { Table, Text, Select, Option, Image } from 're-admin';
import { formatTime } from 'utils/momentLite';

export default (
	<Table name="ips">
		<Text
			name="ip"
			label="IP"
			unique
			inQuery
			inTable
		/>
		<Text
			name="port"
			label="port"
			inTable
		/>
		<Text
			name="protocol"
			label="协议"
			inQuery
			inTable
		/>
		<Text
			name="country"
			label="国家"
			inTable
		/>
		<Text
			name="address"
			label="地址"
			inTable
		/>
		<Text
			name="anonymity"
			label="类型"
			inQuery
			inTable
		/>
		<Text
			name="speed"
			label="速度"
			inTable={(props, { text }) => {
				return `${text}ms`;
			}}
		/>
		<Text
			name="lastCheckTime"
			label="最后验证时间"
			inTable={(props, { text }) => {
				return formatTime(new Date(text));
			}}
		/>
	</Table>
);
