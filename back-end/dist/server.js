"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const calculate_router_1 = require("./router/calculate_router");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
var corsOptions = {
    // origin: "http://localhost:5173",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, body_parser_1.json)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("welcome to wolt booking");
    }
    catch (error) { }
}));
app.use(calculate_router_1.calculate_router);
app.listen(PORT, () => {
    console.log(`listening at ${PORT}....`);
});
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        return res.json({ msg: "fail" });
    }
    else if (req.accepts("json")) {
        res.json({ msg: "404 not found" });
    }
    else {
        res.type("txt").send("404 not found");
    }
});
