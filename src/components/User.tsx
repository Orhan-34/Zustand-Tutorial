import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "./ui/popover";
import { UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store/store";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect } from "react";

export default function User() {
	const { setAddress, address, fullName, userName, fetchUser } = useStore(
		useShallow((state) => ({
			setAddress: state.setAddress,
			address: state.address,
			fullName: state.fullName,
			userName: state.userName,
			fetchUser: state.fetchUser,
		})),
	);

	useEffect(() => {
		async function fetchUserData() {
			await fetchUser();
		}
		fetchUserData();
	}, [fetchUser]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="secondary" size="icon">
					<UserIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className=" space-y-2 w-[300px] bg-gray-800 text-white h-48  justify-center p-5 bg-opacity-75">
				<div className="flex items-center gap-2">
					<p>fullname: {fullName}</p>
				</div>
				<p className="text-sm">Username: {userName}</p>
				<hr className="border-b-5 border-white " />
				<Label htmlFor="address">Your address:</Label>
				<Input
					id="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					className="bg-gray-800 bg-opacity-50"
				/>
			</PopoverContent>
		</Popover>
	);
}
