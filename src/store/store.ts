import { create } from "zustand";
import type { Store } from "../types/store";
import { createUserSlice } from "./user-slice";
import { immer } from "zustand/middleware/immer";
import { createCartSlice } from "./cart-slice";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export const useStore = create<Store>()(
	devtools(
		persist(
			subscribeWithSelector(
				immer((...p) => ({
					...createUserSlice(...p),
					...createCartSlice(...p),
				})),
			),
			{
				name: "local-storage",
			},
		),
	),
);
