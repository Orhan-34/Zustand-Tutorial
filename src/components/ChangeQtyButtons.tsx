import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store/store";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";

type Props = { productId: string };

export function ChangeQtyButtons({ productId }: Props) {
	const { getProductById, decQuantity, incQuantity, setTotal } = useStore(
		useShallow((state) => ({
			getProductById: state.getProductById,
			decQuantity: state.decQuantity,
			incQuantity: state.incQuantity,
			setTotal: state.setTotal,
		})),
	);
	const product = getProductById(productId);

	useEffect(() => {
		const sub = useStore.subscribe(
			(state) => state.products,
			(products) => {
				setTotal(
					products.reduce(
						(acc, product) => acc + product.price * product.qty,
						0,
					),
				);
			},
			{ fireImmediately: true },
		);
		return sub;
	}, [setTotal]);
	return (
		<>
			{product && (
				<div className="flex gap-2 items-center">
					<Button onClick={() => decQuantity(product.id)} size="icon">
						<Minus />
					</Button>
					<p>{product.qty}</p>
					<Button onClick={() => incQuantity(product.id)} size="icon">
						<Plus />
					</Button>
				</div>
			)}
		</>
	);
}
