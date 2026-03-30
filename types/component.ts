import { Rate } from "antd";
import type { GetRef, MenuProps, TableProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export type ColumnsType<T extends object> = TableProps<T>["columns"];

export type CartItemProps = {
	id: string;
	productId: string;
	name: string;
	picture: string;
	price: number;
	amount: number;
	addTime: string;
	onChange: (id: string, productId: string, amount: number | null) => void;
	onDelete: (id: string) => void;
};

export type CommentProps = {
	id: string;
	username: string;
	avatar: string;
	content: string;
	likes: number;
	createTime: string;
	rate: number;
};

export type CommentListProps = {
	productId: string;
};

export type RateRef = GetRef<typeof Rate>;

export type AddProductsProps = {
	isOpen: boolean;
	handleClose: () => void;
	refresh: () => void;
};

export type AddProductsDetails = {
	name: string;
	price: number;
	picture: string;
	num: number;
	details: string;
};
