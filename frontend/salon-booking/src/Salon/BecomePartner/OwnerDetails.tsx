import { Button, Container } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";

type Props = {
  formik: any;
};

function OwnerDetails({ formik }: Props) {
  return (
    <Container component={"main"} maxWidth="xs">
      <div className="space-y-5 flex flex-col gap-5 lg:w-[20vw]">
        <Typography className="text-center" variant="h5">
          Owner Details
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
        </form>
      </div>
    </Container>
  );
}

export default OwnerDetails;
