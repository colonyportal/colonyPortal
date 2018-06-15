// TODO:
// - startup IPFS and deploy the content (maintain a node with the content) (content at ./app/dist/ folder)
// - get the rootURL
// - forward all requests to the IPFS URL

const path = require('path');
const fs = require('fs');
const express = require('express');
const IPFS = require('ipfs');

const app = express();
const ipfsNode = new IPFS();

ipfsNode.on('ready', () => {
    const directory = path.join(__dirname, 'app/dist');
    const files = getFiles(directory);

    addFiles(files, (err, indexHtml) => {
        // On error
        if (err) {
            return log(`There was an error adding the files ${err}`);
        }

        app.get('/', (req, res) => {
            res.redirect(`https://ipfs.io/ipfs/${indexHtml}`);
        });

        app.get('/hash', (req, res) => {
            res.send(`${indexHtml}`);
        });

        app.listen(8888, '0.0.0.0', () => {
            log('ipfs-auto-deploy listening on port 8888');
            log(`redirecting to https://ipfs.io/ipfs/${indexHtml}`);
        });
    });
});

const getFiles = (directory) => {
    var fileNames = fs.readdirSync(directory);
    var fileNamesLength = fileNames.length;
    var files = [];

    for (var i = 0; i < fileNamesLength; i++)
    {
        var filePath = path.join(directory, fileNames[i]);
        var fileName = fileNames[i];

        files.push({
            path: fileName,
            content: fs.createReadStream(filePath)
        });
    }

    return files;
}

const addFiles = (files, cb) => {
    ipfsNode.files.add(files, (err, filesAdded) => {
        if (err)
        {
            return cb(err);
        }

        var indexHtml = "";

        filesAdded.forEach((file) => {
            log(`Added file: ${file.path} hash: ${file.hash}`);

            if (file.path === "index.html")
            {
                indexHtml = file.hash;
            }

            ipfsNode.files.cat(file.hash);
        });

        cb(err, indexHtml);
    });
}

const log = (line) => {
    console.log(`${line}`);
}
