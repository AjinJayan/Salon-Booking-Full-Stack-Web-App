import { Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../Redux/reducers/authReducer";
import store from "../Redux/store";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Redux/reducers/userReducer";

type Props = {};

function LoginForm({}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      dispatch(
        userLogin({
          loginRequest: {
            username: formik.values.email,
            password: formik.values.password,
          },
        })
      );

      setTimeout(() => {
        // navigate("/")
        if (localStorage.getItem("jwt")) {
          dispatch(
            getUser({
              jwtToken: localStorage.getItem("jwt")!,
              navigate: navigate,
              requestFrom: "loginPage",
            })
          );
        }
      }, 1000);
    },
  });
  return (
    <Container component={"main"} maxWidth="xs">
      <div className="space-y-5 flex flex-col gap-5 lg:w-[20vw]">
        <Typography className="text-center" variant="h5">
          Login
        </Typography>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            name="email"
            id="email"
            label="Email Address"
            type="email"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            fullWidth
            name="password"
            id="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
          <Button fullWidth type="submit" variant="contained">
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
