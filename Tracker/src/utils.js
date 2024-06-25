import * as fs from fs;
import * as cheerio from 'cheerio';

// Function to remove accented characters
export function removeAccents(str) {
    // Regex to match any character with the Unicode property 'diacritic'
    const regex = /[\u0300-\u036f\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/g;
    
    // Normalize the string to decompose combined characters into their individual components
    const normalizedStr = str.normalize('NFD');
    
    // Replace the accented characters using the regex
    let cleanStr = normalizedStr.replace(regex, '');
    cleanStr = cleanStr.replace(/“|”/g, '');
    
    return cleanStr.normalize('NFC'); // Normalize back to NFC form (optional)
}

// Function to extract all possible text elements from an HTML body
// while filtering out unwanted elements (gtag, script, style, etc.)
export function extractText(html) {
    // Define the blacklist of tags to remove
    const blacklist = ['script', 'style', 'gtag'];

    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Iterate over the blacklist, removing the tags
    blacklist.forEach(tag => {
        $(tag).remove();
    });

    let text = $('body').text();

    text = text.replace(/\n\s*\n/g, '\n');

    // Extract and return the text from the modified HTML
    return text;
}

// Function to get RUNNING status of the crawler and save it to the
// .run_status.JSON file, keeping track of the ON-periods of the crawler.
export function saveRunStatus(status) {
    const runStatus = {
        status,
        lastRun: new Date().toISOString(),
    };

    fs.writeFileSync('./run_status.json', JSON.stringify(runStatus, null, 2));
}