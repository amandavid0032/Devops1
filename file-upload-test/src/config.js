require('dotenv').config();

const path = require('path');

module.exports = {
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  mongoDbName: process.env.MONGO_DB_NAME || 'file_upload_test',
  storageDriver: (process.env.STORAGE_DRIVER || 'local').toLowerCase(),
  uploadsRoot: path.join(__dirname, '..', 'uploads'),
  maxFileSize: 10 * 1024 * 1024, // 10 MB
  sessionDays: Number(process.env.SESSION_DAYS || 7),
  cookieSecure: process.env.COOKIE_SECURE === 'true', // set true when served over HTTPS
  s3: {
    region: process.env.AWS_REGION,
    bucket: process.env.S3_BUCKET_NAME,
    folder: (process.env.S3_FOLDER || 'uploads').replace(/^\/+|\/+$/g, ''),
  },
};
