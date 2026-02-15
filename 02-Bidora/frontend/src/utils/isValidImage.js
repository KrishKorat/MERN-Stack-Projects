// src/utils/isValidImage.js
export const isValidImage = (value) =>
    typeof value === "string" &&
    (value.startsWith("http") || value.startsWith("/uploads"));
