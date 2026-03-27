import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

// 创建实例
const request: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// 请求拦截器
request.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 客户端环境才操作 localStorage
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("token");
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

// 响应拦截器
request.interceptors.response.use(
	response => response.data,
	(error: AxiosError) => {
		// 统一错误处理
		if (error.response?.status === 401 || error.response?.status === 500) {
			// 处理未授权
			if (typeof window !== "undefined") {
				// localStorage.removeItem("token");
				// window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	},
);

export default request;
