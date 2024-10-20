import db from "./db/db.js";
import readline from 'readline';
import { 
    saveContentToFile,
    extractText,
    initDirectory,
} from "./utils.js";
import axios from 'axios';

async function getTargetTable() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('\x1b[93mAre you adding a protest?\x1b[0m (Y/N) ', (answer) => {
            const choice = answer.toUpperCase();
            if (choice !== 'Y' && choice !== 'N' && choice !== 'EXIT') {
                console.error('Please enter Y for "yes" and N for "no".');
                rl.close();
                resolve(getTargetTable()); // Recursively call the function if invalid input
            } else {
                let output = 'exit';
                if (choice === 'Y') {
                    output = 'protesturls';
                    console.log(`\tAdding to \x1b[94mprotesturls\x1b[0m table.`);
                } else if (choice === 'N') {
                    output = 'nonprotesturls';
                    console.log(`\tAdding to \x1b[94mnonprotesturls\x1b[0m table.`);
                }
                rl.close();
                resolve(output); // Resolve the promise with the valid table name
            }
        });
    });
}

async function getURL() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('\x1b[93mEnter the URL: \x1b[0m', (answer) => {
            const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

            if (!urlPattern.test(answer) && answer.toLowerCase() !== 'exit') {
                console.error('Please enter a valid URL.');
                rl.close();
                resolve(getURL()); // Recursively call the function if invalid input
            } else {
                rl.close();
                resolve(answer); // Resolve the promise with the valid URL
            }
        });
    });
}

console.log('\x1b[94mType "exit" to quit the program.\x1b[0m');

let table = await getTargetTable();
if (table === 'exit') {
    process.exit(0);
}
let URL = await getURL();
const directory = process.env.DATA_DIR;
await initDirectory(directory, 'add');
while (URL !== 'exit' && table !== 'exit') {
    try {
        // Fetch the HTML content of the page
        const { data } = await axios.get(URL);
        
        // Extract the content of the page
        const content = await extractText(URL, data);

        // Defining the label
        const label = table === 'protesturls' ? 'protesto' : 'nao-protesto';
        
        // Insert the URL into the database
        await db.insert({ url: URL }).into(table);
        console.log('\x1b[92mURL added.\x1b[0m');

        // Save the content of the page to a text file
        await saveContentToFile(directory, content, label);
    } catch (error) {
        if (error.code === '23505') {
            console.error('URL already exists in the database.');
        } else {
            console.error('ERROR: ', error);
        }
    }
    table = await getTargetTable();
    if (table === 'exit') {
        process.exit(0);
    }
    URL = await getURL();
}

process.exit(0);