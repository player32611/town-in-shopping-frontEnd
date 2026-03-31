import request from "@/lib/axios";

export async function getUserById(data: { id: string }) {
	const res = await request.get(`/user/single?id=${data.id}`);
	return res.data;
}

export async function getUserAll() {
	const res = await request.get("/user/list");
	return res.data;
}

export async function postUserLogin(data: { name: string; password: string }) {
	const res = await request.post(`/user/login?name=${data.name}&password=${data.password}`);
	return res.data;
}

export async function postUserRegister(data: { name: string; password: string; avatar: string }) {
	const res = await request.post(
		`/user/register?name=${data.name}&password=${data.password}&&avatar=${data.avatar}`,
	);
	return res.data;
}

export async function postUserDelete(data: { id: string }) {
	const res = await request.post(`/user/delete?id=${data.id}`);
	return res.data;
}

export async function postUserSetRole(data: { userId: string; roleId: string }) {
	const res = await request.post(`/user/setRole?id=${data.userId}&roleId=${data.roleId}`);
	return res.data;
}

export async function postUpdateBalance(data: { userId: string; balance: number }) {
	const res = await request.post(`/user/updateBalance?id=${data.userId}&balance=${data.balance}`);
	return res.data;
}
