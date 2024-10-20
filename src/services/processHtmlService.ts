import { readFile } from "fs/promises";
import * as cheerio from "cheerio";
import { CssCode, ExtractResult } from "../types";

export class ProcessHtmlService {
    async extractData(htmlCode: string, cssCode: CssCode): Promise<ExtractResult> {
        try {
            const html = await readFile(htmlCode, "utf-8");
            const result: ExtractResult = {};

            const $ = cheerio.load(html);
            for (const [key, selector] of Object.entries(cssCode)) {
                if (typeof selector === "string") {
                    result[key] = this.extractDirectElements($, selector);
                } else {
                    result[key] = this.extractRepetitiveElements($, selector);
                }
            }

            return result;
        } catch (err) {
            throw new Error("Error occurred while extracting data.");
        }
    }

    private extractDirectElements($: cheerio.Root, selector: string): string | string[] {
        const elements = $(selector);

        if (elements.length > 1) {
            return elements.map((_, el) => $(el).text().trim()).get();
        }
        const elementContent =
            this.getElementContent(elements) ||
            `No element found for selector: ${selector}`;

        return elementContent;
    }

    private extractRepetitiveElements($: cheerio.Root, selectorObj: Record<string, string>) {
        const rootElements = $(selectorObj.__root);
        const result: Record<string, string>[] = [];

        rootElements.each((_, el) => {
            const itemData: Record<string, string> = {};
            for (const [childKey, childSelector] of Object.entries(selectorObj)) {
                if (childKey !== "__root") {
                    const childElement = $(el).find(childSelector as string);
                    const elementContent = this.getElementContent(childElement);
                    itemData[childKey] =
                        elementContent ||
                        `No element found for selector: ${childSelector}`;
                }
            }
            result.push(itemData);
        });

        return result;
    }

    private getElementContent(element: cheerio.Cheerio): string {
        if (element.length === 0) {
            return "";
        }
        if (element.is("img")) {
            return element.attr("src") || "";
        }
        if (element.is("a")) {
            return element.attr("href") || "";
        }
        return element.text().trim();
    }
}
