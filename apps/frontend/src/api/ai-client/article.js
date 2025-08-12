import axiosClient from "../apiClient";

export const generateArticle = async ({ accessToken, refreshToken, data }) => {
  const res = await axiosClient.post(
    "http://localhost:5000/api/ai/generate-article",
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": refreshToken,
      },
    }
  );
  return res.data; // { article: "md string" }
};
