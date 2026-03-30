import { useEffect, useState } from "react";
import { getUserById } from "@/services/user";
import { useMessageStore } from "@/store/messageStore";
import { postUpdateBalance } from "@/services/user";
import { getStorageItem, removeStorageItem, setStorageItem } from "@/lib/storage";

import type { MenuProps } from "antd";
import {
	Avatar,
	Button,
	Dropdown,
	Flex,
	InputNumber,
	Modal,
	QRCode,
	Space,
	Typography,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

const items: MenuProps["items"] = [
	{
		key: "signOut",
		label: <a>退出登录</a>,
	},
	{
		key: "topUp",
		label: <a>余额充值</a>,
	},
];

export default function UserInfo(props: { handleLogin: () => void }) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPaying, setIsPaying] = useState<boolean>(false);
	const [payingState, setPayingState] = useState<number>(1);
	const [payingAmount, setPayingAmount] = useState<number>(1);
	const [userName, setUserName] = useState<string | null>(null);
	const [userAvatar, setUserAvatar] = useState<string | null>(null);
	const [balance, setBalance] = useState<number | null>(null);
	const { messageError } = useMessageStore();

	const onClick: MenuProps["onClick"] = ({ key }) => {
		switch (key) {
			case "signOut":
				removeStorageItem("id");
				removeStorageItem("name");
				removeStorageItem("avatar");
				removeStorageItem("roleId");
				removeStorageItem("balance");
				window.location.reload();
				break;
			case "topUp":
				setIsPaying(true);
				break;
		}
	};
	const handlePaying = () => {
		const id = getStorageItem("id");
		if (!id) {
			messageError("请先登录");
			return;
		} else if (balance === null) {
			messageError("请先登录");
			return;
		}
		switch (payingState) {
			case 1:
				setPayingState(2);
				break;
			case 2:
				postUpdateBalance({ userId: id, balance: balance + payingAmount })
					.then(() => {
						window.location.reload();
					})
					.catch(() => {
						messageError("充值失败");
					});
				break;
		}
	};

	const handleCancelPaying = () => {
		setIsPaying(false);
		setPayingState(1);
	};

	useEffect(() => {
		const getData = () => {
			const id = getStorageItem("id");
			if (!id) {
				return;
			}
			setIsLoading(true);
			getUserById({ id })
				.then(res => {
					setUserName(res.name);
					setUserAvatar(res.avatar);
					setBalance(res.balance);
					setStorageItem("name", res.name);
					setStorageItem("avatar", res.avatar);
					setStorageItem("roleId", res.roleId);
					setStorageItem("balance", res.balance);
				})
				.catch(() => {
					messageError("获取用户信息失败");
				})
				.finally(() => {
					setIsLoading(false);
				});
		};

		getData();
	}, [messageError]);

	return (
		<>
			{isLoading ? (
				<Space wrap size={16} align="center">
					<a>加载中...</a>
					<Avatar icon={<UserOutlined />} />
				</Space>
			) : (
				<>
					<Space wrap size={16} align="center">
						{userName ? (
							<Dropdown menu={{ items, onClick }} trigger={["click"]}>
								<a onClick={e => e.preventDefault()}>
									<Space>
										{userName}
										<DownOutlined />
									</Space>
								</a>
							</Dropdown>
						) : (
							<a onClick={props.handleLogin}>点击登录</a>
						)}
						<Avatar size="large" src={userAvatar} icon={<UserOutlined />} />
						<div>账户余额：{balance}￥</div>
					</Space>
					<Modal
						title="余额充值"
						closable={{ "aria-label": "Custom Close Button" }}
						open={isPaying}
						onOk={handlePaying}
						onCancel={handleCancelPaying}
						footer={[
							<Button key="back" onClick={handleCancelPaying}>
								取消充值
							</Button>,
							<Button key="submit" type="primary" onClick={handlePaying}>
								{payingState === 1 ? "下一步" : "确认充值"}
							</Button>,
						]}
					>
						{payingState === 1 ? (
							<div>
								充值金额：
								<InputNumber<number>
									min={1}
									value={payingAmount}
									onChange={value => value !== null && setPayingAmount(value)}
									formatter={value => `${value}￥`}
									parser={value => value?.replace("￥", "") as unknown as number}
								></InputNumber>
							</div>
						) : (
							<Flex align="center" vertical>
								<Title level={5}>扫描二维码以充值</Title>
								<QRCode value="https://www.bilibili.com/video/BV1GJ411x7h7/?spm_id_from=333.337.search-card.all.click" />
							</Flex>
						)}
					</Modal>
				</>
			)}
		</>
	);
}
