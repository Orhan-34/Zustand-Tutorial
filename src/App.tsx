import Cart from "./components/Cart";
import { ChangeQtyButtons } from "./components/ChangeQtyButtons";
import { Button } from "./components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import User from "./components/User";
import { PRODUCTS_DATA } from "./lib/mockData";
import { useStore } from "./store/store";

export default function App() {
	const addProduct = useStore((state) => state.addProduct);
	const cartProducts = useStore((state) => state.products);
	const removeProduct = useStore((state) => state.removeProduct);

	return (
		<main className="space-y-2 dark h-screen  max-w-sm mx-auto mt-2">
			<div className="flex justify-between">
				<User />
				<Cart />
			</div>
			<h1 className="text-2xl">Products:</h1>
			<div className="space-y-2">
				{PRODUCTS_DATA.map((product) => (
					<Card className="w-[450px]" key={product.id}>
						<CardHeader>
							<CardTitle>{product.name}</CardTitle>
							<CardDescription>{product.price}</CardDescription>
						</CardHeader>
						<CardFooter className="flex justify-between">
							{cartProducts.find((p) => p.id === product.id) ? (
								<>
									<ChangeQtyButtons productId={product.id} />
								</>
							) : (
								<Button onClick={() => addProduct(product)}>Add to Cart</Button>
							)}
							<Button onClick={() => removeProduct(product.id)}>Cancel</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
