import request from "@/lib/axios";

export async function getProductSearch(data: { keyword: string }) {
	const res = await request.get(`/product/search?keyword=${data.keyword}`);
	return res.data;
}

export async function getProductDetails(data: { id: string }) {
	const res = await request.get(`/product/item?id=${data.id}`);
	return res.data;
}

export async function getProductByUser(data: { id: string }) {
	const res = await request.get(`/product/user?userId=${data.id}`);
	return res.data;
}

export async function addProduct(data: {
	userId: string;
	name: string;
	price: number;
	picture: string;
	num: number;
	details: string;
}) {
	const res = await request.post(
		`/product/add?name=${data.name}&price=${data.price}&picture=${data.picture}&num=${data.num}&details=${data.details}&userId=${data.userId}`,
	);
	return res.data;
}

export async function deleteProduct(data: { id: string }) {
	const res = await request.post(`/product/delete?id=${data.id}`);
	return res.data;
}
