import multer from "multer";

export const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(null, true)
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "images/");
        },
        filename: (req, file, cb) => {
          const ext = file.mimetype.split("/")[1];
          cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
        },
    }),
});

