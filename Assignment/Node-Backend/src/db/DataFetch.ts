const mongoose = require('mongoose');

// Define a schema for the data
const insightSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
});

// Create a model using the schema
const JsonFetchDataModel = mongoose.model('Insight', insightSchema);

export default JsonFetchDataModel;



