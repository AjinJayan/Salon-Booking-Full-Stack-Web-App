import { Avatar, Box, Grid, IconButton, Rating } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { deleteReview, Review } from "../../Redux/reducers/reviewReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, userSelector } from "../../Redux/reducers/userReducer";
import store from "../../Redux/store";
import axios from "axios";

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props) => {
  const { authUser } = useSelector(userSelector);
  const dispatch = useDispatch<typeof store.dispatch>();
  const [reviewUser, setReviewUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8087/api/users/${review.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        setReviewUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [review.userId]);

  const deleteReviewHandler = () => {
    dispatch(
      deleteReview({
        jwtToken: localStorage.getItem("jwt")!,
        reviewId: review.id!,
      })
    );
  };

  return (
    <div className="flex space-y-3">
      {/*Parent Grid should have property called container and child grid should have  item, */}
      <div className="w-[80%]">
        <Grid container>
          <Grid size={"grow"}>
            <Box>
              <Avatar
                className="text-white"
                sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
              >
                {reviewUser?.fullName![0].toUpperCase()}
              </Avatar>
            </Box>
          </Grid>
          <Grid size={9.5}>
            <div className="space-y-1">
              <p className="font-semibold text-lg">{reviewUser?.fullName} </p>
              <p className="opacity-70">{review.createdAt?.substring(0, 16)}</p>
            </div>
            <div>
              <Rating
                readOnly
                value={review.rating}
                name="half-rating"
                defaultValue={4.5}
                precision={0.5}
              />
            </div>
            <p>{review.reviewText}</p>
          </Grid>
        </Grid>
      </div>
      {reviewUser?.id === authUser?.id && (
        <IconButton onClick={deleteReviewHandler}>
          <Delete sx={{ color: red[700] }} />{" "}
        </IconButton>
      )}
    </div>
  );
};

export default ReviewCard;
