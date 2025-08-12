import axiosClient from "../apiClient";

export const reviewResume = async ({ accessToken, refreshToken, data }) => {
  const res = await axiosClient.post(
    "http://localhost:5000/api/ai/review-resume",
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": refreshToken,
        "Content-Type": "multipart/form-data"
      },
    }
  );
  return res.data;
};
