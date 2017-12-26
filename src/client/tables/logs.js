
import React from 'react';
import { Table, Text, Select, Option, Image } from 're-admin';
import { formatTime } from 'utils/momentLite';

export default (
	<Table name="logs">
		<Text
			name="_id"
			label="ID"
			unique
		/>
		<Text
			name="createdAt"
			label="记录时间"
			inTable={(props, { text }) => {
				return formatTime(new Date(text));
			}}
		/>
		<Text
			name="level"
			label="日志级别"
			required
			inQuery
			inTable={(props, { text }) => text.toUpperCase()}
		/>
		<Text
			name="type"
			label="日志类型"
			required
			inQuery
			inTable={(props, { text }) => text.toUpperCase()}
		/>
		<Text
			name="detail"
			label="内容"
			required
			inTable
		/>
	</Table>
);
