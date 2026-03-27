export type User = {
	id: string;
	name: string;
	password: string;
	avatar: string;
	role_id: number;
	balance: number;
};

export interface UserList extends User {
	key: string;
}
