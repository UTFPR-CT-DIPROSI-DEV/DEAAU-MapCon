import { CheerioCrawler, Dataset, log } from "crawlee";
import { classifier, filter_URL } from "./classifier.js";
import { removeAccents, extractText, formatDate, saveRunStatus, saveToDB, readRunStatus, getArticleDate } from "./utils.js";
import cron from 'node-cron';

// Set the log level to DEBUG to see all the logs
log.setLevel(log.LEVELS.DEBUG);

console.debug('Read status: ', readRunStatus());

const defaultURLS = [
    "https://www.tribunapr.com.br/noticias/parana/",
    "http://www.brasildefatopr.com.br/",
    "http://www.bemparana.com.br/",
    "http://www.bandab.com.br/",
    "http://bandnewsfmcuritiba.com/",
];

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
            }
        }
    ],
    async requestHandler({ request, response, body, contentType, $ }) {
        try {
            const title1 = $('title').text();
            const title2 = $('.post-title').first().text();
            const title = title2.startsWith(title1) ? title2 : title1;
            
            const links = $('a[href]')
                .map((_, el) => $(el).attr('href'))
                .get();
            
            // Resolving relative URLs, otherwise
            // they would be unusable for crawling.
            const absoluteUrls = links.map(
                (link) => new URL(link, request.loadedUrl),
            );
            
            // Filtering out the URLs that are not from the same origin.                
            const { origin } = new URL(request.loadedUrl);
            const sameOriginUrls = absoluteUrls
                .filter((url) => url.origin === origin)
                .map((url) => url.href);

            // Creating an object with the data scraped from the current page
            const data = {
                url     : request.loadedUrl,
                // cidades : [{}],
                titulo  : removeAccents(title),
                termos  : [],
                content : extractText(body),  // Make content last to improve readability
                data    : '',
                tipo    : 'f',
            };
            
            // Saving the data scraped from the current page to
            // the dataset if it passes the 'is article' filters.
            if (filter_URL(request.loadedUrl)) {
                const [protesto, termos] = classifier(data.content);
                data.tipo = protesto === true ? 't' : 'f';
                data.data = await getArticleDate(data.url);
                data.termos = termos;
                await Dataset.pushData(data);
                if (data.tipo === 't') {
                    saveToDB(data);
                }
                log.debug(`URL: ${data.url} - Protesto: ${data.protesto} - Title: ${title} - Title 2: ${title2}`);
            }
            
            // Finally, we have to add the URLs to the queue
            await crawler.addRequests(sameOriginUrls);
        } catch (error) {
            console.error('ERROR: ', error);
        }
    },
        maxRequestsPerCrawl: 50,
});

cron.schedule('* * * * *', async () => {
    const date = new Date();
    console.log(`Running a new task at ${formatDate(date)}`);
    // Run the crawler with the default URLs
    await crawler.run(defaultURLS);
    console.debug('Status: ', saveRunStatus());
});
