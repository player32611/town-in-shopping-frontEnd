import { useCallback, useEffect, useState } from "react";
import { useMessageStore } from "@/store/messageStore";
import { getProductByUser } from "@/services/product";
import { getStorageItem } from "@/lib/storage";
import { deleteProduct } from "@/services/product";
import type { ColumnsType } from "@/types/component";
import type { ProductList } from "@/types/product";

import { Button, Empty, FloatButton, Image, Popconfirm, Skeleton, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddProduct from "./AddProducts";

export default function ProductManage() {
	const [data, setData] = useState<ProductList[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { messageSuccess, messageError } = useMessageStore();

	const columns: ColumnsType<ProductList> = [
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
			render: (src: string) => <Image width={100} src={src} alt={src} />,
		},
		{
			title: "售价",
			dataIndex: "price",
			key: "price",
			render: (price: number) => `${price}￥`,
		},
		{
			title: "详情",
			dataIndex: "details",
			key: "details",
			ellipsis: true,
			// render: (text: string) => (
			// 	<Typography.Paragraph ellipsis={{ rows: 2 }}>{text}</Typography.Paragraph>
			// ),
		},
		{
			title: "库存数",
			dataIndex: "num",
			key: "num",
			render: (num: number) => `${num}件`,
		},
		{
			key: "delete",
			render: (_, record) => (
				<Popconfirm
					title="确定要删除该商品吗？"
					okText="确定"
					cancelText="取消"
					onConfirm={() => handleDelete(record.id)}
				>
					<Button type="primary" disabled={getStorageItem("id") == record.id.toString()} danger>
						删除
					</Button>
				</Popconfirm>
			),
		},
	];

	const fetchData = useCallback(async () => {
		const id = getStorageItem("id");
		if (!id) return;
		try {
			setIsLoading(true);
			const list = await getProductByUser({ id });
			list.map((item: ProductList) => {
				item.key = item.id;
			});
			setData(list);
		} catch (error) {
			messageError("获取商品列表失败" + error);
		} finally {
			setIsLoading(false);
		}
	}, [messageError]);
	const handleDelete = (id: string) => {
		deleteProduct({ id })
			.then(() => {
				setIsLoading(false);
				messageSuccess("删除成功");
				fetchData();
			})
			.catch(() => {
				messageError("删除失败");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<>
			{isLoading ? (
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
				<>
					<Table<ProductList>
						columns={columns}
						pagination={{ placement: ["bottomCenter"] }}
						dataSource={data}
						locale={{ emptyText: <Empty description="暂无数据" /> }}
					/>
					<AddProduct
						isOpen={isModalOpen}
						handleClose={() => setIsModalOpen(false)}
						refresh={fetchData}
					/>
					<FloatButton
						icon={<PlusOutlined />}
						type="primary"
						style={{ insetInlineEnd: 94 }}
						onClick={() => setIsModalOpen(true)}
					/>
				</>
			)}
		</>
	);
}
