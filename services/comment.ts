import request from "@/lib/axios";

export async function getCommentList(data: { productId: string }) {
	const res = await request.get(`/comment/list?productId=${data.productId}`);
	return res.data;
}

export async function addComment(data: {
	content: string;
	rate: number;
	productId: string;
	userId: string;
}) {
	const res = await request.post(
		`/comment/add?content=${data.content}&rate=${data.rate}&productId=${data.productId}&userId=${data.userId}`,
	);
	return res.data;
}

export async function likeComment(data: { id: string }) {
	const res = await request.post(`/comment/like?id=${data.id}`);
	return res.data;
}
