import axios from "axios";

export const submitFileToStorage = async (file: File | Blob) => {
  if ((file as File).name) {
    const [cloudName, uploadPreset] = [
      process.env.REACT_APP_CLOUD_NAME ?? "",
      process.env.REACT_APP_UPLOAD_PRESET ?? "",
    ];
    if (!cloudName || !uploadPreset) return;
    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("upload_preset", uploadPreset);
    formData.append("resource_type", "video");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      return null;
    }
  }
};
