"use client";

import { useState, useEffect } from "react";
import { getProductDetails } from "@/services/product";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import { postInsertCart } from "@/services/cart";
import { getStorageItem } from "@/lib/storage";
import { useMessageStore } from "@/store/messageStore";

import { Button, Descriptions, Image, Skeleton, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from "antd";
import CommentList from "@/components/ui/CommentList";

export default function ProductDetailContent() {
	const [data, setData] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAddingCart, setIsAddingCart] = useState(false);
	const searchParams = useSearchParams();
	const id = searchParams.get("id") || "";
	const { messageSuccess, messageError } = useMessageStore();

	const items: DescriptionsProps["items"] = [
		{
			key: "price",
			label: <div style={{ minWidth: 50 }}>售价</div>,
			span: 1.5,
			children: <p>{data?.price}￥</p>,
		},
		{
			key: "seller",
			label: "卖家",
			span: 1.5,
			children: <a>{data?.sellerName}</a>,
		},
		{
			key: "num",
			label: "库存",
			span: 1.5,
			children: <p>${data?.num}件</p>,
		},
		{
			key: "details",
			label: "详情",
			children: (
				<Typography.Paragraph
					ellipsis={{
						rows: 1,
						expandable: "collapsible",
						symbol: "展开",
					}}
				>
					{data?.details}
				</Typography.Paragraph>
			),
			span: "filled",
		},
	];

	const handleAddCart = async () => {
		const userId = getStorageItem("id");
		if (!userId) {
			messageError("请先登录");
			return;
		}
		setIsAddingCart(true);
		postInsertCart({ userId, productId: id })
			.then(() => {
				messageSuccess("添加成功");
			})
			.catch(() => {
				messageError("添加失败");
			})
			.finally(() => {
				setIsAddingCart(false);
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			getProductDetails({ id })
				.then(res => {
					setData(res);
				})
				.catch(() => {
					messageError("获取失败");
				})
				.finally(() => {
					setIsLoading(false);
				});
		};

		fetchData();
	}, [id, messageError]);

	return (
		<>
			{isLoading ? (
				<Skeleton active />
			) : (
				<Space
					orientation="vertical"
					size="middle"
					style={{
						width: "100%",
					}}
				>
					<Image src={data?.picture} alt={data?.name} width={300} />
					<Descriptions title={data?.name} items={items} bordered column={4.5} />
					<Button
						type="primary"
						icon={<ShoppingCartOutlined />}
						onClick={handleAddCart}
						disabled={isAddingCart}
					>
						添加到购物车
					</Button>
					<CommentList productId={id} />
				</Space>
			)}
		</>
	);
}
