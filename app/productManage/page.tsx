"use client";

import { useState } from "react";
import { MenuItem } from "@/types/component";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import ListedProducts from "@/components/ui/ListedProducts";

const items: MenuItem[] = [
	{
		label: "上架商品",
		key: "listedProducts",
	},
	{
		label: "退货管理",
		key: "returnManage",
	},
];

export default function ProductManage() {
	const [current, setCurrent] = useState("listedProducts");

	const onClick: MenuProps["onClick"] = e => {
		console.log("click ", e);
		setCurrent(e.key);
	};

	return (
		<>
			<Menu
				onClick={onClick}
				selectedKeys={[current]}
				mode="horizontal"
				items={items}
				style={{
					marginBottom: 20,
				}}
			/>
			<ListedProducts />
		</>
	);
}
