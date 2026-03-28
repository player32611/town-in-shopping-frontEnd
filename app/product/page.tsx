"use client";

import { useState, useEffect } from "react";
import { getProductDetails } from "@/services/product";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";

import { Button, Descriptions, Image, Skeleton, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from "antd";
import CommentList from "@/components/ui/CommentList";

export default function Product() {
	const [data, setData] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const searchParams = useSearchParams();
	const id = searchParams.get("id") || "";

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

	return (
		<>
			{isLoading ? (
				<Skeleton active />
			) : (
				<Space orientation="vertical" size="middle">
					<Image src={data?.picture} alt={data?.name} width={300} />
					<Descriptions title={data?.name} items={items} />
					<Button type="primary" icon={<ShoppingCartOutlined />}>
						添加到购物车
					</Button>
					<CommentList productId={id} />
				</Space>
			)}
		</>
	);
}
