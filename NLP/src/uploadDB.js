import db from "./db/db.js";
import readline from 'readline';

async function getNumberURLs() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('\x1b[93mHow many URLs are to be added?\x1b[0m ', (answer) => {
            const numberOfUrls = parseInt(answer, 10);
            if (isNaN(numberOfUrls)) {
                console.error('Please enter a valid number.');
                rl.close();
                resolve(getNumberURLs()); // Recursively call the function if invalid input
            } else {
                console.log(`You have chosen to add ${numberOfUrls} URLs.`);
                rl.close();
                resolve(numberOfUrls); // Resolve the promise with the valid number
            }
        });
    });
}

async function getTargetTable() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('\x1b[93mAre you adding protests?\x1b[0m (Y/N) ', (answer) => {
            const choice = answer.toUpperCase();
            if (choice !== 'Y' && choice !== 'N') {
                console.error('Please enter Y for "yes" and N for "no".');
                rl.close();
                resolve(getTargetTable()); // Recursively call the function if invalid input
            } else {
                console.log(choice === 'Y' ? `Adding to protesturls table.` : `Adding to nonprotesturls table.`);
                rl.close();
                resolve(choice === 'Y' ? 'protesturls' : 'nonprotesturls');
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

            if (!urlPattern.test(answer)) {
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

const table = await getTargetTable();
// const numURLs = await getNumberURLs();

while (true) {
    const URL = await getURL();
    try {
        await db.insert({ url: URL }).into(table);
        console.log('\x1b[92mURL added.\x1b[0m');
    } catch (error) {
        if (error.code === '23505') {
            console.error('URL already exists in the database.');
        } else {
            console.error('ERROR: ', error);
        }
    }
}