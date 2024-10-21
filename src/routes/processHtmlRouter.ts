import { Router } from "express";
import { processHtmlInputController } from "../controllers/processHtmlController";
import { validateFile } from "../middlewares/validateFile";

import multer from "multer";

const r = Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: validateFile,
});

r.post("/extract", upload.single("htmlFile"), processHtmlInputController);

export default r;
