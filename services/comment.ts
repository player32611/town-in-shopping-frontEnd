import request from "@/lib/axios";

export async function getCommentList(data: { productId: string }) {
	const res = await request.get(`/comment/list?productId=${data.productId}`);
	return res.data;
}
