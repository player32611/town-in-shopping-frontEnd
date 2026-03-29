import request from "@/lib/axios";

export async function getCartList(data: { userId: string }) {
	const res = await request.get(`/cart/list?userId=${data.userId}`);
	return res.data;
}

export async function postInsertCart(data: { userId: string | null; productId: string }) {
	const res = await request.post(`/cart/insert?userId=${data.userId}&productId=${data.productId}`);
	return res.data;
}

export async function postUpdateCartAmount(data: {
	userId: string | null;
	productId: string;
	amount: number;
}) {
	const res = await request.post(
		`/cart/updateAmount?userId=${data.userId}&productId=${data.productId}&amount=${data.amount}`,
	);
	return res.data;
}

export async function postDeleteCartItem(data: { id: string }) {
	const res = await request.post(`/cart/delete?id=${data.id}`);
	return res.data;
}
