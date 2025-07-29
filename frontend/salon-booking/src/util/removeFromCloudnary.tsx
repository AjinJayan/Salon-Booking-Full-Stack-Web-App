import sha1 from "crypto-js/sha1";
export const removeFromCloudnary = async (url: string): Promise<boolean> => {
  const cloud_name = "du0t7sqp7";
  const api_key = "843585618998399"; // Replace with your Cloudinary API key
  const api_secret = "4lX-AxlzbnTQBcd8Sf4IENmTicA"; // Replace with your Cloudinary API secret

  // Extract public_id from URL (remove file extension)
  const public_id = url.split("/").pop()?.split(".")[0];

  if (!public_id) {
    console.error("Invalid URL provided");
    return false;
  }

  try {
    // Create the signature
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = `public_id=${public_id}&timestamp=${timestamp}${api_secret}`;
    const signatureHash = sha1(signature); // You'll need to implement SHA-1 hashing

    const formData = new FormData();
    formData.append("public_id", public_id);
    formData.append("signature", signatureHash.toString());
    formData.append("api_key", api_key);
    formData.append("timestamp", timestamp.toString());

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to delete image:", error);
      return false;
    }

    const result = await response.json();
    console.log("Image deleted successfully:", result);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
};
