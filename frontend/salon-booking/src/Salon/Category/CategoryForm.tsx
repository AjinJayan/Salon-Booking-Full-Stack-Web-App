import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Redux/store";
import { uploadToCloudnary } from "../../util/uploadToCloudnary";
import {
  categorySelector,
  createCategory,
} from "../../Redux/reducers/categoryReducer";
import {
  getSalonByOwnerId,
  salonSelector,
} from "../../Redux/reducers/salonReducer";
import { removeFromCloudnary } from "../../util/removeFromCloudnary";

type Props = {};

function CategoryForm({}: Props) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const [uploadImage, setUploadImage] = React.useState<boolean>(false);
  const { salon } = useSelector(salonSelector);

  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     dispatch(getSalonByOwnerId({ jwtToken: localStorage.getItem("jwt")! }));
  //   }
  // }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    onSubmit: () => {
      formik.resetForm();
      dispatch(
        createCategory({
          jwtToken: localStorage.getItem("jwt")!,
          category: {
            name: formik.values.name,
            image: formik.values.image,
            salonId: salon?.id,
          },
        })
      );
    },
  });

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
                  style={{ display: "none" }}
                  onChange={handleImageChange}
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
            <Button
              sx={{ py: ".8rem" }}
              variant="outlined"
              type="submit"
              fullWidth
            >
              Create Category
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CategoryForm;
function getCategoriesBySalon(arg0: { jwtToken: string; salonId: any }): any {
  throw new Error("Function not implemented.");
}
