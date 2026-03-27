import type { MessageInstance } from "antd/es/message/interface";

export type MessageStoreState = {
	messageApi: MessageInstance | null;
	initMessageApi: (messageApi: MessageInstance) => void;
	messageSuccess: (content: string) => void;
	messageError: (content: string) => void;
};
