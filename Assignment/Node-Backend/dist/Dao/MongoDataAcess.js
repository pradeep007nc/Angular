"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017');
const db = mongoose_1.default.connection;
db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});
db.on('error', (err) => {
    console.log(err);
});
exports.default = db;
//# sourceMappingURL=MongoDataAcess.js.map