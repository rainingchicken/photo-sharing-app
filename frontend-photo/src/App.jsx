import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
    </>
  );
};

export default App;
