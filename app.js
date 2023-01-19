/***
 *  Notes
 * 
 *      npm install express
 * 
 *  Version History
 * 
 *      Version Date        Author          Notes
 *      0.2     01/18/2023  Barry Solomon   Return Environment Variables
 * 
 */

const express = require('express');
const os = require('os');

const HOSTNAME = os.hostname();
const PORT = process.env.PORT || 8080
const SERVER_VERSION = "0.2";

express()
    .get('/', (req, res) => {

        res.setHeader('Content-Type', 'text/plain');

        //res.send('Hello World!');
        res.statusCode = 200;

        const ordered = Object.keys(process.env).sort().reduce(
            (obj, key) => {
                obj[key] = process.env[key];
                return obj;
            },
            {}
        );

        var myArgs = process.argv;
        var newDate = new Date();

        res.end('Environment Variables\n\n' + JSON.stringify(ordered, null, 4) + '\n\nArguments:\n\n' + myArgs + '\n\nWelcome to CPLN! The time is: ' + newDate.toUTCString());

    })
    .listen(PORT, () => {
        console.log(`Server version ${SERVER_VERSION} running at http://${HOSTNAME}:${PORT}/`)
    });