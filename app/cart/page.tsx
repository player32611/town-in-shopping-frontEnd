"use client";

import { useEffect, useState } from "react";
import { useMessageStore } from "@/store/messageStore";
import { getCartList } from "@/services/cart";
import { getStorageItem } from "@/lib/storage";
import type { Cart } from "@/types/cart";

import { Button, Checkbox, Col, Empty, InputNumber, Row, Skeleton } from "antd";
import type { CheckboxProps } from "antd";
import CartItem from "@/components/commen/CartItem";
import "./index.scss";

export default function Cart() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<Cart[]>([]);
	const [checkedList, setCheckedList] = useState<string[]>([]);
	const checkAll = data.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < data.length;
	const { messageError } = useMessageStore();

	const onCheck = (itemId: string, checked: boolean) => {
		if (checked) {
			setCheckedList(prev => [...prev, itemId]);
		} else {
			setCheckedList(prev => prev.filter(id => id !== itemId));
		}
	};

	const onCheckAllChange: CheckboxProps["onChange"] = e => {
		setCheckedList(e.target.checked ? data.map(item => item.id) : []);
	};

	const onChangeAmount = (id: string, value: number | null) => {
		if (!value) return;
		const newData = structuredClone(data);
		newData[data.findIndex(item => item.id === id)].amount = value;
		setData(newData);
	};

	// const sharedProps = {
	// 	mode: "spinner" as const,
	// 	min: 1,
	// 	max: 10,
	// 	onChange: onChangeAmount,
	// };

	const getTotalPrice = () => {
		let total = 0;
		data.forEach(item => {
			if (checkedList.includes(item.id)) {
				total += item.price * item.amount;
			}
		});
		return total;
	};

	useEffect(() => {
		const fetchData = async () => {
			const userId = getStorageItem("id");
			if (!userId) {
				messageError("请先登录");
				return;
			}
			setIsLoading(true);
			getCartList({ userId })
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
	}, [messageError]);

	return (
		<>
			{isLoading ? (
				<Skeleton />
			) : (
				<>
					<div className="cart">
						<div className="products">
							{data.length ? (
								data.map(item => (
									<Row key={item.id} align="middle">
										<Col flex="30px">
											<Checkbox
												checked={checkedList.includes(item.id)}
												onChange={e => onCheck(item.id, e.target.checked)}
											></Checkbox>
										</Col>
										<Col flex="auto">
											<CartItem
												id={item.id}
												name={item.name}
												picture={item.picture}
												price={item.price}
												amount={item.amount}
												addTime={item.addTime}
											>
												<InputNumber
													mode="spinner"
													placeholder="Outlined"
													value={item.amount}
													style={{
														width: 150,
													}}
													onChange={value => onChangeAmount(item.id, value)}
												/>
											</CartItem>
										</Col>
									</Row>
								))
							) : (
								<Empty />
							)}
						</div>
					</div>
					<div className="checkout">
						<div className="details">
							<span>
								<Checkbox
									indeterminate={indeterminate}
									onChange={onCheckAllChange}
									checked={checkAll}
								>
									全选
								</Checkbox>
							</span>
						</div>
						<div className="checkout--footer">
							<label className="price">{getTotalPrice()}￥</label>
							<Button type="primary">立即购买</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
}
