import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { logout } from "../slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall(null).unwrap();
      dispatch(logout());
      toast.info("Logout successful!");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    logoutHandler();
    document.title = "Logout Page";
  }, []);

  return <h1>You are logged out</h1>;
};

export default Logout;
