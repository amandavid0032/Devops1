# 📁 User Portal — Docker Practice App

A small Node.js + MongoDB app to practise Docker:

- 🔐 Register, log in, log out, log out from all devices
- 👤 Profile: name, phone, bio, change password, delete account
- 📤 File upload per user: list, download, delete (saved locally or in S3)
- 📊 Dashboard with file count and storage used
- 🛡️ Admin page: all users, change role, delete user. **The first registered account is admin.**

```text
file-upload-test/
├── Dockerfile          ← builds the app image
├── .dockerignore       ← files NOT sent into the image
├── compose.yaml        ← app + MongoDB + Mongo Express
├── server.js           ← Express entry point
├── src/
│   ├── config.js       ← settings from environment variables
│   ├── db.js           ← MongoDB connection + indexes
│   ├── auth.js         ← password hashing, sessions (cookies), auth middleware
│   ├── storage.js      ← local / S3 file storage
│   ├── validation.js
│   └── routes/         ← auth, users, files, admin APIs
└── public/             ← frontend (HTML, CSS, JS)
```

---

## 🚀 Option 1 — Docker Compose (easiest)

```bash
cd file-upload-test
docker compose up -d --build
```

| URL | What |
|---|---|
| http://localhost:3000 | User Portal app |
| http://localhost:8083 | Mongo Express (login `admin` / `pass`), database `user_portal` |
| `localhost:27019` | MongoDB for MongoDB Compass (`admin` / `change-this-password`) |

```bash
docker compose ps                 # status (app shows "healthy")
docker compose logs -f app        # app logs
docker compose exec app sh        # shell inside the app container
docker compose down               # stop + remove containers (data kept in volumes)
docker compose down -v            # ⚠️ also delete database + uploaded files
```

To change the MongoDB password, create `MONGO_ROOT_PASSWORD=...` in `.env` **before the first start** (MongoDB only reads it when the volume is empty).

---

## 🐳 Option 2 — Plain `docker` commands (good practice)

```bash
# 1. Build the image from the Dockerfile
docker build -t user-portal:1.0 .

# 2. Network so the app can reach MongoDB by name
docker network create portal-net

# 3. MongoDB with a volume for its data
docker run -d --name portal-mongo --network portal-net \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=change-this-password \
  -v portal-mongo-data:/data/db \
  mongo:8

# 4. The app (uses the container name "portal-mongo" as the host)
docker run -d --name portal-app --network portal-net \
  -p 3000:3000 \
  -e MONGO_URI="mongodb://admin:change-this-password@portal-mongo:27017/?authSource=admin" \
  -e MONGO_DB_NAME=user_portal \
  -v portal-uploads:/app/uploads \
  user-portal:1.0

# 5. Check
docker ps
docker logs -f portal-app
```

Open http://localhost:3000.

Clean up:

```bash
docker rm -f portal-app portal-mongo
docker network rm portal-net
docker volume rm portal-mongo-data portal-uploads   # ⚠️ deletes the data
```

> Stop the Compose stack first (`docker compose down`) — both use host port 3000.

---

## 💻 Option 3 — Run without Docker for the app

Needs a running MongoDB (for example the Compose one on port 27019).

```bash
cp .env.example .env     # set MONGO_URI to your MongoDB
npm install
npm run dev              # restarts on file changes
```

---

## ⚙️ Environment variables

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `3000` | Port the app listens on |
| `MONGO_URI` | `mongodb://localhost:27017` | MongoDB connection string |
| `MONGO_DB_NAME` | `file_upload_test` | Database name |
| `STORAGE_DRIVER` | `local` | `local` = `./uploads/<userId>/`, `s3` = AWS S3 |
| `SESSION_DAYS` | `7` | How long a login lasts |
| `COOKIE_SECURE` | `false` | Set `true` when the site runs on HTTPS |
| `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, `S3_FOLDER` | | Only for `STORAGE_DRIVER=s3` |

---

## 🔌 API

| Method | URL | Auth | What |
|---|---|---|---|
| GET | `/api/health` | – | App + MongoDB status (used by the Docker healthcheck) |
| POST | `/api/auth/register` | – | `{ name, email, password }` |
| POST | `/api/auth/login` | – | `{ email, password }` → sets `sid` cookie |
| POST | `/api/auth/logout` | – | Ends this session |
| POST | `/api/auth/logout-all` | ✅ | Ends all sessions of the user |
| GET | `/api/auth/me` | ✅ | Current user |
| PUT | `/api/users/me` | ✅ | `{ name, phone, bio }` |
| PUT | `/api/users/me/password` | ✅ | `{ currentPassword, newPassword }` |
| DELETE | `/api/users/me` | ✅ | `{ password }` — deletes account + files |
| GET | `/api/files` | ✅ | My files |
| GET | `/api/files/stats` | ✅ | Count, total size, last upload |
| POST | `/api/files` | ✅ | Multipart field `file` (max 10 MB) |
| GET | `/api/files/:id/download` | ✅ | Download my file |
| DELETE | `/api/files/:id` | ✅ | Delete my file |
| GET | `/api/admin/users` | 👑 | All users with file counts |
| PATCH | `/api/admin/users/:id/role` | 👑 | `{ role: "user" \| "admin" }` |
| DELETE | `/api/admin/users/:id` | 👑 | Delete a user and their files |

Passwords are hashed with scrypt. Sessions are random tokens in an HttpOnly cookie; only their SHA-256 hash is stored in MongoDB, and a TTL index deletes expired sessions automatically.

---

## 🧪 Docker things to practise with this app

- `docker image ls user-portal` → image size; `docker history user-portal:1.0` → layers
- Change one line in `public/` and rebuild — the `npm ci` layer comes from **cache**
- `docker compose down` then `up -d` → your users and files are still there (**volumes**)
- `docker compose down -v` → everything is gone
- `docker inspect user-portal-app --format '{{.State.Health.Status}}'` → **healthcheck**
- `docker compose exec app whoami` → `node` (not root)
- `docker compose stop mongodb` → app's `/api/health` fails → restart it
- `docker stats` → CPU/memory of each container
