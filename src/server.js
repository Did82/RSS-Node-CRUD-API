"use strict";
exports.__esModule = true;
var http_1 = require("http");
var server = (0, http_1.createServer)(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n', 'utf-8', function () {
        console.log('req.method:', req.method);
    });
});
exports["default"] = server;
