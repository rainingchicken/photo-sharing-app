import jwt from "jsonwebtoken";

const days = 1; //expires in 1 day

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: `${days}d`,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: days * 24 * 60 * 60 * 1000, // days * hours * minutes * seconds * milliseconds
  });
};

export default generateToken;
