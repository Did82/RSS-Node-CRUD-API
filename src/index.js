"use strict";
exports.__esModule = true;
require("dotenv/config");
var server_1 = require("./server");
var port = process.env.PORT || 3000;
server_1["default"].listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
