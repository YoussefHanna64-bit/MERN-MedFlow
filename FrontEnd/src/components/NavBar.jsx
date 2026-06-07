import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

export default function NavBar() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const dispatch = useDispatch();

	return (
		<>
			<div className="grid grid-cols-4 items-center lg:h-24 md:h-40 sm:h-40">
				<div className="flex justify-center lg:col-span-1 md:col-span-4 sm:col-span-4">
					<img src="./Healthcare-Logo.svg" alt="Healthcare-logo" />
				</div>
				<div className="lg:col-span-2 flex justify-evenly text-lg font-medium md:col-span-4 sm:col-span-4">
					<div className="text-[#007E85]">
						<NavLink to="/">Home</NavLink>
					</div>
					<div>
						<a href="#service">Service</a>
					</div>
					<div>
						<a href="#footer">Contact Us</a>
					</div>
					<div>
						<NavLink to="">Help</NavLink>
					</div>
					<div>
						<NavLink to="">Blogs</NavLink>
					</div>
				</div>
				{!isAuthenticated ? (
					<div className="flex gap-3 justify-center lg:col-span-1 md:col-span-4 sm:col-span-4">
						<Button asChild size="lg" variant="ghost" className="rounded-md">
							<NavLink to="/signup">Sign Up</NavLink>
						</Button>
						<Button asChild size="lg" className="font-bold rounded-md">
							<NavLink to="/login">Login</NavLink>
						</Button>
					</div>
				) : (
					<div className="flex gap-3 justify-center lg:col-span-1 md:col-span-4 sm:col-span-4">
						<Button
							onClick={() => dispatch(logout())}
							size="lg"
							className="font-bold rounded-md cursor-pointer"
						>
							Logout
						</Button>
					</div>
				)}
			</div>
		</>
	);
}
