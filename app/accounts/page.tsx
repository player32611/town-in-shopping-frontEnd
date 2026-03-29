"use client";

import type { UserList } from "@/types/user";
import { getUserAll } from "@/services/user";
import { postUserDelete } from "@/services/user";
import { useEffect, useState } from "react";
import { useMessageStore } from "@/store/messageStore";

import { Avatar, Button, Empty, Popconfirm, Skeleton, Space, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { getStorageItem } from "@/lib/storage";

type ColumnsType<T extends object> = TableProps<T>["columns"];

export default function Accounts() {
	const [data, setData] = useState<UserList[]>([]);
	const [loading, setLoading] = useState(true);
	const { messageSuccess, messageError } = useMessageStore();

	const columns: ColumnsType<UserList> = [
		{
			title: "id",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "昵称",
			dataIndex: "name",
			key: "name",
			render: text => <a>{text}</a>,
		},
		{
			title: "用户头像",
			dataIndex: "avatar",
			key: "avatar",
			render: avatar => <Avatar size="large" src={avatar} icon={<UserOutlined />}></Avatar>,
		},
		{
			title: "身份",
			dataIndex: "roleId",
			key: "roleId",
			render: roleId => {
				switch (roleId) {
					case 1:
						return <Space size="middle">管理员</Space>;
					case 2:
						return <Space size="middle">商家</Space>;
					default:
						return <Space size="middle">普通用户</Space>;
				}
			},
		},
		{
			title: "余额",
			dataIndex: "balance",
			key: "balance",
			render: balance => <Space size="middle">{`${balance}￥`}</Space>,
		},
		{
			key: "delete",
			render: (_, record) => (
				<Popconfirm
					title="确定要删除该用户吗？"
					okText="确定"
					cancelText="取消"
					onConfirm={() => handleDelete(record.id)}
				>
					<Button type="primary" disabled={getStorageItem("id") == record.id.toString()} danger>
						删除
					</Button>
				</Popconfirm>
			),
		},
	];

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const list = await getUserAll();
			list.map((item: UserList) => {
				item.key = item.id;
			});
			setData(list);
		} catch (error) {
			console.error("Failed to fetch users:", error);
			setData([]);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = (id: string) => {
		if (!getStorageItem("id")) {
			messageError("请先登录");
			return;
		} else if (getStorageItem("roleId") !== "1") {
			messageError("无权限");
			return;
		}
		postUserDelete({ id })
			.then(res => {
				if (res) {
					messageSuccess("删除成功");
				} else {
					messageError("删除失败");
				}
			})
			.finally(() => {
				fetchUsers();
			});
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<>
			<>
				{loading ? (
					<>
						<Skeleton
							active
							style={{
								marginBottom: 20,
							}}
						/>
						<Skeleton
							active
							style={{
								marginBottom: 20,
							}}
						/>
					</>
				) : (
					<Table<UserList>
						columns={columns}
						pagination={{ placement: ["bottomCenter"] }}
						dataSource={data}
						locale={{ emptyText: <Empty description="暂无数据" /> }}
					/>
				)}
			</>
		</>
	);
}
