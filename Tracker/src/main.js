import { CheerioCrawler } from "crawlee";

const newsToVisit = [];

const crawler = new CheerioCrawler({
    async requestHandler({$, request}) {
        const title = $('title').text();
        console.log(`The title of "${request.url}" is: ${title}.`);

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
        
        // Printing the found URLs
        console.log(`\nFound ${sameOriginUrls.length} links :`);
        for (let i = 0; i < sameOriginUrls.length; i++) {
            console.log(`\t - ${sameOriginUrls[i]}`);
        }
        // Finally, we have to add the URLs to the queue
        // await crawler.addRequests(sameOriginUrls);
    },
    maxRequestsPerCrawl: 20,
})

const defaultURLS = [
    "https://www.tribunapr.com.br/noticias/parana/",
    "http://www.brasildefatopr.com.br/",
    "http://www.bemparana.com.br/",
    "http://bandnewsfmcuritiba.com/",
    "http://www.bandab.com.br/"
];

await crawler.run(defaultURLS);
