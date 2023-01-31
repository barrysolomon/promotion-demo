/***
 *  Postgres Query Interface
 * 
 *  Notes
 * 
 *      npm install express
 *      npm install sequelize
 *      npm install pg
 * 
 *  Version History
 * 
 *      Version Date        Author          Notes
 *      0.6.x   01/30/2023  Barry Solomon   Add Promise
 * 
 */

const { response } = require('express');
const express = require('express');
const os = require('os');
const { resolve } = require('path');
const querystring = require('querystring');

const HOSTNAME = os.hostname();
const PORT = process.env.PORT || 8080
const SERVER_VERSION = "0.6.1";

var thequery = "SELECT firstname, lastname FROM public.users;";
var username = "postgres";
var userpassword = "wh4t3v3r4?";

var dbname = "test";
var host = "postgres"; // "192.168.1.57"; // "postgres"; // "127.0.0.1"; // "AuggieTheDoggie"; // 
var port = 5432;

// function loadModules(moduleNames) {

//     let modulesLoaded = [];
//     function loadModule(moduleName) {
//         let moduleNameVar = moduleName.replace(/\-/g, "_").replace(/\//g, "_");
//         let _moduleNameVar = moduleName.replace(/\-/g, "_").replace(/\//g, "_");
//         eval('try { ' + moduleNameVar + ' = (typeof ' + moduleNameVar + ' !== "undefined" && ' + moduleNameVar + ' !== null) ? ' + moduleNameVar + ' : require("' + moduleName + '"); if (moduleNameVar != null) modulesLoaded.push("' + moduleName + '"); } catch { console.log("Module: ' + moduleName + ' is not installed"); } ');
//         if (modulesLoaded.includes(moduleName)) {
//             console.log("Module " + moduleName + " is loaded as " + _moduleNameVar);
//         }
//     }

//     moduleNames.forEach((moduleName) => {
//         loadModule(moduleName);
//     });

//     console.log("Module " + modulesLoaded + " is loaded.");

// }
// loadModules(["sequelize", "pg"]);
const sequelize = require('sequelize');

const _sequelize = new sequelize(dbname, username, userpassword, {
    host: host,
    port: port,
    dialect: 'postgres',
});

express()

    .get('/', (req, res) => {

        res.setHeader('Content-Type', 'text/plain');

        //res.send('Hello World!');
        res.statusCode = 200;

        let ordered = Object.keys(process.env).sort().reduce(
            (obj, key) => {
                obj[key] = process.env[key];
                return obj;
            },
            {}
        );

        let myArgs = process.argv;
        let newDate = new Date();

        // Access the provided 'page' and 'limt' query parameters
        let the_query = req.query?.query ?? thequery;
        let page = req.query?.page;
        let limit = req.query?.limit;

        res.write('Environment Variables\n\n' + JSON.stringify(ordered, null, 4));

        res.write('\n\nArguments:\n\n' + myArgs);
        res.write(`\n\nWelcome to CPLN(${HOSTNAME})! The time is: ` + newDate.toUTCString());

        // Execute postgres query and echo results back to user
        //
        return new Promise((resolve, reject) => {

            //resolve();
            res.write("\n==>var _sequelize = new sequelize\n\n ");

            try {

                res.write("\n==> call return _sequelize:\n");

                return _sequelize

                    .query(the_query, {
                        type: sequelize.QueryTypes.SELECT,
                    })
                    .then(myTableRows => {

                        res.write("\n==> .then(myTableRows => {\n");

                        const result = myTableRows && JSON.stringify(myTableRows);

                        res.write("\n\nQuery:\n\n " + thequery + "\n");
                        res.write("\nResults:\n\n " + result);

                        console.log("myTableRows", JSON.stringify(myTableRows));
                        console.log("Query result", result);

                        if (!myTableRows) {
                            res.end("\nFailed to find raw:\n\n " + result);
                            reject("Failed to find raw");
                        }
                        else {
                            res.end("\n\nSuccess:\n\n " + result);
                            resolve();
                        }

                    })

            }
            catch (e) {
                console.log("------------------------------\n");
                console.log(`stack: ${e.stack}`);
                console.log(`error: ${e}`);
                console.log("------------------------------\n");
            }

        })
            .then(() => {
                res.end("\n\nDone");
            })
            .catch((e) => {
                console.log("------------------------------\n");
                console.log(`stack: ${e.stack}`);
                console.log(`error: ${e}`);
                console.log("------------------------------\n");
            })

    })
    .get('/health', (req, res) => {

        res.setHeader('Content-Type', 'text/plain');

        res.statusCode = 200;

        res.end("We're all good here");

    })

    .listen(PORT, '0.0.0.0', () => {

        console.log(`Server version ${SERVER_VERSION} running at http://${HOSTNAME}:${PORT}/`)

    });