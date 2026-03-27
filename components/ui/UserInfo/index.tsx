import { useEffect, useState } from "react";

import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { getStorageItem } from "@/lib/storage";

const items: MenuProps["items"] = [
	{
		key: "signOut",
		label: <a>退出登录</a>,
	},
];

const onClick: MenuProps["onClick"] = ({ key }) => {
	if (key === "signOut") {
		localStorage.removeItem("name");
		localStorage.removeItem("avatar");
		localStorage.removeItem("roleId");
		window.location.reload();
	}
};

export default function UserInfo(props: { handleLogin: () => void }) {
	const [name, setName] = useState<string | null>();

	useEffect(() => {
		const storedName = getStorageItem("name");
		if (storedName) setName(storedName);
	}, [setName]);

	return (
		<Space wrap size={16} align="center">
			{name ? (
				<Dropdown menu={{ items, onClick }} trigger={["click"]}>
					<a onClick={e => e.preventDefault()}>
						<Space>
							{name}
							<DownOutlined />
						</Space>
					</a>
				</Dropdown>
			) : (
				<a onClick={props.handleLogin}>点击登录</a>
			)}
			<Avatar icon={<UserOutlined />} />
		</Space>
	);
}
