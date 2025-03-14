# Web Scraper API with Node and Express

REST api built using TS, Node/Express, and Cheerio. The API allows users to extract data from an HTML files based on CSS selectors provided via JSON. The scraper reads a local HTML file, processes it, and returns the scraped data as a JSON response.

## Getting Started

These instructions will help you set up and run the project locally for development and testing purposes.

### Prerequisites

-   Node.js
-   npm

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Ramzi-Abidi/HTML-Parser.git
    ```

2. Install deps:

    ```bash
    cd folder
    npm install
    ```

3. Run
    ```bash
    Build: npm run build
    Start: npm run dev
    Test: npm test
    ```

### Endpoints

There is one endpoint.

3. `POST /extract` scrape data from index.html file.

Accepts a JSON body:
   ```jsonc
    // Body
    {
        "title": "body h1:first-child",
        "prices": "tr > td:first-child",
    };

    // Response:
    {
        "title": "This is the title of the page",
        "prices": [
            "Item",
            "Awesome USB mouse",
            "Vintage PS/2 mouse"
        ]
    }
   ```

   ```jsonc
    // Body
    {

        "title": "h1:first-child",
        "prices": {
            "__root": "html body table tr",
            "itemName": "td:nth-child(1)",
            "price": "td:nth-child(2)"
        }
    }

    // Response:
    {
    "title": "This is the title of the page",
    "prices": [
            {
                "itemName": "Item",
                "price": "Price"
            },
            {
                "itemName": "Awesome USB mouse",
                "price": "3.20"
            },
            {
                "itemName": "Vintage PS/2 mouse",
                "price": "6.60"
            }
        ]
    }
   ```

### Demo

https://github.com/user-attachments/assets/c473fd0a-99ea-4582-99f2-7f8cd6f1af62

To enable the functionality for users to upload an HTML file via request, you can switch to the feature branch:

```bash
git checkout feat/upload-html-file
npm i
npm run dev
```

This branch includes the necessary updates to handle HTML file uploads and validate the file type.

Make sure to install any required dependencies before running the app.

### Demo - Upload html file support

https://github.com/user-attachments/assets/561ba0bc-dd21-4531-a275-fd8bdba7d207

