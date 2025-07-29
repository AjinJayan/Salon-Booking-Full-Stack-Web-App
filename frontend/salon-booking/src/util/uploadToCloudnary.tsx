// upload an image to cloudanry and return a url
export const uploadToCloudnary = async (pics: File) => {
  const cloud_name = "du0t7sqp7";
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "ml_default"); // ml_default is the default preset avaliable (its like grouping images based on some key). We can make our own preset (make it unsigned)
    data.append("cloud_name", cloud_name);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      ); // url for upload image in cloudnary
      const fileData = await res.json();
      return fileData.secure_url;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("error during upload to cloudnary");
  }
};
