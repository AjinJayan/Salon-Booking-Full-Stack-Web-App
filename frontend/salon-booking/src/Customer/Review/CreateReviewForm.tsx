import { Box, Button, InputLabel, Rating, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../Redux/reducers/reviewReducer";
import { useParams } from "react-router-dom";
import store from "../../Redux/store";

type Props = {};

function CreateReviewForm({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      reviewText: "",
      reviewRating: 0,
    },
    onSubmit: (values) => {
      // console.log("Submitting", values);
      dispatch(
        createReview({
          jwtToken: localStorage.getItem("jwt")!,
          salonId: Number(id),
          reviewRequest: {
            reviewText: values.reviewText,
            rating: values.reviewRating,
          },
        })
      );

      formik.resetForm();
    },
  });
  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{ mt: 3 }}
      className="space-y-5 w-full lg:w-1/2 "
    >
      {/* here the name: reviewText has to same with the form values name */}
      <TextField
        fullWidth
        id="reviewText"
        name="reviewText"
        label="Review"
        variant="outlined"
        multiline
        rows={4}
        value={formik.values.reviewText}
        onChange={formik.handleChange}
      />

      <div className="space-y-2 mt-5">
        <InputLabel>Rating</InputLabel>
        <Rating
          id="reviewRating"
          name="reviewRating"
          precision={0.5}
          value={formik.values.reviewRating}
          onChange={(event, newValue) =>
            formik.setFieldValue("reviewRating", newValue)
          }
        />
      </div>

      <Button variant="contained" color="primary" type="submit">
        SUBMIT REVIEW
      </Button>
    </Box>
  );
}

export default CreateReviewForm;
