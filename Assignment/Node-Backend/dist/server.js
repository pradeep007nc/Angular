"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const DataFetch_1 = __importDefault(require("./db/DataFetch"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const corsOptions = {
    origin: "http://localhost:4200",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
mongoose_1.default.set("strict", false);
mongoose_1.default
    .connect('mongodb+srv://Pradeep:root@demodatabase.1uyroh0.mongodb.net/')
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
app.get("/fetch-data", async (req, res) => {
    try {
        // Use the MongoDB driver to fetch data
        const client = new mongodb_1.MongoClient('mongodb+srv://Pradeep:root@demodatabase.1uyroh0.mongodb.net/');
        await client.connect();
        const coll = client.db('Assignment').collection('mean');
        const filter = DataFetch_1.default;
        const cursor = coll.find(filter);
        const result = await cursor.toArray();
        await client.close();
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
});
//# sourceMappingURL=server.js.map