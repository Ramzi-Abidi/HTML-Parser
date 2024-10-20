import path from "path";
import { ProcessHtmlService } from "../services/processHtmlService";

describe("Process html api", () => {
    test("Extract html: Example 1", async () => {
        const service = new ProcessHtmlService();

        const cssCode = {
            title: "h1:first-child",
            firstParagraph: "p:first",
        };
        const htmlCode = path.resolve(
            __dirname,
            path.join("../data/index.html"),
        );
        const r = await service.extractData(htmlCode, cssCode);
        expect(r).toBeTruthy();
        expect(r).toEqual({
            title: "This is the title of the page",
            firstParagraph:
                "Lorem ipsum dolor sit amet, consectetur adipisicing.",
        });
    });

    test("Extract html: Example 2", async () => {
        const service = new ProcessHtmlService();

        const cssCode = {
            firstParagraph: "p:first",
            contactSection: ".contact ul li",
            footerSection: "footer ul li",
        };
        const htmlCode = path.resolve(
            __dirname,
            path.join("../data/index.html"),
        );
        const r = await service.extractData(htmlCode, cssCode);
        expect(r).toBeTruthy();
        expect(r).toEqual({
            firstParagraph:
                "Lorem ipsum dolor sit amet, consectetur adipisicing.",
            contactSection: [
                "Email: contact@gmail.com",
                "Phone: +216 - 53 676 430",
            ],
            footerSection: ["Home", "About", "Contact"],
        });
    });

    test("Extract html: Example 3", async () => {
        const service = new ProcessHtmlService();

        const cssCode = {
            title: "h1:first-child",
            books: {
                __root: ".books ul li",
                name: "span:nth-child(1)",
                link: "span:nth-child(2)",
            },
            firstParagraph: "p:first",
            contactSection: ".contact ul li",
            footerSection: "footer ul li",
        };
        const htmlCode = path.resolve(
            __dirname,
            path.join("../data/index.html"),
        );
        const r = await service.extractData(htmlCode, cssCode);
        expect(r).toBeTruthy();
        expect(r).toEqual({
            title: "This is the title of the page",
            books: [
                {
                    name: 'The "Republic" by Plato 1',
                    link: "books.com/books/226348/the-republic-by-plato/",
                },
                {
                    name: '"Being and Time" by Martin Heidegger',
                    link: "books.com/books/226348/Martin-Heidegger/",
                },
                {
                    name: '"Meditations" by Marcus Aurelius',
                    link: "books.com/books/226348/Marcus Aurelius",
                },
            ],
            firstParagraph:
                "Lorem ipsum dolor sit amet, consectetur adipisicing.",
            contactSection: [
                "Email: contact@gmail.com",
                "Phone: +216 - 53 676 430",
            ],
            footerSection: ["Home", "About", "Contact"],
        });
    });
});
