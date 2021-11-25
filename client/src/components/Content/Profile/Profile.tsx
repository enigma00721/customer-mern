import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
// library
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@material-ui/icons";

interface UserType {
  name: string;
  email: string;
  password: string;
  oldpassword?: string;
  _id?: string;
}

const Profile = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: { name: "", email: "" },
  });

  useEffect(() => {
    axios
      .get("/auth")
      .then(({ data }) => {
        console.log(data);
        reset(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reset]);

  // handle form update
  const onSubmit: SubmitHandler<UserType> = (data) => {
    console.log(data);
    axios
      .patch("/auth", data)
      .then(({ data }) => {
        console.log(data);
        if (data.success_msg) {
          reset();
          enqueueSnackbar(data?.success_msg, { variant: "success" });
        }
        if (data.error_msg)
          enqueueSnackbar(data.error_msg, { variant: "error" });
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "warning" }));
  };

  return (
    <Box m={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("name", {
            required: "Name is required!",
            minLength: {
              value: 4,
              message: "Name must be at least 4 characters",
            },
            maxLength: {
              value: 20,
              message: "Name must not exceed 20 characters",
            },
          })}
          variant="outlined"
          margin="normal"
          label="Name"
          type="text"
          fullWidth
          error={errors.name ? true : false}
          helperText={errors?.name?.message}
        />

        <TextField
          {...register("email", { required: "Email is required!" })}
          variant="outlined"
          margin="normal"
          label="Email Address"
          type="email"
          fullWidth
          error={errors.email ? true : false}
          helperText={errors?.email?.message}
        />
        <TextField
          {...register("oldpassword", {
            required: "Old Password is required!",
          })}
          variant="outlined"
          margin="normal"
          label="Old Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          error={errors?.oldpassword ? true : false}
          helperText={errors?.oldpassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          {...register("password", {
            required: "New Password is required!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 20,
              message: "Password must not be at greater than 20 characters",
            },
          })}
          variant="outlined"
          margin="normal"
          label="New Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          error={errors?.password ? true : false}
          helperText={errors?.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          style={{ marginTop: "10px" }}
        >
          Update
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
