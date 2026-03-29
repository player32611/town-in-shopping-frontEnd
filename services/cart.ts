import request from "@/lib/axios";

export async function getCartList(data: { userId: string }) {
	const res = await request.get(`/cart/list?userId=${data.userId}`);
	return res.data;
}
