"use client";

import type { UserList } from "@/types/user";
import type { ColumnsType } from "@/types/component";
import { getUserAll, postUserSetRole } from "@/services/user";
import { postUserDelete } from "@/services/user";
import { useEffect, useState } from "react";
import { useMessageStore } from "@/store/messageStore";

import { Avatar, Button, Empty, Popconfirm, Select, Skeleton, Space, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getStorageItem } from "@/lib/storage";

export default function AccountManage() {
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
			render: (roleId, record) => {
				const getRoleName = (roleId: number) => {
					switch (roleId) {
						case 1:
							return "管理员";
						case 2:
							return "商家";
						default:
							return "普通用户";
					}
				};
				return getStorageItem("roleId") == "1" ? (
					<Select
						defaultValue={getRoleName(roleId)}
						style={{ width: 120 }}
						onChange={value => handleSetRole(record.id, value)}
						disabled={getStorageItem("id") == record.id.toString()}
						options={[
							{ value: "1", label: "管理员" },
							{ value: "2", label: "商家" },
							{ value: "3", label: "普通用户" },
						]}
					/>
				) : (
					<Space>{getRoleName(roleId)}</Space>
				);
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

	const handleSetRole = (userId: string, roleId: string) => {
		postUserSetRole({ userId, roleId })
			.then(() => {
				messageSuccess("修改成功");
			})
			.catch(() => {
				messageError("修改失败");
			});
	};

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
	);
}
