import { useEffect } from "react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { fetchNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/redux/slices/notificationSlice";
import { User, Bell, LogOut, Loader, Check } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NavBar() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const notifications = useSelector((state) => state.notifications.notifications);
	const unreadCount = useSelector((state) => state.notifications.unreadCount);
	const notificationsLoading = useSelector((state) => state.notifications.loading);

	const dispatch = useDispatch();

	// Fetch notifications on component mount if authenticated
	useEffect(() => {
		if (isAuthenticated && user?.role === "patient") {
			dispatch(fetchNotifications());
		}
	}, [isAuthenticated, dispatch, user?.role]);

	const handleLogout = () => {
		dispatch(logout());
	};

	const handleNotificationClick = (notificationId, isRead) => {
		if (!isRead) {
			dispatch(markNotificationAsRead(notificationId));
		}
	};

	const handleMarkAllAsRead = () => {
		dispatch(markAllNotificationsAsRead());
	};

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
					<div className="flex gap-6 justify-center items-center lg:col-span-1 md:col-span-4 sm:col-span-4">
						{/* Notifications Dropdown */}
						{user?.role === "patient" && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button
										className="relative p-2 text-gray-700 hover:text-[#007E85] transition-colors"
										title="Notifications"
									>
										<Bell size={24} />
										{unreadCount > 0 && (
											<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
												{unreadCount}
											</span>
										)}
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
									<DropdownMenuLabel className="flex justify-between items-center">
										<span>Notifications</span>
										{unreadCount > 0 && (
											<button
												onClick={handleMarkAllAsRead}
												className="text-xs text-[#007E85] hover:text-[#005f68] font-semibold"
											>
												Mark all as read
											</button>
										)}
									</DropdownMenuLabel>
									<DropdownMenuSeparator />

									{notificationsLoading ? (
										<div className="p-4 flex justify-center">
											<Loader size={24} className="animate-spin text-[#007E85]" />
										</div>
									) : notifications.length === 0 ? (
										<div className="p-6 text-center text-gray-500">
											<p>No notifications</p>
										</div>
									) : (
										notifications.map((notification) => (
											<DropdownMenuItem
												key={notification._id}
												onClick={() => handleNotificationClick(notification._id, notification.read)}
												className={`flex-col items-start cursor-pointer py-3 ${
													!notification.read ? "bg-blue-50" : ""
												}`}
											>
												<div className="flex items-start w-full gap-2">
													<div className="flex-1">
														<p className="font-medium text-gray-900 text-sm">
															{notification.title}
														</p>
														<p className="text-gray-600 text-xs mt-1">
															{notification.message}
														</p>
														<p className="text-gray-400 text-xs mt-2">
															{new Date(notification.createdAt).toLocaleString()}
														</p>
													</div>
													{!notification.read && (
														<div className="flex-shrink-0 mt-1">
															<Check size={16} className="text-[#007E85]" />
														</div>
													)}
												</div>
											</DropdownMenuItem>
										))
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						)}

						{/* Profile Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button
									className="p-2 text-gray-700 hover:text-[#007E85] transition-colors rounded-full border border-gray-300 hover:border-[#007E85]"
									title="Profile"
								>
									<User size={24} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>
									<div>
										<p className="font-semibold text-gray-900">{user?.name}</p>
										<p className="text-gray-500 text-xs">{user?.email}</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleLogout}
									className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
								>
									<LogOut size={18} className="mr-2" />
									<span>Logout</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>
		</>
	);
}
