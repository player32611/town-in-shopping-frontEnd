export type Product = {
	id: string;
	name: string;
	price: number;
	picture: string;
	num: number;
	details: string;
};

export interface ProductList extends Product {
	key: string;
}
