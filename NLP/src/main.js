import { CheerioCrawler, log, RequestQueue } from "crawlee";
import { 
    extractText,
    saveContentToFile,
    initDirectory,
    getUserInput,
} from "./utils.js";
import db from "./db/db.js";

// Directory to save the files
const directory = process.env.DATA_DIR;
await initDirectory(directory);

async function runCrawler(URLs, label) {
    // Initialize a request queue
    const requestQueue = await RequestQueue.open();

    for(const URL of URLs) {
        await requestQueue.addRequest(URL);
    }
    let i = 0;
    const crawler = new CheerioCrawler({
        requestQueue,
        maxRequestRetries: 3,
        failedRequestHandler: async ({ request }) => {
            log.error(`Request ${request.url} failed too many times.`);
        },
        errorHandler: async ({ request, error }) => {
            log.error(`Request ${request.url} failed with error: ${error}`);
        },
        async requestHandler({ request, $, body, enqueueLinks }) {
            try {
                const content = extractText(request.url, body);
                console.clear();    
                console.log(`Count: ${i++}`);

                // Save the content of the page to a text file
                await saveContentToFile(directory, content, label);
            } catch (error) {
                console.error('ERROR: ', error);
            }
        },
        maxRequestsPerCrawl: 1000,
    });

    // Run the crawler with the default URLs
    await crawler.run();
}

const userChoice = await getUserInput('Process protests or non-protests?', ['P', 'N'], 'Please enter P for "protests" and N for "non-protests".');

const crawl = async() => {
    // Add starting URLs to the request queue
    if (userChoice === 'P') { 
        const protestURLs = await db.select('*').from('protesturls');
        await runCrawler(protestURLs, 'protesto');
    } else {
        const nonprotestURLs = await db.select('*').from('nonprotesturls');
        await runCrawler(nonprotestURLs, 'nao-protesto');
    }
};

crawl();
