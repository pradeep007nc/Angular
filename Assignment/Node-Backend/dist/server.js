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
const mongoose_1 = __importDefault(require("mongoose"));
const DataFetch_1 = __importDefault(require("./db/DataFetch"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.set("strict", false);
mongoose_1.default.connect('mongodb+srv://Pradeep:root@demodatabase.1uyroh0.mongodb.net/Assignment?retryWrites=true&w=majority')
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.get('/fetch-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backendData = yield DataFetch_1.default.find({});
        console.log('Fetched data:', backendData);
        res.status(200).json(backendData);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: error.message });
    }
}));
//# sourceMappingURL=server.js.map