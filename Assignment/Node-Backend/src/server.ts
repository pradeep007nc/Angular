import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import JsonFetchDataModel from './db/DataFetch';

const app = express();
app.use(express.json())

mongoose.set("strict", false);

mongoose.connect('mongodb+srv://Pradeep:root@demodatabase.1uyroh0.mongodb.net/Assignment?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  app.get('/fetch-data', async (req: Request, res: Response) => {
    try {
      const backendData = await JsonFetchDataModel.find({});
      console.log('Fetched data:', backendData);
      res.status(200).json(backendData);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: error.message });
    }
  });
  