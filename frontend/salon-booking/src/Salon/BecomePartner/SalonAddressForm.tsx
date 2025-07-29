import React from "react";
import { Container, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

type Props = {
  formik: any;
};

function SalonAddressForm({ formik }: Props) {
  return (
    <Container component={"main"} maxWidth="xs">
      <div className="space-y-5 flex flex-col gap-5">
        <Typography className="text-center" variant="h5">
          Salon Address
        </Typography>
        <form onSubmit={formik.handleSubmit} className="space-y-4 p-4  w-full">
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                id="address"
                name="salonAddress.address"
                label="Address"
                value={formik.values.salonAddress.address}
                onChange={formik.handleChange}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="email"
                name="salonAddress.email"
                label="Email"
                value={formik.values.salonAddress.email}
                onChange={formik.handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="salonAddress.phoneNumber"
                label="Phone Number"
                value={formik.values.salonAddress.phoneNumber}
                onChange={formik.handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="city"
                name="salonAddress.city"
                label="City"
                value={formik.values.salonAddress.city}
                onChange={formik.handleChange}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="pincode"
                name="salonAddress.pincode"
                label="Pincode"
                value={formik.values.salonAddress.pincode}
                onChange={formik.handleChange}
                required
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SalonAddressForm;
