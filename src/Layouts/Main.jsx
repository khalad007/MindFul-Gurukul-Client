import { Outlet } from "react-router-dom";
import Navbar from "../Components/Sheared/Navbar";
import Footer from "../Components/Sheared/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
