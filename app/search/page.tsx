"use client";

import { useState, useEffect } from "react";
import { getProductSearch } from "@/services/product";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";

import { Flex, Pagination, Empty, Skeleton, Space } from "antd";
import ProductCard from "@/components/commen/ProductCard";

export default function Search() {
	const [data, setData] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const searchParams = useSearchParams();
	const keyword = searchParams.get("keyword") || "";

	useEffect(() => {
		const fetchData = async () => {
			getProductSearch({ keyword })
				.then(res => {
					setData(res);
				})
				.finally(() => {
					setIsLoading(false);
				});
		};

		if (keyword !== null) {
			fetchData();
		}
	}, [keyword]);

	return (
		<>
			{isLoading ? (
				<Skeleton active />
			) : (
				<>
					{data.length === 0 ? (
						<Empty description="暂无数据" />
					) : (
						<Space orientation="vertical" size="middle" style={{ display: "flex" }}>
							<Flex wrap gap={"middle"} justify="space-evenly">
								{data.map(item => (
									<ProductCard
										key={item.id}
										id={item.id}
										name={item.name}
										price={item.price}
										description={item.details}
										image={item.picture}
									/>
								))}
								{data.map(item => (
									<ProductCard
										key={item.id}
										id={item.id}
										name={item.name}
										price={item.price}
										description={item.details}
										image={item.picture}
									/>
								))}
								{data.map(item => (
									<ProductCard
										key={item.id}
										id={item.id}
										name={item.name}
										price={item.price}
										description={item.details}
										image={item.picture}
									/>
								))}
								{data.map(item => (
									<ProductCard
										key={item.id}
										id={item.id}
										name={item.name}
										price={item.price}
										description={item.details}
										image={item.picture}
									/>
								))}
								{data.map(item => (
									<ProductCard
										key={item.id}
										id={item.id}
										name={item.name}
										price={item.price}
										description={item.details}
										image={item.picture}
									/>
								))}
							</Flex>
							<Flex justify="center">
								<Pagination defaultCurrent={1} total={50} />
							</Flex>
						</Space>
					)}
				</>
			)}
		</>
	);
}
