const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('./src/config');
const { connectMongo, closeMongo, isConnected } = require('./src/db');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  const mongoConnected = isConnected();
  res.status(mongoConnected ? 200 : 503).json({ ok: mongoConnected, mongoConnected, storageDriver: config.storageDriver });
});

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/files', require('./src/routes/files'));
app.use('/api/admin', require('./src/routes/admin'));

app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found.' }));

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File is too large. Maximum size is 10 MB.' });
  }
  if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON body.' });
  console.error(error);
  res.status(error.status || 500).json({ error: error.status ? error.message : 'Something went wrong.' });
});

connectMongo()
  .then(() => {
    const server = app.listen(config.port, () => console.log(`Open http://localhost:${config.port}`));

    // docker stop sends SIGTERM: finish open requests, then close MongoDB and exit.
    const shutdown = (signal) => {
      console.log(`${signal} received, shutting down...`);
      server.close(() => closeMongo().finally(() => process.exit(0)));
    };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB. Check MONGO_URI and that the Mongo container is running.', error.message);
    process.exit(1);
  });
