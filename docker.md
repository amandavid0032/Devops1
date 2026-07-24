# 🚀 DevOps & Docker Complete Notes

---

# 📖 What is DevOps?

## Definition

DevOps is a software development culture and set of practices that combines **Development (Dev)** and **Operations (Ops)** teams to automate, improve, and speed up the software development and deployment process.

The main goal of DevOps is to deliver software faster, more reliably, and with fewer errors through collaboration, automation, Continuous Integration (CI), and Continuous Deployment (CD).

> **DevOps = Development + Operations**

---

## 👨‍💻 Development Team

The Development team is responsible for:

- ✍️ Writing application code
- 🐞 Fixing bugs
- ✨ Creating new features
- ✅ Testing application logic

---

## ⚙️ Operations Team

The Operations team is responsible for:

- 🖥️ Managing servers
- 🚀 Deploying applications
- 📊 Monitoring systems
- ☁️ Managing infrastructure
- 🔒 Maintaining application availability

---

# ❌ Before DevOps

```
Developer
      │
      ▼
Write Code
      │
      ▼
Create ZIP File
      │
      ▼
Send to Operations Team
      │
      ▼
Operations Deploy Application
```

## Problems

- ❌ Deployment could take days or weeks
- ❌ Manual deployment process
- ❌ Human errors during deployment
- ❌ Developers and Operations worked separately
- ❌ Environment mismatch issues
- ❌ Difficult troubleshooting

---

## 🌍 Environment Problem Example

### Developer Machine

- PHP 8.3
- MySQL 8

### Production Server

- PHP 7.4
- MySQL 5.7

Application works on the developer machine but fails in production.

This is called:

> **"Works on my machine" Problem**

---

# ✅ After DevOps

```
Developer
      │
      ▼
Git Push
      │
      ▼
CI/CD Pipeline
      │
      ▼
Automated Testing
      │
      ▼
Docker Build
      │
      ▼
Deploy to Cloud
      │
      ▼
Monitoring
```

## Benefits

- 🚀 Faster releases
- 🤖 Automated deployment
- 🤝 Better collaboration
- 📦 Consistent environments
- 📈 Easier scaling
- 🔄 Easier rollback
- ✅ Improved reliability

---

# 🌍 Real World Example

## ❌ Without DevOps

1. Developer writes code.
2. Creates ZIP file.
3. Uploads files using FTP.
4. Updates server manually.
5. Website breaks.
6. Team fixes issues manually.

---

## ✅ With DevOps

1. Developer pushes code to GitHub.
2. CI/CD pipeline starts automatically.
3. Automated tests run.
4. Docker image is built.
5. Application is deployed automatically.
6. Monitoring checks application health.

No manual deployment required.

---

# 🐳 What is Docker?

## Definition

Docker is an open-source containerization platform that packages an application together with all its dependencies, libraries, configurations, and runtime into a portable unit called a **Container**.

Everything required to run the application is packaged together, ensuring it behaves the same in development, testing, and production.

---

## 📦 Docker Includes

- 📁 Application Code
- 🐘 PHP / Node.js Runtime
- 📦 Composer / NPM Packages
- 📚 Dependencies
- 🔌 Extensions
- ⚙️ Configuration Files
- 🔑 Environment Variables

---

# 📦 Why Docker Was Created

Before Docker:

Different machines had:

- Different PHP versions
- Different libraries
- Different configurations

Result:

Application worked on one machine but failed on another.

Docker solves this problem by packaging everything together.

---

# 🚢 Shipping Container Analogy

## Before Shipping Containers

📺 TV in one box

🪑 Chair in another box

🛋️ Sofa in another box

🪵 Table in another box

Transportation was difficult.

---

## After Shipping Containers

Everything is packed inside one standard container.

Transportation becomes simple and efficient.

Docker works exactly the same way.

Instead of packing:

- TV
- Chair
- Table

Docker packages:

- Laravel Application
- PHP
- Composer
- Extensions
- Configuration
- Dependencies

Everything travels together.

---

# 🖥️ What is Virtualization?

## Definition

Virtualization is a technology that allows multiple operating systems to run on a single physical machine.

Each operating system runs inside its own Virtual Machine (VM).

---

# 💻 What is a Virtual Machine (VM)?

A Virtual Machine is a software-based computer containing:

- Guest Operating System
- Application
- Libraries
- Dependencies

Example:

```
VM 1
├── Ubuntu
├── PHP
└── App A

VM 2
├── Windows
├── .NET
└── App B
```

---

## Problems with Virtual Machines

- 📦 Large image size
- 🧠 High memory usage
- 🐢 Slow startup
- ⚡ Higher CPU consumption
- 💽 Requires separate operating system

---

# 🐳 What is a Container?

## Definition

A Container is a lightweight isolated environment containing an application and everything required to run it.

Containers share the Host Operating System Kernel instead of carrying a complete operating system.

---

## Benefits

- 🚀 Fast startup
- 💾 Small size
- ⚡ Low resource usage
- 📦 Portable
- 🔄 Easy to deploy

---

# 🐳 Docker Architecture

```
Application
      │
      ▼
Docker Container
      │
      ▼
Docker Engine
      │
      ▼
Host Operating System
      │
      ▼
Physical Machine
```

---

# ⚔️ Docker vs Virtual Machine

| Feature | Docker | Virtual Machine |
|----------|---------|----------------|
| Startup Time | Seconds | Minutes |
| Size | MBs | GBs |
| Performance | Fast | Slower |
| Resource Usage | Low | High |
| Guest OS | ❌ No | ✅ Yes |
| Portability | High | Medium |

---

# 🧠 What is Kernel?

The Kernel is the core part of an Operating System.

It acts as a bridge between software and hardware.

Responsibilities:

- Memory Management
- Process Management
- CPU Scheduling
- Hardware Communication
- File System Access

Examples:

- Linux Kernel
- Windows Kernel

---

# 🔄 Why Containers Need Matching Kernels

Containers share the Host Kernel.

```
Linux Container
        │
        ▼
Requires Linux Kernel

Windows Container
        │
        ▼
Requires Windows Kernel
```

Linux containers cannot directly run on the Windows Kernel.

---

# 🐧 Linux Features Used by Containers

## Namespaces

Provide isolation for:

- Processes
- Networks
- Users
- File Systems

---

## cgroups

Control:

- CPU Usage
- Memory Usage
- Resource Limits

---

## Linux System Calls

Examples:

- fork()
- epoll()
- mount()

---

# 🪟 Docker on Windows

Docker Desktop uses **WSL 2 (Windows Subsystem for Linux)**.

Architecture:

```
Windows
      │
      ▼
Docker Desktop
      │
      ▼
WSL 2 Linux Kernel
      │
      ▼
Linux Containers
```

---

# 🖼️ What is a Docker Image?

A Docker Image is a **read-only template** used to create Containers.

It contains:

- Application Code
- Runtime
- Dependencies
- Configuration
- Environment Variables

Properties:

- Portable
- Immutable
- Versioned
- Shareable

> **Image is NOT running.**

---

# 📦 What is a Docker Container?

A Docker Container is a **running instance of a Docker Image.**

```
Docker Image
      │
      ▼
Docker Container
```

### Example

Image = Blueprint

Container = Actual House Built From Blueprint

---

# 🏗️ Docker Image Layers

```
Layer 5 → Application Code
Layer 4 → Laravel
Layer 3 → Composer
Layer 2 → PHP
Layer 1 → Ubuntu

Final Docker Image
```

Benefits:

- Faster Builds
- Less Storage
- Layer Reusability

---

# 📂 Where Do Containers Run?

Containers run inside Docker Engine.

Examples:

- Linux Server
- AWS EC2
- Azure VM
- Google Cloud VM
- Local Computer
- WSL2

Architecture:

```
Container
      │
      ▼
Docker Engine
      │
      ▼
Host Operating System
      │
      ▼
Physical Machine
```

---

# 📦 Docker Image vs Container

## Docker Image

- 📄 Read-only template
- 📦 Contains application code
- 🚫 Not running
- 🏗️ Used to create containers

Example Images:

- postgres
- redis
- mongo
- nginx
- mysql
- node
- php

---

## Docker Container

- ▶️ Running instance of an image
- 📁 Has its own virtual filesystem
- 🌐 Can expose ports
- 🔄 Can be started, stopped, restarted, or removed

### Your Example

> Container is the running environment for an image.

- Virtual File System
- Port Binding (used to communicate with the application running inside the container)

Application Images:

- postgres
- redis
- mongo

---

# 🌐 Port Binding

Containers have their own internal ports.

To access the application from your host machine, Docker maps the **Host Port** to the **Container Port**.

Example:

```
Host Machine

localhost:5000
        │
        ▼
Container Port 5000

localhost:3000
        │
        ▼
Container Port 3000
```

Port Binding allows your browser or another application to communicate with the application running inside the container.

---

# 🖥️ Container Host vs Virtual Host

## Container Host

A Container Host is the physical or virtual machine where Docker Engine runs.

One Host Machine can run multiple containers.

Example:

```
Host Machine

├── Container A (Laravel)
├── Container B (MySQL)
├── Container C (Redis)
├── Container D (Nginx)
```

All containers share the same Host Operating System Kernel.

---

## Virtual Host (Virtual Machine)

Each Virtual Machine has its own complete Operating System.

```
Physical Machine

├── VM 1
│     ├── Ubuntu
│     └── App A
│
├── VM 2
│     ├── Windows
│     └── App B
```

Every VM consumes more RAM, CPU, and storage because each VM includes a full Operating System.

---

## Comparison

| Container Host | Virtual Host |
|----------------|-------------|
| Shares Host OS | Has its own OS |
| Lightweight | Heavy |
| Starts in Seconds | Starts in Minutes |
| Low Resource Usage | High Resource Usage |

---

# 🐳 Common Docker Commands

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

Shows:

- Running Containers
- Stopped Containers

---

## List Images

```bash
docker images
```

---

## Pull Image

```bash
docker pull nginx
```

Downloads the image from Docker Hub.

---

## Run Container

```bash
docker run nginx
```

Runs an nginx container.

If the image does not exist locally, Docker automatically downloads it first.

---

## Run Specific Version

```bash
docker run redis:4.0
```

✅ Pulls Redis 4.0 (if not already downloaded) and starts the container in a single command.

---

## Detached Mode

```bash
docker run -d redis
```

### What does `-d` mean?

`-d` stands for **Detached Mode**.

- Docker runs the container in the background.
- The terminal is immediately free for other commands.
- Docker returns the **Container ID**.

Without `-d`:

- The container runs in the foreground.
- The terminal remains occupied.
- You need to stop the container (`Ctrl + C`) or open another terminal.

---

## Stop Container

```bash
docker stop <container_id>
```

---

## Remove Container

```bash
docker rm <container_id>
```

---

## Remove Image

```bash
docker rmi <image_id>
```

---

# 🧠 Quick Interview Definitions

## DevOps

A culture that combines Development and Operations to automate software delivery and improve collaboration.

---

## Docker

A containerization platform used to package applications with all dependencies and run them consistently across environments.

---

## Container

A lightweight isolated running environment containing an application and its dependencies.

---

## Docker Image

A read-only template used to create containers.

---

## Docker Container

A running instance of a Docker image.

---

## Virtual Machine

A virtual computer containing its own operating system and applications.

---

## Kernel

The core part of an operating system responsible for managing hardware and system resources.

---

## WSL 2

Windows Subsystem for Linux that provides a real Linux Kernel on Windows, allowing Linux containers to run efficiently.

---


binding the port with the specidfi paort for exmaple 
docker run -p6000:6789 
              |.   |

            port.   container id 

docker run -p6000:6789  -d redis 



docker logs container_id
docker logs name of container 


docker run -d  -p6001:6379 --name redis-older redis:4.0
missing ok 


docker exec -it cae905656456 /bin/bash
this cmd is use to go in side the container ok 


docker run  it pul the image and start the container 
and 
docker start run th container not pull the image 

docker run -d -p  --name 


# Additional Docker Notes

## Port Mapping Syntax

```bash
docker run -p <host_port>:<container_port> <image>
```

Example:

```bash
docker run -p 6000:6379 redis
docker run -d -p 6000:6379 redis
```

- Host Port: Port exposed on your machine.
- Container Port: Port used inside the container.

## View Container Logs

```bash
docker logs <container_id>
docker logs <container_name>
```

## Run a Named Redis Container

```bash
docker run -d -p 6001:6379 --name redis-older redis:4.0
```

## Enter a Running Container

```bash
docker exec -it <container_id> /bin/bash
```

This opens an interactive shell inside the container.

## `docker run` vs `docker start`

### `docker run`

- Creates a new container.
- Pulls the image automatically if it does not exist locally.
- Starts the new container.

### `docker start`

- Starts an existing stopped container.
- Does **not** create a new container.
- Does **not** pull the image again.

## Useful Docker Run Options

```bash
docker run -d -p 8080:80 --name my-nginx nginx
```

Where:

- `-d` → Detached mode (run in background)
- `-p` → Port mapping (`host_port:container_port`)
- `--name` → Assign a custom container name
