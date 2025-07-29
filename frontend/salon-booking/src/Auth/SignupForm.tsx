import { Button, Container, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import React from "react";
import store from "../Redux/store";
import { userSignUp } from "../Redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { getUser } from "../Redux/reducers/userReducer";

type Props = {};

function SignupForm({}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
    onSubmit: () => {
      dispatch(
        userSignUp({
          signUpRequest: {
            username: formik.values.email,
            password: formik.values.password,
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            email: formik.values.email,
            role: "CUSTOMER",
          },
        })
      );

      setTimeout(() => {
        if (localStorage.getItem("jwt")) {
          dispatch(
            getUser({
              jwtToken: localStorage.getItem("jwt")!,
              navigate: navigate,
              requestFrom: "signupPage",
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
          Sign Up
        </Typography>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            name="firstName"
            id="firstName"
            label="First Name"
            type="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            required
          />
          <TextField
            variant="outlined"
            fullWidth
            name="lastName"
            id="lastName"
            label="Last Name"
            type="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            required
          />
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
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignupForm;
