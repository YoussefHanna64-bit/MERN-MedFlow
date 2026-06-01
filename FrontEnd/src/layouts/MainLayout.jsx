import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      {/* <Header></Header> */}
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </>
  );
};

export default MainLayout;
