import type { Product } from "../types/product";
import type { CartProduct } from "../types/cartProduct";
import type { StateCreator } from "zustand";

type CartState = {
	products: CartProduct[];
	total: number;
};

type CartAction = {
	addProduct: (product: Product) => void;
	removeProduct: (productId: string) => void;
	incQuantity: (productId: string) => void;
	decQuantity: (productId: string) => void;
	getProductById: (productId: string) => CartProduct | undefined;
	setTotal: (total: number) => void;
	reset: () => void;
};

const initialState: CartState = {
	products: [],
	total: 0,
};

export type CartSlice = CartState & CartAction;

export const createCartSlice: StateCreator<
	CartSlice,
	[["zustand/immer", never]],
	[],
	CartSlice
> = (set, get) => ({
	...initialState,
	incQuantity: (productId) =>
		set((state) => {
			const foundProduct = state.products.find(
				(product) => product.id === productId,
			);
			if (foundProduct) {
				foundProduct.qty += 1;
			}
		}),
	decQuantity: (productId) =>
		set((state) => {
			const foundIndex = state.products.findIndex(
				(product) => product.id === productId,
			);
			if (foundIndex !== -1) {
				if (state.products[foundIndex].qty === 1) {
					state.products.splice(foundIndex, 1);
				} else {
					state.products[foundIndex].qty -= 1;
				}
			}
		}),
	addProduct: (product) =>
		set((state) => {
			state.products.push({ ...product, qty: 1 });
		}),
	removeProduct: (productId) =>
		set((state) => {
			state.products = state.products.filter(
				(product) => product.id !== productId,
			);
		}),
	getProductById: (productId) =>
		get().products.find((product) => product.id === productId),
	setTotal: (total) =>
		set((state) => {
			state.total = total;
		}),
	reset: () => set(() => initialState),
});
