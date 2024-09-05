import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "./ui/popover";
import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store/store";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { ChangeQtyButtons } from "./ChangeQtyButtons";

export default function Cart() {
	const { reset, products, removeProduct, total, address } = useStore(
		useShallow((state) => ({
			reset: state.reset,
			products: state.products,
			removeProduct: state.removeProduct,
			total: state.total,
			address: state.address,
		})),
	);

	return (
		<Popover>
			<PopoverTrigger>
				<Button variant="secondary" size="icon">
					<ShoppingCart />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="overflow-y-scroll space-y-2 w-96 bg-gray-800 text-white">
				<div className="flex gap-2 text-lg items-center">
					<h1>Cart:</h1>
					<Button onClick={reset} variant="destructive" size="icon">
						<CircleX />
					</Button>
				</div>
				<div className="space-y-2">
					{products.map((product) => (
						<Card key={product.id} className="flex flex-col">
							<CardHeader className="flex flex-row items-center gap-2">
								<CardTitle>{product.name}</CardTitle>
								<Button
									onClick={() => removeProduct(product.id)}
									size="icon"
									variant="destructive"
								>
									<Trash2 />
								</Button>
							</CardHeader>
							<CardContent>{product.price}</CardContent>
							<CardFooter>
								<ChangeQtyButtons productId={product.id} />
							</CardFooter>
						</Card>
					))}
				</div>
				<p>Total: {total}€</p>
				<p>Address: {address}</p>
			</PopoverContent>
		</Popover>
	);
}
