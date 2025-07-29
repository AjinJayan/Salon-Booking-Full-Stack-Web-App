import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { uploadToCloudnary } from "../../util/uploadToCloudnary";
import { removeFromCloudnary } from "../../util/removeFromCloudnary";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Redux/store";
import { createServiceOffering } from "../../Redux/reducers/serviceOfferingReducer";
import {
  getSalonByOwnerId,
  salonSelector,
} from "../../Redux/reducers/salonReducer";
import {
  categorySelector,
  getAllCategoriesBySalon,
} from "../../Redux/reducers/categoryReducer";

type Props = {};

function CreateServicesForm({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();

  const { salon } = useSelector(salonSelector);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(getSalonByOwnerId({ jwtToken: localStorage.getItem("jwt")! }));
    }
  }, []);

  useEffect(() => {
    if (salon && localStorage.getItem("jwt"))
      dispatch(
        getAllCategoriesBySalon({
          jwtToken: localStorage.getItem("jwt")!,
          salonId: salon?.id,
        })
      );
  }, [salon]);
  const { categories } = useSelector(categorySelector);

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
      price: "",
      duration: "",
      categoryId: "",
    },
    onSubmit: () => {
      dispatch(
        createServiceOffering({
          jwtToken: localStorage.getItem("jwt")!,
          serviceOffering: {
            name: formik.values.name,
            image: formik.values.image,
            description: formik.values.description,
            price: Number(formik.values.price),
            duration: Number(formik.values.duration),
            categoryId: Number(formik.values.categoryId),
            salonId: salon?.id,
          },
        })
      );

      formik.resetForm();
    },
  });

  const [uploadImage, setUploadImage] = React.useState<boolean>(false);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadImage(true);
      const imageUrl = await uploadToCloudnary(file);
      formik.setFieldValue("image", imageUrl);
      setUploadImage(false);
    }
  };

  const removeUploadImageHandler = (url: string) => {
    formik.setFieldValue("image", "");
    removeFromCloudnary(url);
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 p-4  w-full lg:w-1/2"
      >
        <Grid container spacing={2}>
          <Grid className="w-24 h-24" size={{ xs: 12 }}>
            {formik.values.image ? (
              <div className="relative border ">
                <img
                  className="w-24 h-24 object-cover"
                  src={formik.values.image}
                  alt=""
                />
                <IconButton
                  className=""
                  size="small"
                  color="error"
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => removeUploadImageHandler(formik.values.image)}
                >
                  <Close sx={{ fontSize: "1rem" }} />
                </IconButton>
              </div>
            ) : (
              <>
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
              </>
            )}
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="description"
              name="description"
              label="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="duration"
              name="duration"
              label="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.categoryId}
                label="Category"
                name="categoryId"
                onChange={formik.handleChange}
              >
                {categories.map((category) => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Button
              sx={{ py: ".8rem" }}
              variant="outlined"
              type="submit"
              fullWidth
            >
              Create Service
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CreateServicesForm;
