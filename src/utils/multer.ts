import multer from "multer";
export const upload = multer({
  limits: {
    fileSize: 1000000,
  },
});
