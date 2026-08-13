# 🚀 DevOps & Docker — Complete Notes

> Beginner → Intermediate notes covering DevOps, Docker architecture, images, containers, ports, logs, exec, `run` vs `start`, volumes, and important commands.

---

# 1. 📖 What is DevOps?

## Definition

**DevOps** is a culture and set of practices that combines **Development (Dev)** and **Operations (Ops)** to automate and improve the software development, testing, deployment, and monitoring process.

### Main Goal

> Deliver software **faster, more reliably, and with fewer errors** through collaboration, automation, CI/CD, monitoring, and infrastructure practices.

```text
DevOps = Development + Operations
```

---

# 2. 👨‍💻 Development Team

The Development team is responsible for:

- Writing application code
- Creating new features
- Fixing bugs
- Writing tests
- Improving application functionality
- Maintaining application code

---

# 3. ⚙️ Operations Team

The Operations team is responsible for:

- Managing servers
- Deploying applications
- Managing infrastructure
- Monitoring systems
- Maintaining availability
- Managing security and reliability
- Handling production incidents

---

# 4. ❌ Before DevOps

A traditional development process might look like:

```text
Developer
    │
    ▼
Write Code
    │
    ▼
Create ZIP
    │
    ▼
Send to Operations
    │
    ▼
Manual Deployment
    │
    ▼
Production
```

## Problems

- ❌ Manual deployments
- ❌ Human errors
- ❌ Slow releases
- ❌ Environment differences
- ❌ Difficult troubleshooting
- ❌ Poor communication between teams
- ❌ Rollbacks can be difficult

---

# 5. 🌍 "Works on My Machine" Problem

Example:

### Developer Machine

```text
PHP 8.3
MySQL 8
Ubuntu 24
```

### Production Server

```text
PHP 7.4
MySQL 5.7
Ubuntu 20
```

The application works on the developer's machine but fails in production.

This is commonly called:

> **"Works on my machine" problem**

Docker helps solve this by providing a consistent application environment.

---

# 6. ✅ DevOps Process

A modern workflow can look like:

```text
Developer
    │
    ▼
Git Push
    │
    ▼
CI Pipeline
    │
    ▼
Automated Tests
    │
    ▼
Build Docker Image
    │
    ▼
Push Image to Registry
    │
    ▼
Deploy
    │
    ▼
Monitoring
```

## Benefits

- 🚀 Faster releases
- 🤖 Automation
- 🤝 Better collaboration
- 📦 Consistent environments
- 🔄 Easier rollback
- 📈 Easier scaling
- ✅ Better reliability

---

# 7. 🐳 What is Docker?

## Definition

**Docker** is a containerization platform used to package an application together with its dependencies, libraries, runtime, and configuration into a portable container environment.

Docker helps applications behave consistently across development, testing, and production.

---

# 8. 📦 What Can Be Included in a Docker Image?

Depending on the image, it can contain:

- Application code
- PHP / Node.js / Python runtime
- Composer / npm packages
- System packages
- Runtime libraries
- Required extensions
- Configuration
- Startup commands

> Environment variables are often supplied at **container runtime** rather than permanently baked into the image.

---

# 9. 🚢 Docker Shipping Container Analogy

Imagine shipping goods before standard shipping containers.

Different products required different packaging and handling.

With standard shipping containers:

```text
┌─────────────────────────────┐
│       Shipping Container    │
│                             │
│   TV + Chair + Table        │
│   + Other Goods             │
└─────────────────────────────┘
```

Docker uses a similar idea.

Instead of shipping only application code:

```text
Laravel Application
        +
PHP
        +
Extensions
        +
Dependencies
```

we package the application environment into a container image.

---

# 10. 💻 What is Virtualization?

**Virtualization** allows multiple virtual computers to run on one physical machine.

Each Virtual Machine (VM) generally has its own operating system.

```text
Physical Machine
│
├── VM 1
│   ├── Ubuntu
│   └── Application A
│
├── VM 2
│   ├── Windows
│   └── Application B
│
└── VM 3
    ├── Ubuntu
    └── Application C
```

---

# 11. 💻 What is a Virtual Machine?

A **Virtual Machine** is a software-based computer that has:

- Virtual CPU
- Virtual memory
- Virtual disk
- Guest Operating System
- Libraries
- Applications

Example:

```text
VM
├── Guest OS
├── Libraries
├── Runtime
└── Application
```

---

# 12. ❌ Problems with Virtual Machines

Compared with containers, VMs generally:

- Use more memory
- Require more storage
- Take longer to boot
- Require a complete guest OS
- Have more overhead

---

# 13. 🐳 What is a Container?

A **container** is an isolated process environment used to run an application and its required dependencies.

Containers share the host operating system kernel on Linux.

```text
Application
    │
    ▼
Container
    │
    ▼
Docker Engine
    │
    ▼
Host OS Kernel
```

## Benefits

- 🚀 Fast startup
- 💾 Lightweight
- ⚡ Lower overhead
- 📦 Portable
- 🔄 Easy to deploy
- 🔒 Process/filesystem/network isolation

---

# 14. ⚔️ Docker Container vs Virtual Machine

| Feature | Container | Virtual Machine |
|---|---|---|
| Startup | Usually seconds | Usually longer |
| Size | Usually smaller | Usually larger |
| Guest OS | No separate full OS | Yes |
| Resource usage | Lower | Higher |
| Isolation | Process-level isolation | Full machine/OS virtualization |
| Portability | High | High |
| Kernel | Shares host kernel | Guest OS has its own kernel |

> Containers are not simply "mini VMs." They use OS-level isolation and share a kernel.

---

# 15. 🧠 What is a Kernel?

The **kernel** is the core part of an operating system.

It manages communication between applications and hardware/resources.

Responsibilities include:

- Process management
- Memory management
- CPU scheduling
- File systems
- Networking
- Hardware interaction
- System calls

Examples:

```text
Linux Kernel
Windows NT Kernel
```

---

# 16. 🔄 Why Does the Kernel Matter for Containers?

Linux containers use Linux kernel features.

For example:

```text
Linux Container
      │
      ▼
Linux Kernel
```

Containers do not normally include a complete kernel inside the image.

### Important

A Linux container cannot simply use Windows kernel APIs directly.

On Windows and macOS, Docker Desktop provides a Linux environment/VM layer so Linux containers can run.

---

# 17. 🐧 Linux Features Used by Containers

## Namespaces

Namespaces provide isolation.

They can isolate:

- Processes
- Network
- Users
- Mounts/filesystems
- Hostname
- IPC

Example:

```text
Container A
Processes → isolated

Container B
Processes → isolated
```

---

## cgroups

**Control Groups (cgroups)** manage and limit resources.

They can control:

- CPU
- Memory
- Process counts
- Other system resources

Example:

```text
Container
   │
   ├── CPU Limit
   └── Memory Limit
```

---

# 18. 🪟 Docker on Windows

Docker Desktop can run Linux containers using a Linux environment, commonly through **WSL 2**.

Simplified architecture:

```text
Windows
   │
   ▼
Docker Desktop
   │
   ▼
WSL 2 / Linux Environment
   │
   ▼
Docker Engine
   │
   ▼
Linux Containers
```

---

# 19. 🖼️ What is a Docker Image?

A **Docker Image** is an immutable, versioned template used to create containers.

An image can contain:

- Application code
- Runtime
- Dependencies
- System packages
- Configuration files
- Startup instructions

### Important

> **An image is not a running application.**

```text
Docker Image
      │
      ▼
Docker Container
```

---

# 20. 🏗️ Docker Image Layers

Docker images are built from layers.

Example:

```text
┌──────────────────────────┐
│ Application Code         │
├──────────────────────────┤
│ Composer Dependencies    │
├──────────────────────────┤
│ PHP Runtime              │
├──────────────────────────┤
│ OS Packages              │
├──────────────────────────┤
│ Base Image               │
└──────────────────────────┘
```

## Benefits of Layers

- Reuse
- Faster builds
- Efficient storage
- Better caching

If an unchanged layer already exists, Docker can reuse it instead of rebuilding it.

---

# 21. 📦 What is a Docker Container?

A **Docker container** is a running or stopped instance created from a Docker image.

```text
Image
  │
  ├── Container 1
  ├── Container 2
  └── Container 3
```

One image can be used to create multiple containers.

### Easy Example

```text
Image = Blueprint
Container = House created from blueprint
```

---

# 22. 🧠 Image vs Container

## Docker Image

- Read-only template
- Immutable
- Versioned
- Used to create containers
- Can be pushed to a registry

Examples:

```text
redis
mysql
nginx
postgres
mongo
node
php
```

## Docker Container

- Runtime instance of an image
- Has an isolated filesystem/process/network environment
- Can expose ports
- Can be started/stopped/restarted
- Can be removed

### Remember

```text
IMAGE     = Template
CONTAINER = Runtime Instance
```

---

# 23. 🖥️ Where Do Containers Run?

Containers run through a container runtime/Docker Engine environment.

Examples include:

- Local Linux machine
- AWS EC2
- Azure VM
- Google Cloud VM
- Docker Desktop
- WSL 2 environment

Architecture:

```text
Container
    │
    ▼
Docker Engine
    │
    ▼
Host OS
    │
    ▼
Physical / Virtual Machine
```

---

# 24. 🖥️ Container Host

A **container host** is the machine or VM where the container runtime runs.

One host can run multiple containers.

Example:

```text
Host Machine
│
├── Laravel Container
├── MySQL Container
├── Redis Container
└── Nginx Container
```

Containers share the host kernel on Linux.

---

# 25. 🌐 Port Mapping / Port Binding

Containers have their own network namespace and ports.

To access a containerized application from the host, Docker can publish a container port to a host port.

### Syntax

```bash
docker run -p <host_port>:<container_port> <image>
```

Example:

```bash
docker run -p 6000:6379 redis
```

Meaning:

```text
Host
localhost:6000
      │
      ▼
Container
port 6379
```

So:

```text
6000 = Host Port
6379 = Container Port
```

### Important Correction

The second number is **not a container ID**.

```bash
-p 6000:6379
       │
       └── Container Port
```

---

# 26. 🧠 Redis Port Example

Redis normally listens on:

```text
6379
```

Run Redis:

```bash
docker run -d -p 6000:6379 redis
```

Now:

```text
Your Computer
localhost:6000
      │
      ▼
Redis Container
6379
```

Your application can connect to the host-published port:

```text
localhost:6000
```

---

# 27. 🚀 Detached Mode

```bash
docker run -d redis
```

`-d` means:

> **Detached Mode**

Docker runs the container in the background and returns control of the terminal.

```text
Terminal
   │
   ├── docker run -d redis
   │
   └── Terminal available again
```

Without `-d`, the container runs attached to the current terminal.

---

# 28. 📋 Docker Container Logs

To view logs:

```bash
docker logs <container_id>
```

Or:

```bash
docker logs <container_name>
```

Example:

```bash
docker logs redis
```

### Follow logs continuously

```bash
docker logs -f redis
```

`-f` means follow the log output.

---

# 29. 🏷️ Naming a Container

You can assign a custom name:

```bash
docker run -d --name redis-old redis:4.0
```

Now instead of remembering the container ID, you can use:

```bash
docker logs redis-old
```

---

# 30. 🐳 Complete Redis Example

```bash
docker run -d \
  -p 6001:6379 \
  --name redis-old \
  redis:4.0
```

Meaning:

```text
-d
→ Run in background

-p 6001:6379
→ Host port 6001 → Container port 6379

--name redis-old
→ Container name

redis:4.0
→ Redis image, version 4.0
```

---

# 31. 🐚 Enter a Running Container

Use:

```bash
docker exec -it <container_id> /bin/bash
```

Example:

```bash
docker exec -it cae905656456 /bin/bash
```

This executes `/bin/bash` inside the running container.

---

## What Does `-it` Mean?

```text
-i
→ Interactive

-t
→ Allocate a terminal (TTY)
```

Together:

```bash
-it
```

give you an interactive terminal session.

---

# 32. 🐚 If Bash Does Not Exist

Some lightweight images do not contain Bash.

For example, Alpine-based images commonly use:

```bash
/bin/sh
```

Then use:

```bash
docker exec -it <container_id> /bin/sh
```

---

# 33. 🆚 `docker run` vs `docker start`

This is extremely important.

## `docker run`

```bash
docker run redis
```

It:

1. Uses an image
2. Creates a **new container**
3. Starts that new container
4. Pulls the image first if necessary

```text
Image
  │
  ▼
Create New Container
  │
  ▼
Start Container
```

---

## `docker start`

```bash
docker start <container_id>
```

It:

- Starts an **existing stopped container**
- Does not create a new container
- Does not normally pull a new image

```text
Existing Stopped Container
          │
          ▼
     docker start
          │
          ▼
       Running
```

### Easy Memory Trick

```text
docker run   = CREATE + START
docker start = START existing container
```

---

# 34. 🛑 Stop a Container

```bash
docker stop <container_id>
```

Example:

```bash
docker stop redis-old
```

The container stops but normally still exists.

Check:

```bash
docker ps -a
```

---

# 35. 🗑️ Remove a Container

```bash
docker rm <container_id>
```

Force remove a running container:

```bash
docker rm -f <container_id>
```

---

# 36. 🖼️ Remove an Image

```bash
docker rmi <image_id>
```

Or:

```bash
docker image rm <image_id>
```

The image generally cannot be removed while it is still required by existing containers unless those containers are removed first.

---

# 37. 📋 Important Docker Commands

## Check Docker Version

```bash
docker --version
```

---

## List Running Containers

```bash
docker ps
```

---

## List All Containers

```bash
docker ps -a
```

---

## List Images

```bash
docker images
```

Or:

```bash
docker image ls
```

---

## Pull an Image

```bash
docker pull nginx
```

Downloads an image from a container registry such as Docker Hub.

---

## Run an Image

```bash
docker run nginx
```

If the image is not available locally, Docker attempts to pull it first.

---

## Run Specific Image Version

```bash
docker run redis:4.0
```

Here:

```text
redis = Image
4.0   = Tag
```

---

# 38. 🔖 Docker Image Tags

Images can have tags.

Example:

```bash
redis:4.0
```

Here:

```text
redis → Repository/Image
4.0   → Tag
```

Another example:

```bash
mysql:8.0
```

If no tag is specified:

```bash
docker run redis
```

Docker generally uses the `latest` tag if available.

> `latest` does not necessarily mean "newest version forever"; it is simply a tag.

---

# 39. 📦 Docker Volume

## Definition

A **Docker volume** is Docker-managed persistent storage used to keep data independently from a container's writable layer.

### Simple Definition

> **Volume = Persistent Data Storage**

---

# 40. ❓ Why Do We Need Volumes?

Imagine a MySQL container:

```text
MySQL Container
      │
      ▼
Database Data
```

If the container is deleted, data stored only in the container's writable layer is deleted with the container.

Without a volume:

```text
Container deleted
       ↓
Container data ❌
```

With a volume:

```text
Container deleted
       ↓
Volume remains
       ↓
Database data ✅
```

The volume can then be mounted into a new container.

---

# 41. 🏠 Real-Life Volume Analogy

Think of:

```text
Container = Rented Room
Volume    = Personal Storage Locker
```

If you leave the room:

```text
Container deleted
       ↓
Room gone
```

But:

```text
Storage Locker
       ↓
Still exists
       ↓
Your data remains
```

---

# 42. ➕ Create a Docker Volume

```bash
docker volume create my_volume
```

Check volumes:

```bash
docker volume ls
```

Example:

```text
DRIVER    VOLUME NAME
local     my_volume
```

---

# 43. 🔗 Use a Volume with a Container

```bash
docker run -d \
  --name mycontainer \
  -v my_volume:/data \
  nginx
```

Understand:

```text
-v my_volume:/data
   │          │
   │          └── Container Mount Path
   └───────────── Docker Volume
```

Architecture:

```text
Docker Volume
   my_volume
       │
       ▼
Container
   /data
```

Anything written to `/data` is stored in the volume.

---

# 44. 🗄️ MySQL Volume Example

MySQL stores database files in:

```text
/var/lib/mysql
```

Create volume:

```bash
docker volume create mysql_data
```

Run MySQL:

```bash
docker run -d \
  --name mysql \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0
```

Architecture:

```text
MySQL Container
      │
      ▼
/var/lib/mysql
      │
      ▼
mysql_data Volume
      │
      ▼
Persistent Database Data
```

If the container is deleted:

```bash
docker rm -f mysql
```

The volume can still exist:

```text
mysql_data ✅
```

---

# 45. 🔍 Inspect a Volume

```bash
docker volume inspect mysql_data
```

This can show information such as:

- Name
- Driver
- Mountpoint
- Creation information
- Scope

---

# 46. 🗑️ Delete a Volume

```bash
docker volume rm mysql_data
```

⚠️ If the volume contains important database data, deleting it can permanently remove that data.

---

# 47. 🧹 Remove Unused Volumes

```bash
docker volume prune
```

This removes unused local volumes.

⚠️ Always review what Docker wants to remove before confirming, especially on systems containing important data.

---

# 48. 🆚 Docker Volume vs Bind Mount

There are two common storage approaches.

## Docker Volume

```bash
-v my_volume:/data
```

Docker manages the storage.

```text
Docker
  │
  ▼
my_volume
```

---

## Bind Mount

```bash
-v /Users/aman/project:/app
```

A specific directory on the host is mounted into the container.

```text
Host Folder
/Users/aman/project
        │
        ▼
Container
/app
```

---

## Simple Difference

```text
Volume
→ Docker manages storage.

Bind Mount
→ You choose the host directory.
```

### Common Use Cases

**Volumes:**

- Databases
- Persistent application data
- Production storage

**Bind mounts:**

- Local development
- Source-code sharing
- Live code changes

---

# 49. 📊 Container vs Volume

Remember:

```text
Container = Application Runtime
Volume    = Persistent Data
```

Example:

```text
┌─────────────────────┐
│   MySQL Container   │
│                     │
│   MySQL Application │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    MySQL Volume     │
│                     │
│   Database Data     │
└─────────────────────┘
```

---

# 50. 🔥 Important Docker Command Cheat Sheet

## Containers

```bash
docker ps
docker ps -a
docker run nginx
docker start <container>
docker stop <container>
docker restart <container>
docker rm <container>
docker rm -f <container>
```

---

## Images

```bash
docker images
docker pull nginx
docker rmi <image>
docker image ls
```

---

## Logs

```bash
docker logs <container>
docker logs -f <container>
```

---

## Execute Commands

```bash
docker exec -it <container> /bin/bash
docker exec -it <container> /bin/sh
```

---

## Port Mapping

```bash
docker run -p 6000:6379 redis
```

---

## Detached Mode

```bash
docker run -d redis
```

---

## Container Name

```bash
docker run --name myredis redis
```

---

## Volume

```bash
docker volume create my_volume
docker volume ls
docker volume inspect my_volume
docker volume rm my_volume
docker volume prune
```

---

# 51. 🧩 Useful Docker Run Combination

A very common pattern is:

```bash
docker run -d \
  -p 8080:80 \
  --name my-nginx \
  nginx
```

Meaning:

```text
-d
→ Run in background

-p 8080:80
→ Host port 8080 → Container port 80

--name my-nginx
→ Give container a custom name

nginx
→ Use nginx image
```

Then access:

```text
http://localhost:8080
```

---

# 52. 🧠 Important Docker Concepts

```text
Dockerfile
    ↓
Build
    ↓
Docker Image
    ↓
docker run
    ↓
Docker Container
    ↓
Port / Network
    ↓
Application
```

For persistent data:

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

# 53. 🐳 Dockerfile — Introduction

A **Dockerfile** is a text file containing instructions used to build a Docker image.

Example:

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Build:

```bash
docker build -t my-node-app .
```

Run:

```bash
docker run -d -p 3000:3000 my-node-app
```

---

# 54. 🔨 Docker Build Flow

```text
Dockerfile
     │
     ▼
docker build
     │
     ▼
Docker Image
     │
     ▼
docker run
     │
     ▼
Container
```

---

# 55. 🧠 Dockerfile vs Docker Image vs Container

This is a common interview question.

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
```

### Dockerfile

Instructions for building an image.

### Image

Packaged, immutable template.

### Container

Runtime instance of the image.

---

# 56. ⭐ Quick Interview Definitions

## DevOps

> DevOps is a culture and set of practices that combines Development and Operations to improve collaboration, automation, and software delivery.

## Docker

> Docker is a containerization platform used to package and run applications in isolated, portable environments.

## Container

> A container is an isolated runtime environment for an application and its dependencies.

## Docker Image

> A Docker image is an immutable template used to create containers.

## Docker Container

> A Docker container is a runtime instance created from a Docker image.

## Dockerfile

> A Dockerfile is a text file containing instructions for building a Docker image.

## Virtual Machine

> A virtual machine is a virtual computer that runs its own guest operating system.

## Kernel

> The kernel is the core component of an operating system responsible for managing system resources and providing services to applications.

## WSL 2

> WSL 2 is Microsoft's Windows Subsystem for Linux architecture that uses a real Linux kernel to provide a Linux environment on Windows.

## Docker Volume

> A Docker volume is Docker-managed persistent storage that allows data to survive container deletion.

## Port Mapping

> Port mapping publishes a container port to a port on the host machine.

---

# 57. 🎯 Most Important Things to Remember

### 1. Image vs Container

```text
Image = Template
Container = Running/Created Instance
```

### 2. `run` vs `start`

```text
docker run
= Create + Start

docker start
= Start existing container
```

### 3. Port Mapping

```text
-p HOST_PORT:CONTAINER_PORT
```

Example:

```bash
-p 6000:6379
```

```text
6000 → Host
6379 → Container
```

### 4. Detached Mode

```bash
-d
```

Means:

> Run the container in the background.

### 5. Logs

```bash
docker logs <container>
```

### 6. Enter Container

```bash
docker exec -it <container> /bin/bash
```

or:

```bash
docker exec -it <container> /bin/sh
```

### 7. Volume

```text
Container → Temporary Runtime
Volume    → Persistent Data
```

---

# 58. 🚀 Complete Mental Model

Keep this entire flow in your mind:

```text
                    Dockerfile
                        │
                        │ docker build
                        ▼
                 ┌──────────────┐
                 │ Docker Image │
                 └──────┬───────┘
                        │
                        │ docker run
                        ▼
              ┌───────────────────┐
              │ Docker Container  │
              │                   │
              │ Application       │
              │ Runtime           │
              │ Dependencies      │
              └───────┬───────────┘
                      │
          ┌───────────┼────────────┐
          │           │            │
          ▼           ▼            ▼
       Port        Network       Volume
          │                         │
          ▼                         ▼
       Host                     Persistent
       Access                      Data
```

### The Core Formula

```text
Dockerfile
    ↓
Image
    ↓
Container
    ↓
Application
```

And when persistent data is required:

```text
Container
    +
Volume
    =
Application + Persistent Data
```

---

# 🎤 Interview Revision

If an interviewer asks:

### "What happens when you run this?"

```bash
docker run -d -p 6000:6379 --name redis-old redis:4.0
```

Answer:

> Docker checks whether the `redis:4.0` image is available locally. If it isn't available, Docker pulls it from the configured registry. Docker then creates a new container from that image, names it `redis-old`, publishes host port `6000` to container port `6379`, and runs the container in detached mode.

### "What happens when you run this?"

```bash
docker start redis-old
```

Answer:

> Docker starts the existing stopped container named `redis-old`. It does not create a new container.

### "What does this mean?"

```bash
docker run -p 6000:6379 redis
```

Answer:

> Port `6000` on the host is published to port `6379` inside the Redis container.

### "Why do we use volumes?"

Answer:

> Volumes allow important data, such as database data, to persist independently of a container's lifecycle.

---

# ✅ Final Memory Map

```text
DEVOPS
  │
  ├── CI/CD
  ├── Automation
  ├── Monitoring
  ├── Infrastructure
  └── Collaboration
          │
          ▼
       DOCKER
          │
          ├── Dockerfile
          │      ↓
          │    Image
          │      ↓
          │   Container
          │
          ├── Port Mapping
          │
          ├── Logs
          │
          ├── Exec
          │
          ├── Network
          │
          └── Volume
                 ↓
          Persistent Data
```

> ⭐ **Core concept:** Docker packages the application environment into an image, creates containers from that image, connects them through networking/ports, and uses volumes when data must survive the container lifecycle.