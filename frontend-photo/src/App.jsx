import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="">
      <ToastContainer />
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
