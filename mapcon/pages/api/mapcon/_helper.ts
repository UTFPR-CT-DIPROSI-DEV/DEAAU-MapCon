import type { NextApiRequest } from "next";

const indentChar = '\t';

function PrettyOBJ(obj: object, name: string, depth = 1): string {
    let indent = indentChar.repeat(depth);
    let prettyObj = `${indent}\x1b[93m${name}:\x1b[0m {`;

    if (obj && Object.keys(obj).length > 0) {
        prettyObj += '\n';
        for (const key in obj) {
            const value = obj[key];
            if (value !== null && typeof value === 'object') {
                // Recursively format nested objects
                prettyObj += PrettyOBJ(value, key, depth + 1);
            } else {
                prettyObj += `${indentChar.repeat(depth + 1)}${key}: ${value} \n`;
            }
        }
        prettyObj += `${indent}}\n`;
    } else {
        prettyObj += '}\n';
    }

    return prettyObj;
}


function LogRequest(filename, req: NextApiRequest) {
    const pathSeparator = process.platform === 'win32' ? '\\' : '/';
    const pathParts = filename.split(pathSeparator);
    const lastDir = pathParts[pathParts.length - 2];
    const fileName = pathParts[pathParts.length - 1];
    const query = req.query;
    const body = req.body;
    let user;
    if (body && body['user']) {
        user = body['user'];
        delete body['user'];
    } else if (query && query['user[id]'] && query['user[perfil]']) {
        user = {
            id: query['user[id]'],
            perfil: query['user[perfil]'],
        }
        delete query['user[id]'];
        delete query['user[perfil]'];
    }    
    const queryString = PrettyOBJ(query, 'Query');
    const bodyString = PrettyOBJ(req.body, 'Body');
    const authorString = PrettyOBJ(user, 'Author');
    const date = new Date();
    console.debug(`\x1b[92mReceived request:\x1b[0m ${date.toLocaleDateString()+" "+date.toLocaleTimeString()}
\x1b[93m${indentChar}Method:\x1b[0m ${req.method} \x1b[91mat file:\x1b[0m \x1b[4m${lastDir}/${fileName}\x1b[0m
${bodyString}
${queryString}
${authorString}`
    );
}

export { LogRequest };