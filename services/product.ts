import request from "@/lib/axios";

export async function getProductSearch(data: { keyword: string }) {
	const res = await request.get(`/product/search?keyword=${data.keyword}`);
	return res.data;
}

export async function getProductDetails(data: { id: string }) {
	const res = await request.get(`/product/item?id=${data.id}`);
	return res.data;
}
