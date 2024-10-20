import { Router } from "express";
import { processHtmlInputController } from "../controllers/processHtmlController";

const r = Router();

r.post("/extract", processHtmlInputController);

export default r;
