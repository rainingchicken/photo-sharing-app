import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { Button, TextInput } from "flowbite-react";
import { setCredentials } from "../slices/authSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
    document.title = "Signup Page";
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({
        name,
        email,
        password,
        confirmPassword,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex">
      <div className="my-0 mx-auto basis-9/12 ">
        <h1 className="text-center">Sign Up</h1>
        <form
          className="flex mx-auto max-w-md flex-col gap-4 basis-9/12"
          onSubmit={submitHandler}
        >
          <label className="mb-2 block" htmlFor="signupName">
            Name:
          </label>
          <TextInput
            id="signupName"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="mb-2 block" htmlFor="signupEmail">
            Email Address:
          </label>
          <TextInput
            id="signupEmail"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mb-2 block" htmlFor="signupPassword">
            Password:
          </label>
          <TextInput
            id="signupPassword"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="mb-2 block" htmlFor="signupConfirmPassword">
            Confirm Password:
          </label>
          <TextInput
            id="signupConfirmPassword"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            className="btnForm submitbtn"
            disabled={isLoading}
            type="submit"
          >
            Sign Up
          </Button>
          <p>
            Already have an account?<Link to="/login"> Login</Link>
          </p>
          {isLoading && <h1>Loading...</h1>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
