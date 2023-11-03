// Import the necessary packages
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import JsonFetchDataModel from "./db/DataFetch";

// Define the cors options
const corsOptions = {
  origin: "http://localhost:4200",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

// Create the Express application
const app = express();

// Apply the CORS middleware
app.use(cors(corsOptions));

app.get("/fetch-data", async (req: Request, res: Response) => {
  try {
    // Use the MongoDB driver to fetch data
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();

    const coll = client.db('Assignment').collection('mean');
    const filter = JsonFetchDataModel;

    // Fetch all documents in the collection
    const result = await coll.find(filter).toArray();

    // Set the response status and body
    res.status(200).json({
      result,
    });

    await client.close();
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
});

//fetch all by filters
//syntax
//GET /fetch-data-by-all-filters?endYear=2023&topics=gas
app.get("/fetch-data-by-all-filters", async (req: Request, res: Response) => {
  try {
    const { endYear, topics, sector, region, pestle, source }= req.query;

    // Create a MongoDB query
    const query: any = {};
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
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();

    const coll = client.db("Assignment").collection("mean");
    const result = await coll.find(query).toArray();

    // Set the response status and body
    res.status(200).json({
      result,
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
});

// Define the endpoint for fetching data by end year
app.get("/fetch-data-by-end-year/:endYear", async (req: Request, res: Response) => {
  try {
    const { endYear } = req.params;

    // Create a MongoDB query
    const filter = { end_year: { $gt: parseInt(endYear) } };

    // Use the MongoDB driver to fetch the data
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();

    const coll = client.db("Assignment").collection("mean");
    const result = await coll.find(filter).toArray();

    // Set the response status and body
    res.status(200).json({
      result,
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
});

// Define the endpoint for fetching data by topics
app.get("/fetch-data-by-topics/:topics", async (req: Request, res: Response) => {
  try {
    const { topics } = req.params;

    // Create a MongoDB query
    const query = { topic: { $eq: `${topics}` } };

    // Use the MongoDB driver to fetch the data
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();

    const coll = client.db("Assignment").collection("mean");
    const result = await coll.find(query).toArray();

    // Set the response status and body
    res.status(200).json({
      result,
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
});

//fetch by sector
app.get("/fetch-data-by-sector/:sector", async (req: Request, res: Response) => {
  try {
    const { sector } = req.params;

    // Create a MongoDB query
    const query = { sector: { $eq: `${sector}` } };

    // Use the MongoDB driver to fetch the data
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();

    const coll = client.db("Assignment").collection("mean");
    const result = await coll.find(query).toArray();

    // Set the response status and body
    res.status(200).json({
      result,
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
});


//fetch by region
app.get("/fetch-data-by-region/:region", async (req: Request, res: Response) => {
  try {
    const { region } = req.params;

    // Create a MongoDB query
    const query = { region: { $eq: `${region}` } };

    // Use the MongoDB driver to fetch the data
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();

    const coll = client.db("Assignment").collection("mean");
    const result = await coll.find(query).toArray();

    // Set the response status and body
    res.status(200).json({
      result,
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
});

//fetch by pestle
app.get("/fetch-data-by-pestle/:pestle", async (req: Request, res: Response) => {
  try {
    const { pestle } = req.params;

    // Create a MongoDB query
    const query = { pestle: { $eq: `${pestle}` } };

    // Use the MongoDB driver to fetch the data
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();

    const coll = client.db("Assignment").collection("mean");
    const result = await coll.find(query).toArray();

    // Set the response status and body
    res.status(200).json({
      result,
    });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
});


// Start the Express server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});