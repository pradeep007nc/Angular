"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the necessary packages
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const DataFetch_1 = __importDefault(require("./db/DataFetch"));
// Define the cors options
const corsOptions = {
    origin: "http://localhost:4200",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
};
// Create the Express application
const app = (0, express_1.default)();
// Apply the CORS middleware
app.use((0, cors_1.default)(corsOptions));
app.get("/fetch-data", async (req, res) => {
    try {
        // Use the MongoDB driver to fetch data
        const client = new mongodb_1.MongoClient('mongodb://localhost:27017');
        await client.connect();
        const coll = client.db('Assignment').collection('mean');
        const filter = DataFetch_1.default;
        // Fetch all documents in the collection
        const result = await coll.find(filter).toArray();
        // Set the response status and body
        res.status(200).json({
            result,
        });
        await client.close();
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
});
//fetch all by filters
//syntax
//GET /fetch-data-by-all-filters?endYear=2023&topics=gas
app.get("/fetch-data-by-all-filters", async (req, res) => {
    try {
        const { endYear, topics, sector, region, pestle, source } = req.query;
        // Create a MongoDB query
        const query = {};
        if (endYear) {
            query.end_year = { $gt: parseInt(endYear.toString()) };
        }
        if (topics) {
            query.topic = { $eq: topics };
        }
        if (sector) {
            query.sector = sector;
        }
        if (region) {
            query.region = region;
        }
        if (pestle) {
            query.pestle = pestle;
        }
        if (source) {
            query.source = source;
        }
        // Use the MongoDB driver to fetch the data
        const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
        await client.connect();
        const coll = client.db("Assignment").collection("mean");
        const result = await coll.find(query).toArray();
        // Set the response status and body
        res.status(200).json({
            result,
        });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
});
// Define the endpoint for fetching data by end year
app.get("/fetch-data-by-end-year/:endYear", async (req, res) => {
    try {
        const { endYear } = req.params;
        // Create a MongoDB query
        const filter = { end_year: { $gt: parseInt(endYear) } };
        // Use the MongoDB driver to fetch the data
        const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
        await client.connect();
        const coll = client.db("Assignment").collection("mean");
        const result = await coll.find(filter).toArray();
        // Set the response status and body
        res.status(200).json({
            result,
        });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
});
// Define the endpoint for fetching data by topics
app.get("/fetch-data-by-topics/:topics", async (req, res) => {
    try {
        const { topics } = req.params;
        // Create a MongoDB query
        const query = { topic: { $eq: `${topics}` } };
        // Use the MongoDB driver to fetch the data
        const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
        await client.connect();
        const coll = client.db("Assignment").collection("mean");
        const result = await coll.find(query).toArray();
        // Set the response status and body
        res.status(200).json({
            result,
        });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
});
//fetch by sector
app.get("/fetch-data-by-sector/:sector", async (req, res) => {
    try {
        const { sector } = req.params;
        // Create a MongoDB query
        const query = { sector: { $eq: `${sector}` } };
        // Use the MongoDB driver to fetch the data
        const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
        await client.connect();
        const coll = client.db("Assignment").collection("mean");
        const result = await coll.find(query).toArray();
        // Set the response status and body
        res.status(200).json({
            result,
        });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
});
//fetch by region
app.get("/fetch-data-by-region/:region", async (req, res) => {
    try {
        const { region } = req.params;
        // Create a MongoDB query
        const query = { region: { $eq: `${region}` } };
        // Use the MongoDB driver to fetch the data
        const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
        await client.connect();
        const coll = client.db("Assignment").collection("mean");
        const result = await coll.find(query).toArray();
        // Set the response status and body
        res.status(200).json({
            result,
        });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
});
//fetch by pestle
app.get("/fetch-data-by-pestle/:pestle", async (req, res) => {
    try {
        const { pestle } = req.params;
        // Create a MongoDB query
        const query = { pestle: { $eq: `${pestle}` } };
        // Use the MongoDB driver to fetch the data
        const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
        await client.connect();
        const coll = client.db("Assignment").collection("mean");
        const result = await coll.find(query).toArray();
        // Set the response status and body
        res.status(200).json({
            result,
        });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: error.message });
    }
});
// Start the Express server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
//# sourceMappingURL=server.js.map