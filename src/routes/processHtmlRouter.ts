import { Router } from "express";
import { processHtmlInputController } from "../controllers/processHtmlController";
import multer from 'multer';

const r = Router();
// Configure multer to store the file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

r.post("/extract", upload.single('htmlFile'), processHtmlInputController);

export default r;
