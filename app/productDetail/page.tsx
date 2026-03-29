"use client";

import { useState, useEffect } from "react";
import { getProductDetails } from "@/services/product";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import { postInsertCart } from "@/services/cart";
import { getStorageItem } from "@/lib/storage";
import { useMessageStore } from "@/store/messageStore";

import { Button, Descriptions, Image, Skeleton, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from "antd";
import CommentList from "@/components/ui/CommentList";

export default function ProductDetail() {
	const [data, setData] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAddingCart, setIsAddingCart] = useState(false);
	const searchParams = useSearchParams();
	const id = searchParams.get("id") || "";
	const { messageSuccess, messageError } = useMessageStore();

	const items: DescriptionsProps["items"] = [
		{
			key: "price",
			label: "价格",
			children: `${data?.price}￥`,
		},
		{
			key: "num",
			label: "库存",
			children: `${data?.num}件`,
		},
		{
			key: "3",
			label: "Live",
			children: "Hangzhou, Zhejiang",
		},
		{
			key: "4",
			label: "Remark",
			children: "empty",
		},
		{
			key: "5",
			label: "Address",
			children: "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
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
				.finally(() => {
					setIsLoading(false);
				});
		};

		fetchData();
	}, [id]);

	return (
		<>
			{isLoading ? (
				<Skeleton active />
			) : (
				<Space orientation="vertical" size="middle">
					<Image src={data?.picture} alt={data?.name} width={300} />
					<Descriptions title={data?.name} items={items} />
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
