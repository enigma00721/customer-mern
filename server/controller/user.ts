import express, { RequestHandler } from "express";
// library
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
// config
import dotenv from "dotenv";
// model
import User from "../model/User";

dotenv.config();

declare module "express-session" {
  export interface Session {
    refreshToken: string;
    token: string;
  }
}

interface bodyType {
  name: string;
  email: string;
  password: string;
}

interface payloadData {
  email: string;
}

// get user info
export const userInfo: RequestHandler = async (req, res) => {
  console.log(req.session);

  const refreshToken = req.session.refreshToken;
  if (!refreshToken) return res.status(401).json("You are not authenticated");

  // verify old refreshToken
  const decoded = JWT.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_KEY as string
  );
  const email = (decoded as payloadData).email;

  // console.log("from refresh token");
  // console.log(email);

  // find user in db
  const user = await User.findOne({ email }).select(["name", "email"]);
  return res.status(200).json(user);
};

// update user info
export const userUpdate: RequestHandler = async (req, res) => {
  User.findById(req.body._id, function (err, user) {
    if (err) res.status(500).json({ error_msg: "User Not Found!" });
    user.name = req.body.name;
    user.email = req.body.email;

    // compare with old password
    bcrypt.compare(
      req.body.oldpassword,
      user.password,
      async function (err, resp) {
        console.log("is password changed");
        console.log(resp);
        if (err)
          return res.status(201).json({
            error_msg: "Some error occured while checking old password",
          });
        // if old password is true
        if (resp == true) {
          //Encrypt user password
          const encryptedPassword = await bcrypt.hash(req.body.password, 10);
          user.password = encryptedPassword;

          //save user new data
          user.save(function (err, user) {
            if (err) res.status(500).json({ error_msg: err.message });
            else
              res
                .status(201)
                .json({ success_msg: "User Updated successfully!" });
          });
        } else
          res.status(200).json({ error_msg: "Old Password did not match" });
      }
    );
  });
};

export const registerController: RequestHandler = async (req, res) => {
  console.log(req.body);
  // res.end('ok done');
  const { name, email, password } = req.body as bodyType;

  const oldUser = await User.findOne({ email });
  console.log(oldUser);

  if (!oldUser) {
    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });
    // Create token
    const token = JWT.sign({ email }, process.env.TOKEN_KEY as string, {
      expiresIn: "2h",
    });
    res.status(203).json(token);
  } else {
    res.status(201).json("User Already Registered Please Login");
  }
};

export const loginController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  // find user in db
  const user = await User.findOne({ email });
  if (!user) res.status(404).json("User Not Found!");

  const match = await bcrypt.compare(password, user.password);

  // token generate and sent
  if (match) {
    const token = JWT.sign({ email }, process.env.TOKEN_KEY as string, {
      expiresIn: "3h",
    });

    const refreshToken = JWT.sign(
      { email },
      process.env.REFRESH_TOKEN_KEY as string,
      { expiresIn: "30d" }
    );

    // store token and refresh token in session after login
    req.session.refreshToken = refreshToken;
    req.session.token = token;

    console.log("session after login");
    console.log(req.session); // contains cookie session and token

    res.status(200).json(token);
  } else res.status(500).json({ error_msg: "Password not match!" });
};

export const logoutController: RequestHandler = (req, res) => {
  console.log("session");
  console.log(req.session);
  console.log("headers");
  console.log(req.headers); // req.headers or authorization

  req.session.destroy(function (err) {
    if (err) res.status(500).json("Some Error! Can't Logout");
  });
  res.status(200).json("Logout Success!");
};

export const refreshTokenController: RequestHandler = async (req, res) => {
  // console.log('from refresh token');
  // return res.json('nice');
  console.log(req.session);

  const refreshToken = req.session.refreshToken;
  if (!refreshToken) return res.status(401).json("You are not authenticated");

  // verify old refreshToken
  const decoded = JWT.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_KEY as string
  );
  const email = (decoded as payloadData).email;

  console.log("from refresh token");
  console.log(email);

  // find user in db
  const user = await User.findOne({ email });

  // generate new token
  const token = JWT.sign({ email }, process.env.TOKEN_KEY as string, {
    expiresIn: "1h",
  });

  return res.status(200).json({ user, token });
};

// export const getUserData = async (refreshToken: any, res: Response) => {
//   // verify old refreshToken
//   const decoded = JWT.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_KEY as string
//   );
//   const email = (decoded as payloadData).email;

//   console.log("from refresh token");
//   console.log(email);

//   // find user in db
//   const user = await User.findOne({ email });

//   // generate new token
//   const token = JWT.sign({ email }, process.env.TOKEN_KEY as string, {
//     expiresIn: "1h",
//   });

//   return res.status(200).json({ user, token });
// };
