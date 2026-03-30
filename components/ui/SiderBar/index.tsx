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
import { Flex, Menu } from "antd";
import Logo from "@/components/commen/Logo";

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
		const roleId = getStorageItem("roleId");
		switch (key) {
			case "/productManage":
				if (roleId === "1" || roleId === "2") {
					router.push("/productManage");
				} else {
					messageError("无权限，请联系管理员");
				}
				break;
			case "/accountManage":
				if (roleId === "1") {
					router.push("/accountManage");
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
			<Flex
				justify="center"
				align="center"
				style={{
					margin: "10px 0",
				}}
			>
				<Logo></Logo>
			</Flex>
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
