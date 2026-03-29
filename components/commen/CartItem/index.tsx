import type { CartItemProps } from "@/types/component";

import { Image } from "antd";

import "./index.scss";

export default function CartItem(props: CartItemProps) {
	return (
		<div className="product">
			<Image src={props.picture} alt={props.name}></Image>
			<div className="product_details">
				<span>{props.name}</span>
				<p>添加日期：{props.addTime}</p>
			</div>
			{props.children}
			<div className="price small">{props.price}￥</div>
		</div>
	);
}
