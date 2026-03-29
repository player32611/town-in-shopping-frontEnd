import { useEffect, useState } from "react";
import { useMessageStore } from "@/store/messageStore";
import type { ColumnsType } from "@/types/component";
import type { Product } from "@/types/product";

import { Avatar, Button, Empty, Popconfirm, Select, Skeleton, Space, Table } from "antd";

export default function ProductManage() {
	const [data, setData] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const { messageSuccess, messageError } = useMessageStore();

	const columns: ColumnsType<Product> = [
		{
			title: "id",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "商品名称",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "展示图片",
			dataIndex: "picture",
			key: "picture",
		},
		{
			title: "售价",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "详情",
			dataIndex: "num",
			key: "num",
		},
		{
			title: "库存数",
			dataIndex: "num",
			key: "num",
		},
	];

	return (
		<>
			{loading ? (
				<>
					<Skeleton
						active
						style={{
							marginBottom: 20,
						}}
					/>
					<Skeleton
						active
						style={{
							marginBottom: 20,
						}}
					/>
				</>
			) : (
				<Table<Product>
					columns={columns}
					pagination={{ placement: ["bottomCenter"] }}
					dataSource={data}
					locale={{ emptyText: <Empty description="暂无数据" /> }}
				/>
			)}
		</>
	);
}
