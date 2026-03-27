import { create } from "zustand";
import type { MessageStoreState } from "@/types/store";

export const useMessageStore = create<MessageStoreState>((set, get) => ({
	messageApi: null,

	initMessageApi: messageApi =>
		set(() => ({
			messageApi,
		})),

	messageSuccess: (content: string) => {
		const messageApi = get().messageApi;
		if (!messageApi) return;
		messageApi.open({
			type: "success",
			content,
		});
	},

	messageError: (content: string) => {
		const messageApi = get().messageApi;
		if (!messageApi) return;
		messageApi.open({
			type: "error",
			content,
		});
	},
}));
