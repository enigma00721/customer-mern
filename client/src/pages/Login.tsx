import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthenticationContext } from "../AuthenticationProvider";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import useStyles from "./LoginStyles";

interface IForm {
  email: string;
  password: string;
}

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { authenticationStatus, setAuthenticationStatus } = useContext(
    AuthenticationContext
  );
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle login form submit
  const onSubmit = (data: IForm) => {
    // console.log(data);
    axios
      .post("/auth/login", data)
      .then((response) => {
        setAuthenticationStatus("loggedIn");
        history.push("/dashboard");
        console.log(authenticationStatus);
      })
      .catch((err) =>
        enqueueSnackbar("Password didn't match maybe!", { variant: "error" })
      );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.box}
      m={5}
      p={5}
      width="25%"
    >
      <Typography className={classes.title} variant="h4">
        Login
      </Typography>

      <TextField
        error={errors.email && true}
        {...register("email", { required: "Email is required!" })}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        className={classes.input}
      />
      <Typography component="span" variant="caption" className={classes.error}>
        {errors.email?.type === "required" && errors.email.message}
      </Typography>

      <TextField
        {...register("password", { required: "Password is required!" })}
        error={errors.password && true}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        className={classes.input}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                aria-label="toggle password visibility"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography component="span" variant="caption" className={classes.error}>
        {errors.password?.type === "required" && errors.password.message}
      </Typography>

      <Button
        type="submit"
        className={classes.input}
        variant="contained"
        size="large"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Submit
      </Button>

      <Typography component="span" variant="body2">
        No Account <Link to="/register">Register</Link>{" "}
      </Typography>
    </Box>
  );
};

export default Login;
