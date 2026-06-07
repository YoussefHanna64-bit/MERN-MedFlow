import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar/>
      <Outlet></Outlet>
      
    </>
  );
};

export default MainLayout;
