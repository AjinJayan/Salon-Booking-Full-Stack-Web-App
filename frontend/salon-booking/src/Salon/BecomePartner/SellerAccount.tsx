import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import OwnerDetails from "./OwnerDetails";
import { useFormik } from "formik";
import SalonDetailsForm from "./SalonDetailsForm";
import SalonAddressForm from "./SalonAddressForm";
import { useDispatch } from "react-redux";
import store from "../../Redux/store";
import { createSalon, Salon } from "../../Redux/reducers/salonReducer";
import { SignRequest } from "../../Redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
type Props = {};
const steps = ["Owner Details", "Salon Details", "Salon Address"];
function SellerAccount({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const handleActiveStep = (value: number) => {
    setActiveStep(value);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      salonAddress: {
        phoneNumber: "",
        email: "",
        city: "",
        pincode: "",
        address: "",
      },
      salonDetails: {
        name: "",
        openTime: "",
        closeTime: "",
        images: [],
      },
    },
    onSubmit: () => {
      console.log(formik.values);
      const user: SignRequest = {
        username: formik.values.email,
        password: formik.values.password,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        role: "SALON_OWNER",
      };

      const salon: Salon = {
        name: formik.values.salonDetails.name,
        images: formik.values.salonDetails.images,
        openTime: formik.values.salonDetails.openTime,
        closeTime: formik.values.salonDetails.closeTime,
        address: formik.values.salonAddress.address,
        phoneNumber: formik.values.salonAddress.phoneNumber,
        email: formik.values.salonAddress.email,
        city: formik.values.salonAddress.city,
      };
      dispatch(createSalon({ user: user, salon: salon, navigate: navigate }));
    },
  });

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-20 space-y-10 ">
        <div>
          {activeStep === 0 ? (
            <OwnerDetails formik={formik} />
          ) : activeStep === 1 ? (
            <SalonDetailsForm formik={formik} />
          ) : (
            <SalonAddressForm formik={formik} />
          )}
        </div>
        <div className="flex justify-between items-center">
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={() => handleActiveStep(Math.max(activeStep - 1, 0))}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              activeStep === steps.length - 1
                ? formik.handleSubmit()
                : handleActiveStep(Math.min(activeStep + 1, steps.length - 1))
            }
          >
            {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SellerAccount;
