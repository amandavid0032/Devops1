# Docker Compose - MongoDB + Mongo Express Complete Guide

# Learning Objective

After reading this guide you should understand:

- What Docker Compose is
- Why we use docker-compose.yml
- Every line of this file
- Why each option exists
- How MongoDB and Mongo Express communicate
- Common mistakes
- Example Git commits
- Real-world project usage

---

# Original Code

```yaml
version: '3'

services:
  mongodb:
    image: mongo
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password

  mongo-express:
    image: mongo-express
    ports:
      - "8081:8081"
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
      - ME_CONFIG_MONGODB_ADMINPASSWORD=password
      - ME_CONFIG_MONGODB_SERVER=mongodb
```

---

# What is Docker Compose?

Normally, if your application has multiple containers, you would need to start each one manually.

Example

Container 1
- MongoDB

Container 2
- Mongo Express

Container 3
- Node.js

Container 4
- React

Starting all of them manually is difficult.

Docker Compose allows us to define all containers in one file.

Instead of running multiple commands:

```
docker run ...
docker run ...
docker run ...
docker run ...
```

We simply run

```
docker compose up
```

Everything starts automatically.

---

# Line 1

```yaml
version: '3'
```

Meaning

This tells Docker Compose which Compose file format to use.

Think of it like

```
Node Version
PHP Version
Python Version
```

Docker Compose also has versions.

Example

```
version: '2'
version: '3'
version: '3.8'
```

Nowadays Docker Compose automatically understands the version.

Many new projects even remove this line.

Old projects still use it.

---

# services

```yaml
services:
```

This is one of the most important keywords.

Everything inside services is a container.

Example

```
services:

  mongodb

  node

  react

  nginx

  redis
```

Each one becomes a Docker container.

Think of services as

```
Mini computers
```

running together.

---

# mongodb

```yaml
mongodb:
```

This is the service name.

Important

This is NOT the image name.

This is YOUR custom container name inside docker-compose.

Other containers can connect using

```
mongodb
```

Example

Node.js connects using

```
mongodb://mongodb:27017
```

NOT

```
localhost
```

because containers communicate using service names.

---

# image

```yaml
image: mongo
```

Meaning

Download the official MongoDB image from Docker Hub.

Equivalent command

```
docker pull mongo
```

If image does not exist

Docker downloads it automatically.

Think

```
image
=
Blueprint
```

Container

=

Running copy of the image.

Example

```
Image

↓

mongo

↓

Container

↓

mongodb
```

---

# ports

```yaml
ports:
```

Ports expose a container to your computer.

Without ports

Your computer cannot access MongoDB.

---

This line

```yaml
- "27017:27017"
```

Format

```
HOST_PORT : CONTAINER_PORT
```

Meaning

```
Computer

27017

↓

MongoDB Container

27017
```

Example

Your application

```
localhost:27017
```

actually connects to

```
MongoDB Container
```

---

Another Example

```
- "5000:3000"
```

Means

```
Computer

5000

↓

Container

3000
```

---

Why both are 27017?

MongoDB runs on

```
27017
```

inside container.

We expose the same port outside.

---

# environment

```yaml
environment:
```

Environment Variables are variables passed to the container.

Instead of hardcoding

```
username="admin"
```

inside MongoDB,

Docker passes them when the container starts.

---

Variable 1

```yaml
MONGO_INITDB_ROOT_USERNAME=admin
```

Meaning

Create an admin user named

```
admin
```

without this

No admin account is created.

---

Variable 2

```yaml
MONGO_INITDB_ROOT_PASSWORD=password
```

Meaning

Password for admin.

Username

```
admin
```

Password

```
password
```

Later connect like

```
Username

admin

Password

password
```

---

Now MongoDB service is complete.

It starts MongoDB

Creates admin user

Creates password

Exposes port

Done.

---

# Second Service

```yaml
mongo-express:
```

Mongo Express is a web interface for MongoDB.

Without it

Everything must be done using terminal.

With Mongo Express

Open browser

```
http://localhost:8081
```

You can

✔ View databases

✔ Create collections

✔ Delete documents

✔ Insert data

✔ Edit data

Like phpMyAdmin for MySQL.

---

Image

```yaml
image: mongo-express
```

Download official Mongo Express image.

Equivalent

```
docker pull mongo-express
```

---

Ports

```yaml
8081:8081
```

Open browser

```
localhost:8081
```

Container

```
8081
```

Computer

```
8081
```

---

Environment Variable

```yaml
ME_CONFIG_MONGODB_ADMINUSERNAME=admin
```

Mongo Express uses this username to login to MongoDB.

Must match

```
MONGO_INITDB_ROOT_USERNAME
```

Otherwise

Authentication fails.

---

Next

```yaml
ME_CONFIG_MONGODB_ADMINPASSWORD=password
```

Password for MongoDB.

Must match

```
MONGO_INITDB_ROOT_PASSWORD
```

Otherwise

Access denied.

---

Last Variable

```yaml
ME_CONFIG_MONGODB_SERVER=mongodb
```

Very Important.

Mongo Express asks

"Where is MongoDB?"

Answer

```
mongodb
```

Notice

NOT

```
localhost
```

NOT

```
127.0.0.1
```

Why?

Because

Inside Docker network

Containers communicate using

Service Names.

Docker automatically creates DNS.

```
mongo-express

↓

asks DNS

↓

Where is mongodb?

↓

Docker replies

↓

172.x.x.x
```

Automatically.

---

Complete Flow

```
Browser

↓

localhost:8081

↓

Mongo Express Container

↓

mongodb

↓

MongoDB Container

↓

Database
```

---

Docker Network

When Docker Compose starts

It automatically creates

```
project_default
```

network.

Example

```
docker network ls
```

Output

```
mongo_default
```

Both containers join this network.

```
Mongo Express

↓

mongo_default

↓

MongoDB
```

No extra configuration required.

---

Why use Service Name instead of localhost?

Wrong

```
localhost
```

Inside Mongo Express

localhost means

Mongo Express itself

NOT MongoDB.

Correct

```
mongodb
```

because Docker DNS finds MongoDB.

---

How Docker Creates Everything

Step 1

Downloads image

↓

Step 2

Creates network

↓

Step 3

Starts MongoDB

↓

Step 4

Creates admin user

↓

Step 5

Starts Mongo Express

↓

Step 6

Mongo Express connects

↓

Ready

---

Useful Commands

Start

```
docker compose up
```

Detached

```
docker compose up -d
```

Stop

```
docker compose down
```

View Containers

```
docker ps
```

View Logs

```
docker compose logs
```

Restart

```
docker compose restart
```

---

Common Mistakes

Wrong

```yaml
image:mongo
```

Correct

```yaml
image: mongo
```

Need a space after colon.

---

Wrong

```yaml
-27017:27017
```

Correct

```yaml
- "27017:27017"
```

Need proper YAML formatting.

---

Wrong

```
ME_CONFIG_MONGODB_SERVER=localhost
```

Correct

```
ME_CONFIG_MONGODB_SERVER=mongodb
```

---

Wrong Password

MongoDB

```
password123
```

Mongo Express

```
password
```

Result

Authentication Failed

---

Example Git Commits

Initial compose file

```
git add .
git commit -m "Add Docker Compose with MongoDB and Mongo Express"
```

Added environment variables

```
git commit -m "Configure MongoDB root credentials"
```

Expose ports

```
git commit -m "Expose MongoDB and Mongo Express ports"
```

Added Node.js service

```
git commit -m "Add Node.js backend service"
```

Added volumes

```
git commit -m "Persist MongoDB data using Docker volumes"
```

---

Real Project Example

```
services:

  frontend

  backend

  mongodb

  redis

  nginx

  mongo-express
```

Flow

```
User

↓

React Frontend

↓

Node API

↓

MongoDB

↓

Data Stored
```

Admin

↓

Mongo Express

↓

View Database

---

Summary

| Keyword | Purpose |
|----------|---------|
| version | Docker Compose file format |
| services | Defines all containers |
| mongodb | Service name used inside Docker network |
| image | Docker image to download |
| ports | Exposes container ports to host |
| environment | Passes configuration values to container |
| mongo-express | Web UI for MongoDB |
| ME_CONFIG_MONGODB_SERVER | Hostname of MongoDB service |
| MONGO_INITDB_ROOT_USERNAME | Creates MongoDB admin user |
| MONGO_INITDB_ROOT_PASSWORD | Creates MongoDB admin password |

---

# Final Learning

Remember these key points:

1. **Image** = Template downloaded from Docker Hub.
2. **Container** = Running instance of an image.
3. **Service** = A container defined in `docker-compose.yml`.
4. **Ports** = Allow your computer to communicate with a container.
5. **Environment Variables** = Configure the container without changing its code.
6. **Service Name** = Containers communicate using service names (e.g., `mongodb`), not `localhost`.
7. **Docker Compose** = Starts, stops, and manages multiple containers together with a single command.