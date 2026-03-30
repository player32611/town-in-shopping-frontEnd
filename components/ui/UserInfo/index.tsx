import { useEffect, useState } from "react";
import { getUserById } from "@/services/user";
import { getStorageItem, removeStorageItem, setStorageItem } from "@/lib/storage";

import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
	{
		key: "signOut",
		label: <a>退出登录</a>,
	},
];

const onClick: MenuProps["onClick"] = ({ key }) => {
	if (key === "signOut") {
		removeStorageItem("id");
		removeStorageItem("name");
		removeStorageItem("avatar");
		removeStorageItem("roleId");
		removeStorageItem("balance");
		window.location.reload();
	}
};

export default function UserInfo(props: { handleLogin: () => void }) {
	const [isLoading, setIsLoading] = useState(true);
	const [userName, setUserName] = useState<string | null>(null);
	const [userAvatar, setUserAvatar] = useState<string | null>(null);
	const [balance, setBalance] = useState<number | null>(null);

	useEffect(() => {
		const getData = () => {
			const id = getStorageItem("id");
			if (!id) return;
			setIsLoading(true);
			getUserById({ id })
				.then(res => {
					setUserName(res.name);
					setUserAvatar(res.avatar);
					setBalance(res.balance);
					setStorageItem("name", res.name);
					setStorageItem("avatar", res.avatar);
					setStorageItem("balance", res.balance);
				})
				.finally(() => {
					setIsLoading(false);
				});
		};

		getData();
	}, []);

	return (
		<>
			{isLoading ? (
				<Space wrap size={16} align="center">
					<a>加载中...</a>
					<Avatar icon={<UserOutlined />} />
				</Space>
			) : (
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
			)}
		</>
	);
}
