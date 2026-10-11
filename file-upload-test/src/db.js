const { MongoClient, ObjectId } = require('mongodb');
const config = require('./config');

let client;
let database;

async function connectMongo() {
  client = new MongoClient(config.mongoUri);
  await client.connect();
  database = client.db(config.mongoDbName);

  await Promise.all([
    database.collection('users').createIndex({ email: 1 }, { unique: true }),
    // TTL index: MongoDB deletes a session automatically once expiresAt has passed
    database.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    database.collection('sessions').createIndex({ userId: 1 }),
    database.collection('files').createIndex({ userId: 1, createdAt: -1 }),
  ]);

  console.log(`Connected to MongoDB database: ${database.databaseName}`);
}

function db() {
  if (!database) {
    const error = new Error('MongoDB is not connected yet.');
    error.status = 503;
    throw error;
  }
  return database;
}

function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

async function closeMongo() {
  if (client) await client.close();
}

module.exports = { connectMongo, closeMongo, db, toObjectId, isConnected: () => Boolean(database) };
