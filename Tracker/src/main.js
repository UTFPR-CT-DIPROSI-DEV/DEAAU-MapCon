import { CheerioCrawler, Dataset, log } from "crawlee";
import { classifier, filter_URL } from "./classifier.js";
import db from "./db/db.js";

// Function to remove accented characters
function removeAccents(str) {
    // Regex to match any character with the Unicode property 'diacritic'
    const regex = /[\u0300-\u036f\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/g;
    
    // Normalize the string to decompose combined characters into their individual components
    const normalizedStr = str.normalize('NFD');
    
    // Replace the accented characters using the regex
    let cleanStr = normalizedStr.replace(regex, '');
    cleanStr = cleanStr.replace(/“|”/g, '');
    
    return cleanStr.normalize('NFC'); // Normalize back to NFC form (optional)
}

log.setLevel(log.LEVELS.ERROR);

const crawler = new CheerioCrawler({
    maxRequestRetries: 0,
    failedRequestHandler: async ({ request }) => {
        log.error(`Request ${request.url} failed too many times.`);
    },
    preNavigationHooks: [
        async ({request}) => {
            const blockedExtensions = ['xml', 'png', 'jpg', 'jpeg', 'webp', 'pdf', 'zip'];
            // Check if the URL ends with one of the allowed extensions
            const url = new URL(request.url);
            const path = url.pathname.toLowerCase();

            // If the URL does not end with one of the allowed extensions, skip the request
            if (blockedExtensions.some(ext => path.endsWith(ext))) {
                console.log(`Skipping ${request.url} due to unsupported file type.`);
                request.noRetry = true;
                return;
                // throw new Error(`Unsupported file type for URL: ${request.url}`);
            }
        }
    ],
    async requestHandler({ request, response, body, contentType, $ }) {
        try {
            const title = $('title').text();
            
            const links = $('a[href]')
            .map((_, el) => $(el).attr('href'))
            .get();
            
            // Resolving relative URLs,
            // otherwise they would be unusable for crawling.
            const { origin } = new URL(request.loadedUrl);
            const absoluteUrls = links.map(
                (link) => new URL(link, request.loadedUrl),
            );
            
            // Filtering out the URLs that are not  
            // from the same origin.                
            const sameOriginUrls = absoluteUrls
            .filter((url) => url.origin === origin)
            .map((url) => url.href);

            // Creating an object with the data scraped from the current page
            const results = {
                url: request.loadedUrl,
                title: removeAccents(title),
            };
            
            // Saving the data scraped from the current page to the dataset
            // if it passes the filters.
            if (filter_URL(request.loadedUrl)) {
                // results.classification = classifier(title);
                await Dataset.pushData(results);
                log.debug(results.url);
            }
            
            // Finally, we have to add the URLs to the queue
            await crawler.addRequests(sameOriginUrls);
        } catch (error) {
            console.error('ERROR: ', error);
        }
    },
        maxRequestsPerCrawl: 2000,
})

const defaultURLS = [
    // "https://www.tribunapr.com.br/noticias/parana/",
    "http://www.brasildefatopr.com.br/",
    // "http://www.bemparana.com.br/",
    // "http://bandnewsfmcuritiba.com/",
    // "http://www.bandab.com.br/"
];

// await crawler.run(defaultURLS);
const res = await db.table('test').columnInfo();
console.log(res);
db.raw("SELECT * FROM test").then((result) => {
    console.log(result.rows);
});