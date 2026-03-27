import request from "@/lib/axios";

export async function getUserAll() {
	const res = await request.get("/user/list");
	return res.data;
}

export async function postUserLogin(data: { name: string; password: string }) {
	const res = await request.post(`/user/login?name=${data.name}&password=${data.password}`);
	return res.data;
}

export async function postUserRegister(data: { name: string; password: string }) {
	const res = await request.post(`/user/register?name=${data.name}&password=${data.password}`);
	return res.data;
}

export async function postUserDelete(data: { id: string }) {
	const res = await request.post(`/user/delete?id=${data.id}`);
	return res.data;
}
