import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  CircularProgress,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { uploadToCloudnary } from "../../util/uploadToCloudnary";
import { removeFromCloudnary } from "../../util/removeFromCloudnary";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {
  formik: any;
};

function SalonDetailsForm({ formik }: Props) {
  const removeUploadImageHandler = (url: string) => {
    formik.setFieldValue("salonDetails.images", [
      ...formik.values.salonDetails.images.filter(
        (image: string) => image !== url
      ),
    ]);
    removeFromCloudnary(url);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadImage(true);
      const imageUrl = await uploadToCloudnary(file);
      formik.setFieldValue("salonDetails.images", [
        ...formik.values.salonDetails.images,
        imageUrl,
      ]);
      setUploadImage(false);
    }
  };
  const [uploadImage, setUploadImage] = React.useState<boolean>(false);

  return (
    <Container component={"main"} maxWidth="xs">
      <div className="space-y-5 flex flex-col gap-5 lg:w-[20vw]">
        <Typography className="text-center" variant="h5">
          Salon Details
        </Typography>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className="flex flex-wrap gap-2">
            {formik.values.salonDetails.images.map(
              (image: string, index: number) => (
                <div className="relative border " key={index}>
                  <img className="w-24 h-24 object-cover" src={image} alt="" />
                  <IconButton
                    className=""
                    size="small"
                    color="error"
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() => removeUploadImageHandler(image)}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              )
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                name="image"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label htmlFor="fileInput" className="relative">
                <span className="w-24 h-24 flex items-center justify-center p-3 border rounded-md border-gray-400 cursor-pointer">
                  <AddPhotoAlternate className="text-gray-700" />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 top-0 right-0 bottom-0 w-24 h-24 flex items-center justify-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
            </div>
          </div>
          <TextField
            variant="outlined"
            fullWidth
            name="salonDetails.name"
            id="Salon Name"
            label="Salon Name"
            type="text"
            value={formik.values.salonDetails.name}
            onChange={formik.handleChange}
            required
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              onChange={(value) => {
                const time = value?.format("HH:mm:ss");
                formik.setFieldValue("salonDetails.openTime", time);
              }}
              label="Open Time"
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              onChange={(value) => {
                const time = value?.format("HH:mm:ss");
                formik.setFieldValue("salonDetails.closeTime", time);
              }}
              label="Close Time"
            />
          </LocalizationProvider>
        </form>
      </div>
    </Container>
  );
}

export default SalonDetailsForm;
