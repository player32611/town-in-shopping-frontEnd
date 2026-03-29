import type { MenuItem } from "@/types/component";
import { usePathname, useRouter } from "next/navigation";
import { getStorageItem } from "@/lib/storage";
import { useMessageStore } from "@/store/messageStore";

import {
	AccountBookOutlined,
	DesktopOutlined,
	ShoppingCartOutlined,
	TeamOutlined,
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
	getItem("商品管理", "/productManage", <AccountBookOutlined />),
	getItem("账号管理", "/accountManage", <TeamOutlined />),
];

export default function SiderBar() {
	const router = useRouter();
	const pathName = usePathname();
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
				router.push(key);
				break;
		}
	};

	return (
		<>
			<div className="demo-logo-vertical"></div>
			<Menu
				theme="dark"
				selectedKeys={[pathName]}
				mode="inline"
				items={items}
				onClick={({ key }) => handleClick(key)}
			/>
		</>
	);
}
