import { CheerioCrawler, log, RequestQueue } from "crawlee";
import { 
    extractText,
    saveContentToFile,
    initDirectory,
    getUserInput,
} from "./utils.js";
import db from "./db/db.js";
import path from 'path';

// Directory to save the files
const directory = process.env.DATA_DIR;

async function runCrawler(URLs, label) {
    // Initialize a request queue
    const requestQueue = await RequestQueue.open();

    // Change the destination directory based on the label
    const labelDirectory = path.join(directory, label);
    await initDirectory(labelDirectory);

    // Add starting URLs to the request queue
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
                await saveContentToFile(labelDirectory, content, label);
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

if (userChoice === 'P') { 
    const protestURLs = await db.select('*').from('protesturls');
    await runCrawler(protestURLs, 'protesto');
} else {
    const nonprotestURLs = await db.select('*').from('nonprotesturls');
    await runCrawler(nonprotestURLs, 'nao-protesto');
}

process.exit(0);
