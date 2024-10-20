import { NextFunction, Request, Response } from "express";
import { ProcessHtmlService } from "../services/processHtmlService";
import path from "path";
import { CssCode } from "../types";

const service = new ProcessHtmlService();

export async function processHtmlInputController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const cssCode = req.body as CssCode;
    const htmlCode = path.resolve(__dirname, path.join("../data/index.html"));
    try {
        const response = await service.extractData(htmlCode, cssCode);
        res.json(response);
    } catch (err) {
        next(err);
    }
}
