# 🐳 Docker Command Reference & Docker Compose — Complete Notes

> Beginner-friendly Docker command reference with explanations, examples, practical MongoDB + Mongo Express setup, Docker Compose, networking, volumes, environment variables, troubleshooting, and cleanup.

---

# 📌 How to Read These Commands

Whenever you see something like:

```bash
docker logs <container>
```

replace `<container>` with the actual container name or ID.

Example:

```bash
docker logs mongodb
```

You can usually use either:

- Container name
- Container ID

Example:

```bash
docker logs mongodb
docker logs a83f92c12345
```

---

# 1. 🔍 Inspect Docker

These commands help you understand the Docker installation and what is currently running.

## `docker version`

```bash
docker version
```

Shows Docker client and server/engine version information.

Useful for checking:

- Docker version
- Docker Engine version
- API version
- OS/architecture information

---

## `docker info`

```bash
docker info
```

Shows detailed information about the Docker environment.

It can show:

- Number of containers
- Number of images
- Storage driver
- Docker root directory
- CPU information
- Memory information
- Docker Engine configuration

### Simple difference

```text
docker version
→ What Docker version am I using?

docker info
→ What is the current Docker environment?
```

---

## `docker ps`

```bash
docker ps
```

Shows **currently running containers**.

Example:

```text
CONTAINER ID   IMAGE       STATUS
abc123         nginx       Up 2 minutes
```

### Important

`docker ps` does NOT show stopped containers.

---

## `docker ps --all`

```bash
docker ps --all
```

Shows:

- Running containers
- Stopped containers
- Exited containers

Short form:

```bash
docker ps -a
```

### Remember

```text
docker ps
→ Running containers

docker ps -a
→ All containers
```

---

## `docker images`

```bash
docker images
```

Lists Docker images stored locally.

Example:

```text
REPOSITORY   TAG       IMAGE ID
nginx        alpine    abc123
mongo        8         def456
```

Modern equivalent:

```bash
docker image ls
```

---

## `docker volume ls`

```bash
docker volume ls
```

Lists Docker volumes.

Example:

```text
DRIVER    VOLUME NAME
local     mongo-data
```

---

## `docker network ls`

```bash
docker network ls
```

Lists Docker networks.

Example:

```text
NETWORK ID   NAME             DRIVER
abc123       bridge           bridge
def456       mongo-network    bridge
```

---

# 2. 🖼️ Docker Images

## `docker pull`

```bash
docker pull mongo:8
```

Downloads the `mongo` image with the `8` tag from a container registry.

Breakdown:

```text
mongo
→ Image repository

8
→ Image tag
```

If the image already exists locally and is up to date, Docker may not need to download all layers again.

---

## `docker image inspect`

```bash
docker image inspect mongo:8
```

Shows detailed metadata about an image.

You can inspect:

- Image ID
- Layers
- Architecture
- Environment
- Entrypoint
- CMD
- Created time
- Configuration

Useful when you want to understand exactly how an image is configured.

---

## `docker build`

```bash
docker build --tag my-app:1.0 .
```

Builds a Docker image from a `Dockerfile`.

### Breakdown

```text
docker build
→ Build an image

--tag my-app:1.0
→ Give the image a name and tag

.
→ Use the current directory as the build context
```

After building:

```bash
docker images
```

You may see:

```text
my-app    1.0
```

### Short form

```bash
docker build -t my-app:1.0 .
```

`-t` is short for `--tag`.

---

# 3. 🗑️ Remove Docker Images

## `docker image rm`

```bash
docker image rm my-app:1.0
```

Removes the image from the local machine.

Short form:

```bash
docker rmi my-app:1.0
```

### Important

An image may be referenced by existing containers. If so, Docker may require you to remove those containers first.

---

## `docker image prune`

```bash
docker image prune
```

Removes **dangling images** that are not tagged and are no longer needed.

Docker asks for confirmation before deleting.

### Be careful

This is cleanup. Do not blindly run destructive cleanup commands on a production machine.

---

# 4. 🚀 Docker Containers

## `docker run`

Example:

```bash
docker run --detach --name web --publish 8080:80 nginx:alpine
```

This creates and starts a new container.

Breakdown:

```text
docker run
→ Create + start a new container

--detach
→ Run in background

--name web
→ Container name = web

--publish 8080:80
→ Host port 8080 → Container port 80

nginx:alpine
→ Image = nginx
→ Tag = alpine
```

After running:

```text
Browser
   │
   ▼
localhost:8080
   │
   ▼
Container port 80
   │
   ▼
Nginx
```

Open:

```text
http://localhost:8080
```

---

# 5. 🧠 `docker run` — Important Concept

When you run:

```bash
docker run nginx
```

Docker approximately performs:

```text
Check local image
       │
       ├── Image exists
       │      ↓
       │   Create container
       │      ↓
       │   Start container
       │
       └── Image missing
              ↓
           Pull image
              ↓
         Create container
              ↓
         Start container
```

### Remember

```text
docker run
= Create + Start
```

It creates a **new container** every time you run it.

---

# 6. ▶️ `docker start`

```bash
docker start <container>
```

Starts an **existing stopped container**.

Example:

```bash
docker start web
```

It does NOT create a new container.

It does NOT normally pull the image again.

### Remember

```text
docker run
→ Create + Start new container

docker start
→ Start existing stopped container
```

---

# 7. 🛑 `docker stop`

```bash
docker stop <container>
```

Stops a running container gracefully.

Example:

```bash
docker stop web
```

The container still exists.

Check:

```bash
docker ps -a
```

You should see it with an exited/stopped status.

---

# 8. 🔄 `docker restart`

```bash
docker restart <container>
```

Restarts an existing container.

Conceptually:

```text
Running
   ↓
Stop
   ↓
Start
   ↓
Running
```

Example:

```bash
docker restart web
```

---

# 9. 📜 `docker logs`

```bash
docker logs <container>
```

Shows the logs produced by the container's main process.

Example:

```bash
docker logs web
```

Or:

```bash
docker logs mongodb
```

---

## Follow Logs

```bash
docker logs --follow <container>
```

Short form:

```bash
docker logs -f <container>
```

This keeps the terminal attached to the log stream and displays new logs as they arrive.

---

## Show Last 100 Lines

```bash
docker logs --tail 100 <container>
```

Combine both:

```bash
docker logs --follow --tail 100 mongodb
```

Meaning:

```text
--follow
→ Keep watching

--tail 100
→ Start with the latest 100 lines
```

---

# 10. 🐚 `docker exec`

```bash
docker exec --interactive --tty <container> sh
```

Runs a command **inside an already running container**.

Short form:

```bash
docker exec -it <container> sh
```

Example:

```bash
docker exec -it mongodb sh
```

---

## What does `-it` mean?

```text
-i
→ Interactive

-t
→ Allocate a terminal
```

Together:

```text
-it
→ Interactive terminal
```

---

## Bash vs sh

Some images have Bash:

```bash
docker exec -it <container> /bin/bash
```

Some lightweight images, especially Alpine-based images, may only have `sh`:

```bash
docker exec -it <container> /bin/sh
```

If `/bin/bash` gives:

```text
bash: not found
```

try:

```bash
docker exec -it <container> sh
```

---

# 11. 🔎 `docker inspect`

```bash
docker inspect <container>
```

Shows detailed low-level information about a container.

It can show:

- Container ID
- Image
- Network configuration
- IP address
- Mounted volumes
- Environment variables
- Port bindings
- Status
- Startup configuration

Example:

```bash
docker inspect mongodb
```

---

# 12. 🗑️ Remove Containers

## `docker rm`

```bash
docker rm <container>
```

Removes a stopped container.

Example:

```bash
docker rm web
```

### Important

The normal `docker rm` command does not remove a running container.

---

## `docker rm --force`

```bash
docker rm --force <container>
```

Short form:

```bash
docker rm -f <container>
```

This force-removes the container.

For a running container, Docker stops it and then removes it.

### Be careful

Removing a container is different from removing a named volume.

A named volume may remain unless explicitly removed.

---

# 13. 🌐 Port Mapping

Syntax:

```bash
docker run --publish <host_port>:<container_port> <image>
```

Example:

```bash
docker run -p 8080:80 nginx
```

Means:

```text
Host
localhost:8080
      │
      ▼
Container
port 80
      │
      ▼
Nginx
```

Therefore:

```text
8080 = Host Port
80   = Container Port
```

### Important

The second number is the **container port**, NOT the container ID.

---

# 14. 🔐 Environment Variables

Example:

```bash
docker run \
  --env NODE_ENV=production \
  my-api:1.0
```

`--env` passes an environment variable into the container.

Short form:

```bash
-e NODE_ENV=production
```

Inside the container, the application can read:

```text
NODE_ENV=production
```

---

# 15. ⚠️ Do Not Put Real Secrets in Images or Git

Avoid:

```bash
docker build ...
```

with passwords hardcoded into a Dockerfile.

Avoid committing:

```text
password=MyRealPassword
```

to Git.

For development, use an `.env` file where appropriate.

For production, prefer a proper secret-management mechanism such as:

- Docker secrets where applicable
- Cloud secret managers
- Kubernetes Secrets
- CI/CD secret stores

---

# 16. 🏷️ Container Names

Example:

```bash
docker run --name example-api nginx
```

Instead of a random generated name, Docker uses:

```text
example-api
```

Then you can use:

```bash
docker logs example-api
docker stop example-api
docker inspect example-api
```

This is easier than remembering a long container ID.

---

# 17. 📦 Volumes

Volumes provide persistent storage.

Create a volume:

```bash
docker volume create mongo-data
```

List volumes:

```bash
docker volume ls
```

Inspect:

```bash
docker volume inspect mongo-data
```

Remove:

```bash
docker volume rm mongo-data
```

### ⚠️ Important

Removing a volume can delete the data stored in that volume.

---

# 18. 🌐 Docker Networks

Create:

```bash
docker network create app-network
```

Inspect:

```bash
docker network inspect app-network
```

Remove:

```bash
docker network rm app-network
```

List:

```bash
docker network ls
```

---

# 19. 🧠 Why Do We Need Docker Networks?

Suppose you have:

```text
Node App
   │
   ▼
MongoDB
```

Both containers can be connected to the same Docker network.

Then the application can use the MongoDB container/service name as the hostname.

Example:

```text
mongodb:27017
```

Instead of:

```text
localhost:27017
```

### Very Important

Inside a container:

```text
localhost
```

means:

> **That same container.**

It does NOT mean another container.

---

# 20. 🐳 MongoDB + Mongo Express — Manual Docker Setup

This example creates:

```text
MongoDB
   +
Mongo Express
```

Mongo Express is a web-based interface for interacting with MongoDB.

---

## Step 1 — Create a Network

```bash
docker network create mongo-network
```

Why?

Because both containers need to communicate.

Architecture:

```text
                 mongo-network
              ┌──────────────────┐
              │                  │
              │   MongoDB        │
              │                  │
              │   mongodb        │
              │                  │
              │   Mongo Express  │
              │                  │
              └──────────────────┘
```

---

# 21. 🗄️ Start MongoDB

```bash
docker run --detach \
  --name mongodb \
  --network mongo-network \
  --publish 27018:27017 \
  --volume mongo-data:/data/db \
  --env MONGO_INITDB_ROOT_USERNAME=admin \
  --env MONGO_INITDB_ROOT_PASSWORD=change-this-password \
  mongo:8
```

Let's understand every part.

### `--detach`

```text
--detach
```

Runs MongoDB in the background.

Short:

```bash
-d
```

---

### `--name mongodb`

```text
--name mongodb
```

Names the container:

```text
mongodb
```

Other containers on the same Docker network can use this name as the hostname.

---

### `--network mongo-network`

```text
--network mongo-network
```

Connects MongoDB to the custom network.

---

### `--publish 27018:27017`

```text
27018:27017
```

Means:

```text
Host port 27018
       ↓
Container port 27017
```

MongoDB normally listens on:

```text
27017
```

So your host machine can access it using:

```text
localhost:27018
```

---

### `--volume mongo-data:/data/db`

```text
mongo-data:/data/db
```

Means:

```text
Docker Volume
mongo-data
      ↓
Container
/data/db
```

MongoDB's database files are stored persistently.

If the MongoDB container is removed:

```text
Container ❌
Volume    ✅
Data      ✅
```

assuming the volume itself is not removed.

---

### MongoDB Username

```bash
--env MONGO_INITDB_ROOT_USERNAME=admin
```

Creates/configures the initial root username.

---

### MongoDB Password

```bash
--env MONGO_INITDB_ROOT_PASSWORD=change-this-password
```

Sets the initial root password.

### ⚠️ Important

Replace this password in real use.

Do not commit real credentials to Git.

---

# 22. 🌐 Start Mongo Express

```bash
docker run --detach \
  --name mongo-express \
  --network mongo-network \
  --publish 8081:8081 \
  --env ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  --env ME_CONFIG_MONGODB_ADMINPASSWORD=change-this-password \
  --env ME_CONFIG_MONGODB_SERVER=mongodb \
  mongo-express:1.0.2-20-alpine3.19
```

---

## `--network mongo-network`

Mongo Express joins the same network as MongoDB.

```text
mongo-network
     │
     ├── mongodb
     │
     └── mongo-express
```

Therefore they can communicate.

---

## `--publish 8081:8081`

Maps:

```text
Host
localhost:8081
      ↓
Mongo Express
8081
```

Open:

```text
http://localhost:8081
```

---

## `ME_CONFIG_MONGODB_SERVER=mongodb`

This is extremely important.

```text
mongodb
```

is the MongoDB container's hostname on the Docker network.

Do NOT use:

```text
localhost
```

Why?

Because inside the Mongo Express container:

```text
localhost
```

means:

```text
Mongo Express container itself
```

It does not mean MongoDB.

Correct:

```text
mongodb:27017
```

---

# 23. 🧠 Manual MongoDB Architecture

After running the commands:

```text
Your Computer
│
├── localhost:27018
│        │
│        ▼
│   MongoDB Container
│        │
│        └── /data/db
│               │
│               ▼
│          mongo-data
│
└── localhost:8081
         │
         ▼
   Mongo Express
         │
         │ mongodb:27017
         ▼
   MongoDB Container
```

---

# 24. 🆚 Host Connection vs Container Connection

This is one of the most important Docker networking concepts.

## Application running directly on your computer

Use:

```text
mongodb://admin:password@localhost:27018/?authSource=admin
```

Why?

Because your computer uses the published host port:

```text
localhost:27018
```

---

## Application running inside Docker Compose

Use:

```text
mongodb://admin:password@mongodb:27017/?authSource=admin
```

Why?

Because the application is inside the Docker network and can directly reach:

```text
mongodb:27017
```

### Remember

```text
Host → localhost:27018

Container → mongodb:27017
```

---

# 25. 🐳 Why Docker Compose?

Without Compose, you may have to remember commands like:

```bash
docker network create ...
docker run ...
docker run ...
docker volume create ...
```

For a bigger application this becomes difficult.

Docker Compose lets you describe the complete application in one YAML file.

Then:

```bash
docker compose up --detach
```

starts everything.

---

# 26. 📄 What is Docker Compose?

Docker Compose is a tool for defining and running multi-container applications using a YAML file.

Typical project:

```text
Application
│
├── Node.js
├── MongoDB
├── Redis
└── Nginx
```

Compose can define all of them in one file.

---

# 27. 📁 Compose File

Modern Docker Compose commonly uses:

```text
compose.yaml
```

You may also see:

```text
docker-compose.yml
```

Create:

```text
compose.yaml
```

---

# 28. 🧩 Complete MongoDB + Mongo Express Compose Example

```yaml
services:

  mongodb:
    image: mongo:8
    container_name: learning-mongodb
    restart: unless-stopped

    ports:
      - "27018:27017"

    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: change-this-password

    volumes:
      - mongo-data:/data/db

    healthcheck:
      test:
        [
          "CMD",
          "mongosh",
          "--quiet",
          "--eval",
          "db.runCommand({ ping: 1 }).ok"
        ]
      interval: 10s
      timeout: 5s
      retries: 5

  mongo-express:
    image: mongo-express:1.0.2-20-alpine3.19
    restart: unless-stopped

    ports:
      - "8081:8081"

    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: change-this-password
      ME_CONFIG_MONGODB_SERVER: mongodb

    depends_on:
      mongodb:
        condition: service_healthy

volumes:

  mongo-data:
```

---

# 29. 🧠 Understanding `services`

```yaml
services:
```

This is where you define the containers/services that belong to the application.

Example:

```yaml
services:
  mongodb:
  mongo-express:
```

There are two services:

```text
mongodb
mongo-express
```

---

# 30. 🗄️ Understanding the `mongodb` Service

```yaml
mongodb:
  image: mongo:8
```

This tells Compose:

> Create the MongoDB service using the `mongo:8` image.

---

## `container_name`

```yaml
container_name: learning-mongodb
```

Gives the actual container a custom name.

Without it, Compose can generate a project-based container name.

---

## `restart`

```yaml
restart: unless-stopped
```

Tells Docker to restart the container when appropriate, unless you have explicitly stopped it.

This is useful for services that should stay running.

---

# 31. 🌐 Compose `ports`

```yaml
ports:
  - "27018:27017"
```

Same concept as:

```bash
docker run -p 27018:27017 mongo
```

Meaning:

```text
Host port 27018
       ↓
Container port 27017
```

---

# 32. 🔐 Compose `environment`

```yaml
environment:
  MONGO_INITDB_ROOT_USERNAME: admin
  MONGO_INITDB_ROOT_PASSWORD: change-this-password
```

These become environment variables inside the MongoDB container.

Equivalent command-line style:

```bash
-e MONGO_INITDB_ROOT_USERNAME=admin
-e MONGO_INITDB_ROOT_PASSWORD=change-this-password
```

---

# 33. 💾 Compose `volumes`

```yaml
volumes:
  - mongo-data:/data/db
```

Connects:

```text
Named Volume
mongo-data
     ↓
Container Path
/data/db
```

This keeps MongoDB data independent of the container lifecycle.

---

# 34. ❤️ Compose `healthcheck`

```yaml
healthcheck:
  test:
    [
      "CMD",
      "mongosh",
      "--quiet",
      "--eval",
      "db.runCommand({ ping: 1 }).ok"
    ]
  interval: 10s
  timeout: 5s
  retries: 5
```

A healthcheck tells Docker how to test whether the service is healthy.

### `test`

Runs a MongoDB ping command.

### `interval`

```text
10s
```

Check every 10 seconds.

### `timeout`

```text
5s
```

A check can take up to 5 seconds before timing out.

### `retries`

```text
5
```

Docker allows 5 failed checks before considering the container unhealthy.

---

# 35. ⏳ `depends_on`

```yaml
depends_on:
  mongodb:
    condition: service_healthy
```

This tells Compose:

> Start Mongo Express after MongoDB passes its healthcheck.

### Important

`depends_on` helps control startup ordering, but applications should still implement database connection retries.

Why?

Because:

```text
Container started
```

does not always mean:

```text
Application completely ready
```

---

# 36. 📦 Top-Level `volumes`

At the bottom:

```yaml
volumes:
  mongo-data:
```

This declares the named volume.

Compose manages this volume.

You can see it with:

```bash
docker volume ls
```

---

# 37. 🚀 `docker compose up`

```bash
docker compose up
```

Creates/starts the services and shows their logs in the terminal.

Example:

```text
mongodb
mongo-express
```

will be started according to the Compose file.

---

# 38. 🚀 `docker compose up --detach`

```bash
docker compose up --detach
```

Short form:

```bash
docker compose up -d
```

Starts the Compose application in the background.

This is one of the most commonly used commands.

---

# 39. 📊 `docker compose ps`

```bash
docker compose ps
```

Shows the status of services defined in the Compose project.

Example:

```text
NAME                SERVICE        STATUS
learning-mongodb    mongodb        Up
mongo-express       mongo-express  Up
```

---

# 40. 📜 `docker compose logs`

```bash
docker compose logs
```

Shows logs from Compose services.

Follow continuously:

```bash
docker compose logs --follow
```

Short:

```bash
docker compose logs -f
```

---

## Logs for One Service

```bash
docker compose logs --follow mongodb
```

Only MongoDB logs will be followed.

---

# 41. 🐚 `docker compose exec`

```bash
docker compose exec mongodb mongosh -u admin -p
```

Executes `mongosh` inside the running MongoDB service.

Docker will ask for the password.

This is usually easier than finding the container ID manually.

---

# 42. 🔄 `docker compose restart`

```bash
docker compose restart
```

Restarts all services.

Restart only MongoDB:

```bash
docker compose restart mongodb
```

---

# 43. 🛑 `docker compose stop`

```bash
docker compose stop
```

Stops Compose services.

Important:

```text
stop
→ Stop containers

down
→ Remove containers and network
```

---

# 44. ▶️ `docker compose start`

```bash
docker compose start
```

Starts previously stopped Compose containers.

Remember:

```text
docker compose start
→ Start existing stopped containers

docker compose up
→ Create/start services as needed
```

---

# 45. 🧹 `docker compose down`

```bash
docker compose down
```

Stops and removes containers and the Compose-created network.

### Important

By default, named volumes are NOT removed.

Therefore your MongoDB volume can remain.

---

# 46. ⚠️ `docker compose down --volumes`

```bash
docker compose down --volumes
```

Short form:

```bash
docker compose down -v
```

Removes:

- Containers
- Networks
- Compose-managed volumes

### ⚠️ Destructive

For the MongoDB example, this can delete the database data stored in:

```text
mongo-data
```

Use carefully.

---

# 47. 🔍 `docker compose config`

```bash
docker compose config
```

Validates and displays the resolved Compose configuration.

Very useful when debugging YAML.

If there is a YAML error, this command can help identify it.

---

# 48. 🧹 Docker Cleanup Commands

Cleanup commands are useful but can be dangerous.

---

## `docker container prune`

```bash
docker container prune
```

Removes all stopped containers.

### ⚠️ Be careful

Any stopped container you still wanted to keep will be removed.

---

## `docker image prune`

```bash
docker image prune
```

Removes dangling images.

---

## `docker volume prune`

```bash
docker volume prune
```

Removes unused local volumes.

### ⚠️ Destructive

Unused does not necessarily mean unimportant.

Review carefully before confirming.

---

## `docker system prune`

```bash
docker system prune
```

Removes unused Docker resources such as:

- Stopped containers
- Unused networks
- Dangling images
- Build cache

---

## `docker system prune --all`

```bash
docker system prune --all
```

More aggressive cleanup.

It can also remove unused images that are not merely dangling.

### ⚠️ Use carefully

This can remove images you expected to keep locally.

---

# 49. 🚨 Avoid Dangerous Mass Deletion Commands

Avoid blindly running:

```bash
docker rm -f $(docker ps -aq)
```

This can remove **every container** on the machine.

Also avoid:

```bash
docker rmi -f $(docker images -aq)
```

This attempts to remove all local images.

Only use commands like these when you deliberately understand the consequences.

---

# 50. 🛠️ Common Docker Problems

## Problem 1 — Port Already Allocated

Example:

```text
Bind for 0.0.0.0:8080 failed:
port is already allocated
```

This means another process/container is already using the host port.

Find the process on macOS/Linux:

```bash
lsof -nP -iTCP:8080 -sTCP:LISTEN
```

Or find Docker containers publishing ports:

```bash
docker ps
```

Then either stop the existing service or choose another host port.

Example:

```yaml
ports:
  - "8082:8081"
```

Now:

```text
Host: 8082
Container: 8081
```

---

# 51. 💥 Problem 2 — Container Exits Immediately

Check:

```bash
docker ps -a
```

Then:

```bash
docker logs <container>
```

Why can this happen?

The main process inside the container may have:

- Crashed
- Finished
- Received invalid configuration
- Failed to connect to another service
- Had an invalid command

### Important Docker Concept

A container normally lives as long as its **main process** is running.

If the main process exits, the container stops.

---

# 52. 🔌 Problem 3 — Containers Cannot Communicate

Suppose:

```text
Node App
   ↓
MongoDB
```

Both should be on the same Docker network.

Check:

```bash
docker network inspect mongo-network
```

Make sure both containers are connected.

Then use:

```text
mongodb:27017
```

not:

```text
localhost:27017
```

---

# 53. 💾 Problem 4 — Database Data Disappeared

If MongoDB was running without persistent storage:

```text
MongoDB Container
       ↓
Database Data
```

removing the container can remove the container's writable data.

Use a named volume:

```bash
docker volume create mongo-data
```

Then:

```bash
docker run \
  --volume mongo-data:/data/db \
  mongo:8
```

Now:

```text
Container
    │
    ▼
Volume
    │
    ▼
Persistent Data
```

---

# 54. 🖼️ Problem 5 — Image Will Not Pull

Example:

```bash
docker pull mongo:8
```

If it fails, check:

1. Image name
2. Image tag
3. Internet connection
4. Registry availability
5. Registry authentication if required

For example:

```bash
docker pull mongo:8
```

is different from:

```bash
docker pull mongodb:8
```

The repository name must be valid.

---

# 55. 📊 Common Docker Command Table

| Command | Purpose |
|---|---|
| `docker version` | Show Docker version |
| `docker info` | Show Docker environment information |
| `docker ps` | Show running containers |
| `docker ps -a` | Show all containers |
| `docker images` | List images |
| `docker pull` | Download image |
| `docker build` | Build image |
| `docker run` | Create and start container |
| `docker start` | Start existing container |
| `docker stop` | Stop container |
| `docker restart` | Restart container |
| `docker logs` | View container logs |
| `docker exec` | Execute command inside container |
| `docker inspect` | Inspect Docker object |
| `docker rm` | Remove container |
| `docker rmi` | Remove image |
| `docker volume ls` | List volumes |
| `docker network ls` | List networks |

---

# 56. 📊 Docker Compose Command Table

| Command | Purpose |
|---|---|
| `docker compose up` | Start/create services |
| `docker compose up -d` | Start in background |
| `docker compose ps` | Show service status |
| `docker compose logs` | Show service logs |
| `docker compose logs -f` | Follow logs |
| `docker compose exec` | Execute command inside service |
| `docker compose restart` | Restart services |
| `docker compose stop` | Stop services |
| `docker compose start` | Start stopped services |
| `docker compose down` | Remove containers and network |
| `docker compose down -v` | Remove containers, network, and volumes |
| `docker compose config` | Validate/render configuration |

---

# 57. 🎯 Important Difference: Docker vs Docker Compose

## Docker

Used to manage individual containers/images/networks/volumes.

Example:

```bash
docker run nginx
```

## Docker Compose

Used to manage a group of related services.

Example:

```text
Node.js
MongoDB
Redis
Nginx
```

All can be defined in:

```text
compose.yaml
```

and started using:

```bash
docker compose up -d
```

---

# 58. 🧠 Important Networking Rule

### Host → Container

Use the published host port:

```text
localhost:27018
```

Example:

```text
mongodb://admin:password@localhost:27018/?authSource=admin
```

### Container → Container

Use the Docker service/container name and the **container port**:

```text
mongodb:27017
```

Example:

```text
mongodb://admin:password@mongodb:27017/?authSource=admin
```

### Remember

```text
HOST
localhost:27018
       │
       ▼
MongoDB Container
27017


OTHER CONTAINER
mongodb:27017
       │
       ▼
MongoDB Container
27017
```

---

# 59. 🧠 Why Is `localhost` Different?

Suppose we have:

```text
Mongo Express Container
       │
       ├── localhost
       │
       ▼
Mongo Express itself
```

Therefore:

```text
localhost:27017
```

inside Mongo Express means:

> Port 27017 of Mongo Express itself.

It does NOT mean MongoDB.

Instead:

```text
mongodb:27017
```

means:

> Find the container/service named `mongodb` on the Docker network and connect to port 27017.

---

# 60. 🚀 Adding a Node.js Application

Suppose your project has:

```text
my-project/
│
├── compose.yaml
├── Dockerfile
├── package.json
└── src/
```

Add this service to `compose.yaml`:

```yaml
  app:
    build: .
    restart: unless-stopped

    ports:
      - "3000:3000"

    environment:
      PORT: 3000
      MONGO_URI: mongodb://admin:change-this-password@mongodb:27017/file_upload_test?authSource=admin
      STORAGE_DRIVER: local

    depends_on:
      mongodb:
        condition: service_healthy
```

---

# 61. 🔨 What Does `build: .` Mean?

```yaml
build: .
```

Means:

> Build the image using the Dockerfile in the current build context.

For:

```text
build: .
```

the `.` means:

```text
Current directory
```

Docker looks for a:

```text
Dockerfile
```

there by default.

---

# 62. 🌐 Node App Port

```yaml
ports:
  - "3000:3000"
```

Means:

```text
Host
localhost:3000
      ↓
Node Container
port 3000
```

Your browser can access:

```text
http://localhost:3000
```

---

# 63. 🔗 Node → MongoDB Connection

Inside Compose:

```text
MONGO_URI=mongodb://admin:password@mongodb:27017/file_upload_test?authSource=admin
```

The important part is:

```text
mongodb:27017
```

Not:

```text
localhost:27018
```

Because the Node application itself is running inside the Compose network.

---

# 64. 🌍 Complete Application Architecture

With:

- Node.js
- MongoDB
- Mongo Express

the architecture becomes:

```text
                         Your Computer
                              │
              ┌───────────────┴───────────────┐
              │                               │
        localhost:3000                 localhost:8081
              │                               │
              ▼                               ▼
       ┌─────────────┐                ┌────────────────┐
       │ Node App    │                │ Mongo Express  │
       │ Container   │                │ Container      │
       └──────┬──────┘                └───────┬────────┘
              │                               │
              │ mongodb:27017                 │ mongodb:27017
              │                               │
              └──────────────┬────────────────┘
                             ▼
                    ┌─────────────────┐
                    │ MongoDB         │
                    │ Container       │
                    │                 │
                    │ Port 27017      │
                    └────────┬────────┘
                             │
                             ▼
                       mongo-data
                          Volume
                             │
                             ▼
                       Persistent Data
```

---

# 65. 🔥 Most Important Commands to Memorize

If you are learning Docker, first memorize these:

```bash
docker ps
docker ps -a
docker images

docker pull nginx
docker run nginx

docker run -d nginx
docker run -d -p 8080:80 nginx
docker run -d --name web -p 8080:80 nginx

docker logs web
docker logs -f web

docker exec -it web sh

docker stop web
docker start web
docker restart web

docker rm web
docker rm -f web

docker volume ls
docker volume create my-volume

docker network ls
docker network create app-network
```

Then learn Compose:

```bash
docker compose up
docker compose up -d
docker compose ps
docker compose logs -f
docker compose exec <service> sh
docker compose restart
docker compose stop
docker compose start
docker compose down
docker compose down -v
docker compose config
```

---

# 66. 🎤 Interview Questions You Should Know

## Q1. What does `docker run` do?

> It creates and starts a new container from an image. If the image is not available locally, Docker attempts to pull it first.

---

## Q2. What does `docker start` do?

> It starts an existing stopped container. It does not create a new container.

---

## Q3. What does `-p 8080:80` mean?

> It publishes host port `8080` and maps it to container port `80`.

---

## Q4. What does `-d` mean?

> Detached mode. The container runs in the background and the terminal is returned to the user.

---

## Q5. What is `docker logs`?

> It displays the logs produced by the container's main process.

---

## Q6. What is `docker exec`?

> It executes a command inside an already running container.

---

## Q7. Why do we use Docker volumes?

> To persist data independently of the container lifecycle, especially for databases and other stateful applications.

---

## Q8. Why can't one container use `localhost` to reach another container?

> Because `localhost` inside a container refers to that same container. Containers on the same Docker network should communicate using the other service/container's DNS name.

---

## Q9. Why use Docker Compose?

> Docker Compose lets us define and manage multiple related services in a single YAML configuration instead of manually running many Docker commands.

---

## Q10. What is the difference between `docker compose stop` and `docker compose down`?

```text
stop
→ Stop services
→ Containers remain

down
→ Stop and remove containers
→ Removes the Compose-created network
```

Named volumes normally remain after:

```bash
docker compose down
```

but can be removed using:

```bash
docker compose down -v
```

---

# 67. ⭐ Final Docker Mental Model

```text
                         DOCKER
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
        Images          Containers         Compose
          │                 │                 │
          │                 │                 ├── Services
          │                 │                 ├── Networks
          │                 │                 └── Volumes
          │                 │
          ▼                 ▼
     docker pull       docker run
     docker build      docker start
     docker rmi        docker stop
                       docker logs
                       docker exec
                       docker rm
```

---

# 68. 🧠 The Most Important Docker Flow

Remember this:

```text
Dockerfile
    │
    │ docker build
    ▼
Docker Image
    │
    │ docker run
    ▼
Docker Container
    │
    ├── Port
    │
    ├── Network
    │
    └── Volume
           │
           ▼
      Persistent Data
```

For multiple containers:

```text
             compose.yaml
                  │
                  ▼
        docker compose up -d
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
     Node       Mongo       Redis
      App         DB
       │          │
       └──────┬───┘
              │
         Docker Network
              │
              ▼
       Service Names
```

---

# ✅ Final Cheat Sheet

```text
IMAGE
→ Template

CONTAINER
→ Runtime instance of image

docker run
→ Create + Start

docker start
→ Start existing container

docker stop
→ Stop container

docker rm
→ Remove container

docker logs
→ View container logs

docker exec
→ Run command inside container

-p HOST:CONTAINER
→ Port mapping

-v VOLUME:CONTAINER_PATH
→ Persistent storage

--network
→ Connect container to a Docker network

docker compose up -d
→ Start multi-container application

docker compose down
→ Remove Compose containers/network

docker compose down -v
→ Also remove volumes — DESTRUCTIVE
```

> 🚀 **Core idea:** Docker manages application containers. Images provide the application template, containers run the application, networks allow containers to communicate, ports allow host access, volumes persist data, and Docker Compose manages multiple related containers from one YAML file.
