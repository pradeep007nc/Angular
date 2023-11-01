"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MongoDataAcess_1 = __importDefault(require("../Dao/MongoDataAcess")); // Import the database connection
const app = (0, express_1.default)();
app.use((req, res, next) => {
    if (MongoDataAcess_1.default.readyState === 1) {
        next();
    }
    else {
        res.status(500).send('Database connection is not established');
    }
});
//# sourceMappingURL=DataFetch.js.map