import request from "@/lib/axios";

export async function getProductSearch(data: { keyword: string }) {
	const res = await request.get(`/product/search?keyword=${data.keyword}`);
	return res.data;
}
