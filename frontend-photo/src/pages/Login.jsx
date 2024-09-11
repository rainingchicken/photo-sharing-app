import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { Button, TextInput } from "flowbite-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
    document.title = "Login Page";
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex ">
      <div className="my-0 mx-auto basis-9/12 ">
        <h1 className="text-center">Login</h1>
        <form
          className="flex max-w-md flex-col gap-4 mx-auto"
          onSubmit={submitHandler}
        >
          <label className="mb-2 block" htmlFor="loginEmail">
            Email Address:{" "}
          </label>
          <TextInput
            required
            id="loginEmail"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mb-2 block" htmlFor="loginPassword">
            Password:
          </label>

          <TextInput
            required
            id="loginPassword"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="btnForm submitbtn"
            disabled={isLoading}
            type="submit"
          >
            Log In
          </Button>
          <p>
            New user? <Link to="/signup">Sign up</Link>
          </p>
          {isLoading && <h1>Loading...</h1>}
        </form>
      </div>
    </div>
  );
};

export default Login;
