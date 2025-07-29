import { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { ServiceCard } from "./ServiceCard";
import { Button, Divider, Modal } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RemoveShoppingCart, ShoppingCart } from "@mui/icons-material";
import { SelectedServiceList } from "./SelectedServiceList";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Redux/store";
import {
  categorySelector,
  getAllCategoriesBySalon,
} from "../../Redux/reducers/categoryReducer";
import { useParams } from "react-router-dom";
import {
  getAllServiceOfferingsBySalonId,
  ServiceOffering,
  serviceOfferingSelector,
} from "../../Redux/reducers/serviceOfferingReducer";
import dayjs, { Dayjs } from "dayjs";
import { createBooking } from "../../Redux/reducers/bookingReducer";

export interface IAppProps {}

export function SalonServiceDetails(props: IAppProps) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { id } = useParams();
  const { categories } = useSelector(categorySelector);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedServices, setSelectedServices] = useState<ServiceOffering[]>(
    []
  );
  const [bookingDate, setBookingDate] = useState<string>("");
  const [modelOpen, setModelOpen] = useState(false);
  const handleModelOpen = () => setModelOpen(true);
  const handleModelClose = () => setModelOpen(false);

  useEffect(() => {
    dispatch(
      getAllCategoriesBySalon({
        jwtToken: localStorage.getItem("jwt")!,
        salonId: Number(id),
      })
    );
  }, [id]);

  useEffect(() => {
    if (categories.length > 0) setSelectedCategory(categories[0].id!);
  }, [categories]);

  useEffect(() => {
    dispatch(
      getAllServiceOfferingsBySalonId({
        jwtToken: localStorage.getItem("jwt")!,
        salonId: Number(id),
        categoryId: selectedCategory,
      })
    );
  }, [selectedCategory]);

  const handleBooking = () => {
    const serviceIds = selectedServices.map((service) => Number(service.id!));
    dispatch(
      createBooking({
        jwtToken: localStorage.getItem("jwt")!,
        bookingRequest: {
          serviceIds: serviceIds,
          startTime: bookingDate,
        },
        salonId: Number(id),
        paymentMethod: "RAZORPAY",
      })
    );
  };

  const handleDateChange = (value: Dayjs) => {
    if (value) {
      const localDate = value.format("YYYY-MM-DDTHH:mm:ss");
      setBookingDate(localDate);
      console.log(localDate);
    }
  };

  const handleServiceClick = (serviceOffering: ServiceOffering) => {
    setSelectedServices([...selectedServices, serviceOffering]);
  };

  const handleCategoryClick = (categoryId: number) =>
    setSelectedCategory(categoryId);

  const handleServiceRemove = (index: number) => {
    setSelectedServices([
      ...selectedServices.filter((_, idx) => idx !== index),
    ]);
  };

  const { serviceOfferings } = useSelector(serviceOfferingSelector);

  return (
    <div className="lg:flex gap-5 h-[90vh] mt-10">
      <section className="space-y-5 border-r lg:w-[25%] pr-5">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            handleCategoryClick={() => handleCategoryClick(category.id!)}
            selectedCategory={selectedCategory}
            category={category}
          />
        ))}
      </section>
      <section className="space-y-2 lg:w-[50%] px-5 lg:px-20 overflow-y-auto">
        {serviceOfferings.map((serviceOffering, index) => (
          <div className="space-y-4" key={index}>
            <ServiceCard
              serviceOffering={serviceOffering}
              handleServiceClick={handleServiceClick}
            />
            <Divider />
          </div>
        ))}
      </section>
      <section className="lg:w-[25%]">
        <div className="border rounded-md p-5">
          {selectedServices.length > 0 ? (
            <div>
              <div className="flex items-center gap-2">
                <ShoppingCart sx={{ fontSize: "30px", color: "green" }} />
                <h1 className="font-thin text-sm">Selected Services</h1>
              </div>
              <SelectedServiceList
                selectedServices={selectedServices}
                handleServiceRemove={handleServiceRemove}
              />
              <Button
                sx={{ py: ".7rem" }}
                variant="contained"
                fullWidth
                onClick={handleModelOpen}
              >
                Book Now
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 justify-center items-center">
              <RemoveShoppingCart sx={{ fontSize: "30px", color: "green" }} />
              <h1>Not Selected</h1>
            </div>
          )}
        </div>
      </section>

      <Modal
        open={modelOpen}
        onClose={handleModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="p-4 w-[300px] lg:w-[600px] lg:flex gap-5 shadow-lg bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[50%] border-r pr-5 border-slate-200">
            <h1 className="text-xl font-semibold">Time Slot Not Avaliable</h1>
          </div>
          <div>
            <SelectedServiceList
              selectedServices={selectedServices}
              handleServiceRemove={handleServiceRemove}
            />

            <div className="flex flex-col gap-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  onChange={(value) => handleDateChange(value!)}
                  label="Select Date Time"
                  minDateTime={dayjs().add(1, "hour")}
                  maxDateTime={dayjs().add(4, "month")}
                />
              </LocalizationProvider>
              <div className="flex justify-center">
                <Button variant="contained" onClick={handleBooking}>
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
