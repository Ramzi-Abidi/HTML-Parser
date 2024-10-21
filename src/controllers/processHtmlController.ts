import { NextFunction, Request, Response } from "express";
import { ProcessHtmlService } from "../services/processHtmlService";
import { CssCode } from "../types";

const service = new ProcessHtmlService();

export async function processHtmlInputController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.log(JSON.parse(req.body.data));
    const cssCode = JSON.parse(req.body.data) as CssCode;
    try {
        const htmlContent = req.file!.buffer.toString();
        const response = await service.extractData(htmlContent, cssCode);
        res.json(response);
    } catch (err) {
        next(err);
    }
}
