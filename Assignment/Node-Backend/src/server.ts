import express, { Request, Response } from "express";
import JsonFetchDataModel from "./db/DataFetch";
import cors from "cors";

import {MongoClient} from 'mongodb';

const corsOptions = {
  origin: "http://localhost:4200", 
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });

  app.get("/fetch-data", async (req: Request, res: Response) => {
    try {
      // Use the MongoDB driver to fetch data
      const client = new MongoClient('mongodb+srv://Pradeep:root@demodatabase.1uyroh0.mongodb.net/?retryWrites=true&w=majority');
      await client.connect();
  
      const coll = client.db('Assignment').collection('mean');
      const filter = JsonFetchDataModel;
      const cursor = coll.find(filter);
      const result = await cursor.toArray();
  
      await client.close();

      res.status(200).json(result);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: error.message });
    }
  });