# File Upload Test

Small upload test app: enter an email and upload a file. Each upload is recorded in MongoDB. By default, the file goes to `uploads/<email>/`; change one setting to save to S3.

## Run it

1. Start your MongoDB container. This project is configured for the dedicated test container on port `27018`:

   ```bash
   docker start file-upload-mongo
   ```

2. In this folder, create your local settings file and install packages:

   ```bash
   cp .env.example .env
   npm install
   npm start
   ```

3. Open http://localhost:3000 and upload a file.

## MongoDB records

Open Mongo Express at http://localhost:8081, then use database `file_upload_test` and collection `uploads`.

## Turn on S3 later

Edit `.env` and add `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `S3_BUCKET_NAME`. Then change:

```env
STORAGE_DRIVER=s3
```

The S3 object format will be `uploads/<email>/<unique-file-name>`. Ensure the AWS user can put objects into that bucket.

## API

- `POST /api/uploads` – form fields: `email` and `file`
- `GET /api/uploads/:email` – list uploads for one email
- `GET /api/health` – connection status
