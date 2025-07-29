import React, { useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { Divider } from "@mui/material";
import RatingCard from "./RatingCard";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Redux/store";
import { reviewSelector } from "../../Redux/reducers/reviewReducer";
import { getAllReviewsBySalonId } from "../../Redux/reducers/reviewReducer";
import { useParams } from "react-router-dom";

type Props = {};

const Review = (props: Props) => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { reviews } = useSelector(reviewSelector);
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      getAllReviewsBySalonId({
        jwtToken: localStorage.getItem("jwt")!,
        salonId: Number(id),
      })
    );
  }, [id]);

  return (
    <div className="pt-10 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[40%] space-y-2">
        <h1 className="font-semibold text-lg pb-4">Review & Rating</h1>
        <RatingCard />
      </section>
      <section className="w-full md:w-1/2 lg:w-[60%]">
        <div className="mt-10">
          <div className="space-y-5">
            {reviews.map((review) => (
              <div key={review.id}>
                <ReviewCard review={review} />
                <Divider />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
