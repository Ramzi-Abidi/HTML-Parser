export const validateFile = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: Function,
) => {
    const filetypes = /html|htm/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
        file.originalname.split(".").pop()!.toLowerCase(),
    );

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb(new Error("Only HTML files are allowed!"), false);
    }
};
