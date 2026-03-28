import { useCallback, useEffect, useState } from "react";

import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { getStorageItem, removeStorageItem } from "@/lib/storage";

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
		window.location.reload();
	}
};

export default function UserInfo(props: { handleLogin: () => void }) {
	const [isLoading, setIsLoading] = useState(true);
	const [userName, setUserName] = useState<string | null>(null);
	const [userAvatar, setUserAvatar] = useState<string | null>(null);

	const getData = useCallback(() => {
		const name = getStorageItem("name");
		const avatar = getStorageItem("avatar");
		setUserName(name);
		setUserAvatar(avatar);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		getData();
	}, [getData]);

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
				</Space>
			)}
		</>
	);
}
