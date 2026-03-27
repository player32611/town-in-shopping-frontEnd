import type { MenuItem } from "@/types/component";
import { useRouter } from "next/navigation";
import { getStorageItem } from "@/lib/storage";
import { useMessageStore } from "@/store/messageStore";

import {
	DesktopOutlined,
	ShoppingCartOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem("首页", "/", <DesktopOutlined />),
	getItem("购物车", "/cart", <ShoppingCartOutlined />),
	// getItem("User", "sub1", <UserOutlined />, [
	// 	getItem("Tom", "3"),
	// 	getItem("Bill", "4"),
	// 	getItem("Alex", "5"),
	// ]),
	getItem("账号管理", "/accounts", <TeamOutlined />),
	// getItem("个人中心", "9", <UserOutlined />),
];

export default function SiderBar() {
	const router = useRouter();
	const { messageError } = useMessageStore();

	const handleClick = (key: string) => {
		switch (key) {
			case "/accounts":
				if (getStorageItem("roleId") === "1") {
					router.push("/accounts");
				} else {
					messageError("无权限，请联系管理员");
				}
				break;
			default:
				break;
		}
		router.push(key);
	};

	return (
		<>
			<div className="demo-logo-vertical"></div>
			<Menu
				theme="dark"
				defaultSelectedKeys={["/"]}
				mode="inline"
				items={items}
				onClick={({ key }) => handleClick(key)}
			/>
		</>
	);
}
