import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";

const MainLayout = () => {
	return (
		<>
			<NavBar />
			<Outlet></Outlet>
			<div id="footer">
				<Footer />
			</div>
		</>
	);
};

export default MainLayout;
