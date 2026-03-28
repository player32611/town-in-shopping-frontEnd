import type { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export type CommentProps = {
	id: string;
	username: string;
	avatar: string;
	content: string;
	likes: string;
	createTime: string;
	rate: number;
};

export type CommentListProps = {
	productId: string;
};
