import { create, type StateCreator } from "zustand";

type UserState = {
	userName: string;
	fullName: string;
	age: number;
	address: string;
};

type UserAction = {
	setAddress: (address: string) => void;
	fetchUser: () => Promise<void>;
};

export type UserSlice = UserState & UserAction;

export const createUserSlice: StateCreator<
	UserSlice,
	[["zustand/immer", never]],
	[],
	UserSlice
> = (set) => ({
	address: "",
	fullName: "",
	userName: "",
	age: 0,
	setAddress: (address) =>
		set((state) => {
			state.address = address;
		}),
	fetchUser: async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		set({
			address: "1234 Main St",
			fullName: "Alexander",
			userName: "alexto@test.com",
			age: 25,
		});
	},
});
