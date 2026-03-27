"use client";

import React, { useEffect, useState } from "react";
import { useMessageStore } from "@/store/messageStore";

import { Flex, Layout, message, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import SearchBar from "@/components/commen/SearchBar";
import Login from "@/components/ui/Login";
import SiderBar from "@/components/ui/SiderBar";
import UserInfo from "@/components/ui/UserInfo";
import "./global.scss";

const { Header, Content, Footer, Sider } = Layout;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const { initMessageApi } = useMessageStore();

	useEffect(() => {
		initMessageApi(messageApi);
	}, [messageApi, initMessageApi]);

	const handleLogin = () => setIsModalOpen(true);

	return (
		<html>
			<body>
				<AntdRegistry>
					{contextHolder}
					<Layout style={{ minHeight: "100vh" }}>
						<Sider>
							<SiderBar />
						</Sider>
						<Layout>
							<Header style={{ padding: 0, background: colorBgContainer }}>
								<Flex
									align="center"
									justify="space-evenly"
									style={{ height: "100%", width: "100%" }}
								>
									<SearchBar />
									<UserInfo handleLogin={handleLogin} />
								</Flex>
							</Header>
							<Content style={{ margin: "16px" }}>
								<div
									style={{
										padding: 24,
										minHeight: 360,
										background: colorBgContainer,
										borderRadius: borderRadiusLG,
									}}
								>
									{children}
								</div>
							</Content>
							<Footer style={{ textAlign: "center" }}>购物网 ©{new Date().getFullYear()}</Footer>
						</Layout>
					</Layout>
					<Login isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
				</AntdRegistry>
			</body>
		</html>
	);
}
