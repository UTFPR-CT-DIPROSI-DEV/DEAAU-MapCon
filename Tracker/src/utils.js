import * as fs from 'fs';
import * as cheerio from 'cheerio';
import axios from "axios";

// Define global path variable
const FILE_PATH = 'runStatus.log';

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

// Function to get the current DAY and TIME and append it to a JSON 
// file and returning the JSON object
export function saveRunStatus() {
    fs.open(FILE_PATH, 'a', (err, fd) => {
        if (err) {
            console.error(`Error opening the file: ${err}`);
        } else {
            fs.readFile(FILE_PATH, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading the file: ${err}`);
                } else {
                    fs.close(fd, (err) => {
                        if (err) {
                            console.error(`Error closing the file: ${err}`);
                        }
                    });
                }
            });
        }
    });

    const date = new Date();
    const runStatus = {
        day: date.toLocaleDateString(),
    };

    // Append the run status to the file
    fs.appendFileSync(FILE_PATH, JSON.stringify(runStatus) + '\n');

    return runStatus;
}

// Function to read the data from the JSON/LOG file and
// parse it into JSON objects
export function readRunStatus() {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        const runStatus = data.split('\n')
                              .filter(line => line.trim() !== '')
                              .map(line => {return JSON.parse(line)});
        return runStatus;
    } catch (err) {
        if(err.code === 'ENOENT') {
            console.debug('The file does not exist.');
            return [];
        } else {
            console.error(`Error reading the file: ${err}`);
        }
    }
}

// Function to retrieve the date of an article from a given URL
const dateRegex = /\/(\d{4})\/(\d{2})\/(\d{2})\//;
export async function getArticleDate(url) {
    try {
        const match = url.match(dateRegex);
        if (match !== null) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }

        // Fetch the HTML content of the article
        const { data } = await axios.get(url);
        
        // Regular expression to filter only the date (and not time)
        const reg = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

        // Load the HTML into Cheerio
        const $ = cheerio.load(data);
        
        // Example 1: Date in a <meta> tag
        let date = $('meta[property="article:published_time"]').attr('content');
        if (date) return date.match(reg)[0];
        
        // Example 2: Date in a <time> tag
        date = $('time[datetime]').attr('datetime');
        if (date) return date.match(reg)[0];
        
        // Example 3: Date in a specific class or ID
        date = $('.publish-date').text();
        if (date) return date.trim().match(reg)[0];
        
        date = $('#publish-date').text();
        if (date) return date.trim().match(reg)[0];

        // Example 4: Date in a <span> tag with class "published updated"
        date = $('span.published').attr('rel');
        if (date) return date.match(reg)[0];
        
        // If none of the above selectors match, return null or an appropriate message
        return 'Date not found';
    } catch (error) {
        console.error('Error fetching article date:', error);
        return 'Error fetching article date';
    }
}