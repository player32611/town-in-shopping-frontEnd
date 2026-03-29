import type { CartItemProps } from "@/types/component";

import { Button, Image, InputNumber, Popconfirm } from "antd";

import "./index.scss";

export default function CartItem(props: CartItemProps) {
	return (
		<div className="product">
			<Image src={props.picture} alt={props.name}></Image>
			<div className="product_details">
				<span>{props.name}</span>
				<p>添加日期：{props.addTime}</p>
			</div>
			<InputNumber
				mode="spinner"
				placeholder="Outlined"
				value={props.amount}
				style={{
					width: 150,
				}}
				onChange={value => props.onChange(props.id, props.productId, value)}
			/>
			<div className="price small">{props.price}￥</div>

			<Popconfirm
				title="确定要把该商品从购物车中移除吗?"
				onConfirm={() => props.onDelete(props.id)}
				okText="确定"
				cancelText="取消"
			>
				<Button color="danger" variant="solid">
					删除
				</Button>
			</Popconfirm>
		</div>
	);
}
