import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

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
    <>
      <h1 className="title">Sign Up</h1>
      <form className="RecipeForm" onSubmit={submitHandler}>
        <label htmlFor="signupName">Name: </label>
        <input
          id="signupName"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="signupEmail">Email Address: </label>
        <input
          id="signupEmail"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="signupPassword">Password: </label>
        <input
          id="signupPassword"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="signupConfirmPassword">Confirm Password: </label>
        <input
          id="signupConfirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="btnForm submitbtn"
          disabled={isLoading}
          type="submit"
        >
          Sign Up
        </button>
        <p>
          Already have an account?<Link to="/login"> Login</Link>
        </p>
        {isLoading && <h1>Loading...</h1>}
      </form>
    </>
  );
};

export default Signup;
