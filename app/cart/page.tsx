"use client";

import { useEffect, useState } from "react";
import { useMessageStore } from "@/store/messageStore";
import { getCartList, postUpdateCartAmount, postDeleteCartItem } from "@/services/cart";
import { postUpdateBalance } from "@/services/user";
import { getStorageItem } from "@/lib/storage";
import type { Cart } from "@/types/cart";

import { Button, Checkbox, Col, Empty, Modal, Row, Skeleton, Spin } from "antd";
import type { CheckboxProps } from "antd";
import CartItem from "@/components/commen/CartItem";
import "./index.scss";

export default function Cart() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isShowModal, setIsShowModal] = useState<boolean>(false);
	const [data, setData] = useState<Cart[]>([]);
	const [checkedList, setCheckedList] = useState<string[]>([]);
	const checkAll = data.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < data.length;
	const { messageSuccess, messageError } = useMessageStore();

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

	const onChangeAmount = (cartId: string, productId: string, value: number | null) => {
		if (!value) return;
		postUpdateCartAmount({ userId: getStorageItem("id"), productId, amount: value })
			.then(() => {
				const newData = structuredClone(data);
				newData[data.findIndex(item => item.id === cartId)].amount = value;
				setData(newData);
			})
			.catch(() => {
				messageError("添加失败");
			});
	};

	const onDeleteCartItem = (id: string) => {
		setIsLoading(true);
		postDeleteCartItem({ id })
			.then(() => {
				messageSuccess("删除成功");
				setData(data.filter(item => item.id !== id));
			})
			.catch(() => {
				messageError("删除失败");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const getTotalPrice = () => {
		let total = 0;
		data.forEach(item => {
			if (checkedList.includes(item.id)) {
				total += item.price * item.amount;
			}
		});
		return total;
	};
	const onBuyProducts = () => {
		const userId = getStorageItem("id");
		const balanceStr = getStorageItem("balance");
		const balance = balanceStr ? parseFloat(balanceStr) : 0;
		if (!userId) {
			messageError("请先登录");
			return;
		}
		const total = getTotalPrice();
		if (!balance || balance < total) {
			messageError("余额不足");
		}
		setIsLoading(true);
		postUpdateBalance({ userId, balance: balance - getTotalPrice() })
			.then(() => {
				messageSuccess("支付成功");
				setIsShowModal(false);
				window.location.reload();
			})
			.catch(() => {
				messageError("支付失败");
			})
			.finally(() => {
				setIsLoading(false);
			});
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
												productId={item.productId}
												name={item.name}
												picture={item.picture}
												price={item.price}
												amount={item.amount}
												addTime={item.addTime}
												onChange={onChangeAmount}
												onDelete={onDeleteCartItem}
											></CartItem>
										</Col>
									</Row>
								))
							) : (
								<Empty description="暂无数据" />
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
							<label className="price">合计：{getTotalPrice()}￥</label>
							<Button
								type="primary"
								disabled={!getTotalPrice()}
								onClick={() => setIsShowModal(true)}
							>
								立即购买
							</Button>
						</div>
					</div>
					<Modal
						title="确定要支付吗？"
						closable={{ "aria-label": "Custom Close Button" }}
						open={isShowModal}
						onOk={onBuyProducts}
						onCancel={() => setIsShowModal(false)}
						footer={[
							<Button key="back" onClick={() => setIsShowModal(false)}>
								取消支付
							</Button>,
							<Button key="submit" type="primary" onClick={onBuyProducts}>
								确认支付
							</Button>,
						]}
					>
						<p>合计：{getTotalPrice()}￥</p>
						<p>当前余额：{getStorageItem("balance")}￥</p>
					</Modal>
					<Spin spinning={isLoading} fullscreen />
				</>
			)}
		</>
	);
}
