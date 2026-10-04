# 🐳 Docker — Complete Notes (DevOps → Docker → Compose → Interview)

> One file for everything: DevOps basics, Docker concepts, architecture, commands, Dockerfile, volumes, networking, Docker Compose, hands-on projects, troubleshooting, security, interview answers and cheat sheets.
>
> **How to read commands:** anything in `<angle brackets>` is a placeholder. `docker logs <container>` → `docker logs mongodb` or `docker logs a83f92c12345` (name **or** ID both work).

---

## 📑 Table of Contents

- **Part 1 — DevOps Basics** (§1–4)
- **Part 2 — Docker & Container Fundamentals** (§5–13)
- **Part 3 — How Containers Work: OS, Kernel, VM, Architecture** (§14–21)
- **Part 4 — Docker Commands** (§22–34)
- **Part 5 — Dockerfile & Building Images** (§35–41)
- **Part 6 — Volumes (Persistent Data)** (§42–47)
- **Part 7 — Networking** (§48–52)
- **Part 8 — Docker Compose** (§53–61)
- **Part 9 — Hands-on Projects** (§62–66)
- **Part 10 — Cleanup** (§67–68)
- **Part 11 — Troubleshooting** (§69–83)
- **Part 12 — Security & Production** (§84–90)
- **Part 13 — Interview Quick Answers** (§91–93)
- **Part 14 — Cheat Sheets & Mental Model** (§94–98)

---

# 🟦 PART 1 — DevOps Basics

## 1. 📖 What is DevOps?

**DevOps** is a culture and set of practices that combines **Development (Dev)** and **Operations (Ops)** to automate and improve how software is built, tested, deployed and monitored.

```text
DevOps = Development + Operations
```

**Main goal:** deliver software **faster, more reliably and with fewer errors** through collaboration, automation, CI/CD, monitoring and infrastructure practices.

| 👨‍💻 Development Team | ⚙️ Operations Team |
|---|---|
| Writes application code | Manages servers & infrastructure |
| Builds new features | Deploys applications |
| Fixes bugs | Monitors systems |
| Writes tests | Maintains availability |
| Maintains the codebase | Handles security, reliability & production incidents |

---

## 2. ❌ Before DevOps

```text
Developer → Write Code → Create ZIP → Send to Operations → Manual Deployment → Production
```

**Problems:**

- ❌ Manual deployments and human errors
- ❌ Slow releases
- ❌ Environment differences between machines
- ❌ Difficult troubleshooting
- ❌ Poor communication between teams
- ❌ Difficult rollbacks

---

## 3. 🌍 The "Works on My Machine" Problem

| 💻 Developer Machine | 🖥️ Production Server |
|---|---|
| PHP 8.3 | PHP 7.4 |
| Node 22 | Node 20 |
| MySQL 8 | MySQL 5.7 |
| Ubuntu 24 | Ubuntu 20 |

The app works on the developer's machine but fails in production because of:

```text
❌ Version mismatch
❌ Missing dependency
❌ Different configuration
```

**Docker solves this** by packaging the application *with* its environment, so the same environment runs everywhere:

```text
💻 Development → 📦 Container → 🖥️ Production → 📦 Same container environment
```

---

## 4. ✅ Modern DevOps Workflow

```text
Developer
    ↓
Git Push
    ↓
CI Pipeline
    ↓
Automated Tests
    ↓
Build Docker Image
    ↓
Push Image to Registry
    ↓
Deploy
    ↓
Monitoring
```

**Benefits:** 🚀 faster releases · 🤖 automation · 🤝 better collaboration · 📦 consistent environments · 🔄 easier rollback · 📈 easier scaling · ✅ better reliability

---

# 🟩 PART 2 — Docker & Container Fundamentals

## 5. 🐳 What is Docker?

**Docker is an open-source platform used to build, package, distribute and run applications in containers.**

> 🐳 Docker packages an application **and everything it needs** (code, runtime, libraries, dependencies, configuration) into a container so it runs the same way in every environment.

Example — a Laravel app needs:

```text
PHP 8.3 + Composer + Laravel + PHP extensions + Configuration + Application code
```

Docker puts all of this into one consistent, portable environment.

```text
👨‍💻 Developer → builds app → 🐳 Docker → 📦 Container → 🚀 Application runs
```

### What Docker is used for

- 📦 Packaging applications and their dependencies
- 🚀 Running applications consistently everywhere
- 🧪 Reproducible development environments
- 🚚 Moving apps between laptop → test → cloud → production
- 📈 Running many isolated workloads on one machine
- 🔄 Predictable, automated deployments (CI/CD)

### Why was Docker created?

1. **Environment inconsistency** — "works on my machine" bugs.
2. **Heavy VMs** — every VM needs a full guest OS (GBs of RAM/disk).
3. **Dependency conflicts** — e.g. Python 3.9 vs 3.11, Node 18 vs 20 on the same server.
4. **Slow provisioning** — VMs take minutes; containers start in seconds or less.

---

## 6. 🚢 Shipping Container Analogy

Before standard shipping containers, every product needed different packaging and handling. With a standard container, *anything* goes inside and every ship/truck/crane can handle it.

```text
┌─────────────────────────────┐
│       Shipping Container    │
│   TV + Chair + Table + ...  │
└─────────────────────────────┘
```

Docker does the same for software — instead of shipping only code, we ship:

```text
Laravel App + PHP + Extensions + Dependencies  →  one standard container image
```

---

## 7. 📦 What is a Container?

**Simple definition:** a container is an **isolated environment** where an application runs together with everything it needs.

**Technical definition:** a container is just a **normal Linux process** that is isolated using kernel **namespaces** (what it can *see*) and limited using **cgroups** (what it can *use*), running on top of a stack of **image layers** plus a thin **writable layer**.

```text
📦 Container
├── 💻 Application
├── 📚 Dependencies
├── 🔧 Libraries
├── ⚙️ Configuration
└── 🏃 Runtime
```

Example:

```text
📦 Laravel Container
├── Laravel application
├── PHP + required extensions
├── Composer dependencies
└── Configuration
```

Key facts:

- A container is made of **layers of images** + a writable layer on top.
- Most images use a **Linux base image** (often **Alpine**, ~5 MB) because it is small.
- A container is a **running (or stopped) instance** of an image.
- A container lives **as long as its main process (PID 1) runs** — when it exits, the container stops.

### Benefits of containers

- 🚀 Fast startup (seconds or less)
- 💾 Lightweight — no full guest OS
- ⚡ Low overhead
- 📦 Portable
- 🔄 Easy to deploy and replace
- 🔒 Process / filesystem / network isolation

---

## 8. 🔒 What Does "Isolated" Mean?

Each container has its own environment, so different apps (and different versions) can run side-by-side without installing anything on the host:

```text
                 🖥️ Host Machine
                       │
                   🐳 Docker
             ┌─────────┴─────────┐
             ↓                   ↓
      📦 Container A       📦 Container B
      Laravel / PHP 8.3    Node.js 22
```

Containers are isolated from each other **but can communicate when you connect them** through Docker networking (Part 7).

---

## 9. 🖼️ What is a Docker Image?

**A Docker image is a read-only, immutable, versioned template (blueprint) used to create containers.**

```text
🖼️ Docker Image
├── 📁 Filesystem (base OS userland, e.g. Alpine/Debian)
├── 📦 Application code
├── 🏃 Runtime (PHP / Node.js / Python ...)
├── 📚 Dependencies (Composer / npm packages)
├── 🔧 System packages & libraries
├── ⚙️ Configuration files
└── 🚀 Startup command (CMD / ENTRYPOINT)
```

Important points:

- An image is **not running** — it is the packaged artifact that can be moved around.
- An image is **immutable** — changes made inside a running container go to the container's own writable layer (Copy-on-Write), never into the image.
- Images are built from **layers** (see §40).
- Environment variables are often supplied at **container runtime** rather than baked into the image.

Common images: `nginx`, `redis`, `mysql`, `postgres`, `mongo`, `node`, `php`, `ubuntu`.

---

## 10. 🧠 Image vs Container (most important concept)

```text
🖼️ IMAGE  ── docker run ──▶  📦 CONTAINER  ──▶  🚀 APPLICATION
"Blueprint"                 "Running instance"
```

| | 🖼️ Image | 📦 Container |
|---|---|---|
| What | Template / blueprint | Running (or stopped) instance |
| State | Static, read-only, immutable | Dynamic, has a writable layer |
| Lives | On disk / in a registry | On a host, using CPU & memory |
| Running? | Never | Yes (or stopped) |
| Created by | `docker build` / `docker pull` | `docker run` / `docker create` |
| Can | Be tagged, pushed, pulled | Expose ports, be started/stopped/removed |
| Analogy | House blueprint / Class / Binary | Built house / Object / Process |

**Image comes first → container comes after.**

```text
🌐 Registry → 🖼️ nginx image → docker run → 📦 nginx container → 🚀 Nginx running
```

### One image → many containers

```text
             🖼️ nginx image
          ┌────────┼────────┐
          ↓        ↓        ↓
       📦 web-1  📦 web-2  📦 web-3
```

Each container is a separate instance with its own writable layer, IP address and process space.

> 🧠 **Memory trick:** Image = Blueprint · Container = House built from it.

---

## 11. 🌍 Where Do Containers & Images Live?

> **Containers run on machines. Images are stored in registries and pulled to machines to create containers.**

### Container host

A **container host** is any machine/VM where a container runtime (Docker Engine) runs. One host runs many containers, all sharing the host kernel:

```text
🖥️ Production Server
   └── 🐳 Docker
        ├── 📦 Laravel Container
        ├── 📦 MySQL Container
        ├── 📦 Redis Container
        └── 📦 Nginx Container
```

Examples of hosts: your Mac/PC (Docker Desktop), a Linux machine, AWS EC2, Azure VM, Google Cloud VM, a WSL 2 environment.

```text
Container → Docker Engine → Host OS → Physical / Virtual Machine
```

### Image flow

```text
👨‍💻 Developer → 🐳 docker build → 🖼️ Image → 🌐 Registry → 🖥️ Server pulls → 🐳 Docker → 📦 Container
```

---

## 12. 🌐 Registry, Repository & Tags

### Container Registry

A **registry** is a service that **stores and distributes** container images (upload = `push`, download = `pull`).

| Registry | Type |
|---|---|
| **Docker Hub** | Public + private (default registry) |
| Amazon ECR | Cloud private |
| Google Artifact Registry | Cloud private |
| Azure Container Registry (ACR) | Cloud private |
| Harbor / Nexus | Self-hosted |

### Repository

A **repository** is a named location inside a registry that holds one image and all its versions (tags):

```text
🌐 Registry
├── 📁 my-laravel-app
│     ├── :latest
│     ├── :1.0
│     └── :1.1
└── 📁 my-api
      ├── :latest
      └── :2.0
```

### Public vs Private

| | 🌍 Public Repository | 🔐 Private Repository |
|---|---|---|
| Access | Anyone | Only authorized users/systems |
| Authentication | Usually not needed to pull | Required |
| Typical use | Open-source / official images (`nginx`, `mysql`, `redis`) | Company / proprietary images (`company-api`) |
| Example | Public Docker Hub repo | AWS ECR, private Docker Hub repo, Harbor |

Private registries are used for proprietary apps, internal services, production deployments and CI/CD pipelines.

### Tags

```text
redis:4.0
  │    │
  │    └── Tag (version)
  └─────── Repository / image name
```

- No tag → Docker uses `latest` (`docker run redis` = `docker run redis:latest`).
- `latest` is **just a tag name**, not a guarantee of "newest".

| Tag | Meaning |
|---|---|
| `latest` | Floating pointer — can change any time ⚠️ not for production |
| `1.0` | Minor-version line (may receive patch updates) |
| `1.0.1` | Exact patch version — most reproducible |

> In production **pin exact versions** (`mongo:8.0.4`, `node:20-alpine`) so a deploy never pulls surprise breaking changes.

---

## 13. 🧠 Terminology Summary

| Term | Meaning |
|---|---|
| 🐳 **Docker** | Platform/tool to build, distribute and run containers |
| 🖼️ **Image** | Read-only, immutable blueprint used to create containers |
| 📦 **Container** | Running/stopped instance of an image (isolated process) |
| 📄 **Dockerfile** | Text file with instructions to build an image |
| 🌐 **Registry** | Service that stores/distributes images (Docker Hub, ECR) |
| 📁 **Repository** | Named place in a registry for one image + its tags |
| 🔖 **Tag** | Version label of an image (`nginx:1.27`) |
| 💾 **Volume** | Docker-managed persistent storage |
| 🌐 **Network** | Virtual network that lets containers talk |
| 🧩 **Compose** | Tool to define/run multi-container apps from one YAML file |

> 🧠 **One-line memory trick:** Dockerfile = recipe → Image = blueprint → Container = running instance → Registry = where images are stored.

---

# 🟨 PART 3 — How Containers Work: OS, Kernel, VM, Architecture

## 14. 🧠 OS Layers & the Kernel

An operating system has **two layers**:

```text
┌───────────────────────────┐
│  Applications (Layer 2)   │  ← apps run on top of the kernel
├───────────────────────────┤
│  OS Kernel    (Layer 1)   │  ← talks to the hardware
├───────────────────────────┤
│  Hardware                 │
└───────────────────────────┘
```

The **kernel** is the core of the OS. It manages communication between applications and hardware:

- Process management & CPU scheduling
- Memory management
- File systems
- Networking
- Hardware interaction
- System calls

Examples: **Linux kernel**, **Windows NT kernel**.

### Which layer is virtualized?

```text
Docker  → virtualizes the APPLICATION layer   (uses the host's kernel)
VM      → virtualizes APPLICATION + KERNEL    (has its own kernel)
```

This is why:

- Docker images are small (MBs) and containers start in seconds.
- VMs are large (GBs) and take minutes to boot.
- A **Linux** container needs a **Linux** kernel — it cannot use Windows kernel APIs directly (see §17).

---

## 15. 💻 Virtualization & Virtual Machines

**Virtualization** lets multiple virtual computers run on one physical machine. A **hypervisor** creates each **Virtual Machine (VM)**, which has its own:

- Virtual CPU, memory and disk
- **Full guest operating system (with its own kernel)**
- Libraries, runtime and applications

```text
Physical Machine
├── VM 1 → Ubuntu  → App A
├── VM 2 → Windows → App B
└── VM 3 → Ubuntu  → App C
```

**Downsides of VMs compared with containers:** more memory, more storage, slower boot, full guest OS per app, more overhead.

---

## 16. ⚔️ Container vs Virtual Machine

```text
        VIRTUAL MACHINES                         CONTAINERS
┌─────────┐ ┌─────────┐               ┌─────────┐ ┌─────────┐
│  App A  │ │  App B  │               │  App A  │ │  App B  │
│ Libs    │ │ Libs    │               │ Libs    │ │ Libs    │
│Guest OS │ │Guest OS │               └─────────┘ └─────────┘
└─────────┘ └─────────┘               ┌───────────────────────┐
┌───────────────────────┐             │    Docker Engine      │
│      Hypervisor       │             ├───────────────────────┤
├───────────────────────┤             │ Host OS (shared kernel)│
│       Host / HW       │             ├───────────────────────┤
└───────────────────────┘             │       Hardware        │
                                      └───────────────────────┘
```

| Feature | 📦 Container | 🖥️ Virtual Machine |
|---|---|---|
| Virtualizes | OS (application layer) | Hardware (app + kernel) |
| Kernel | Shares host kernel | Own guest kernel |
| Guest OS | No full OS (only userland files) | Full OS |
| Size | MBs (5 MB – 500 MB) | GBs (10 – 50 GB) |
| Startup | Milliseconds – seconds | Minutes |
| Resource usage | Low | High |
| Isolation | Process-level (namespaces + cgroups) | Hardware-level (hypervisor) |
| Density | Hundreds/thousands per host | Tens per host |

> Containers are **not** "mini VMs". Every container on a host shares **one** Linux kernel; a container only contains user-space files (`/bin`, `/lib`, `/usr`, tools, libraries).

---

## 17. 🪟 Docker on Windows & macOS

Linux containers need a Linux kernel. Windows and macOS don't have one, so **Docker Desktop runs a lightweight Linux VM** in the background:

```text
Windows / macOS
     ↓
Docker Desktop
     ↓
Linux VM  (WSL 2 on Windows · Apple Virtualization Framework on macOS)
     ↓
Docker Engine
     ↓
Linux Containers
```

- **WSL 2** = Windows Subsystem for Linux v2 — runs a real Linux kernel on Windows.
- **Docker Desktop** = GUI app for Mac/Windows that bundles Docker Engine, CLI, Compose, Kubernetes, Docker Scout, buildx and the Linux VM.

---

## 18. 🐧 Namespaces & cgroups (how isolation works)

| | **Namespaces** | **cgroups (Control Groups)** |
|---|---|---|
| Question it answers | What can a container **SEE**? | What can a container **USE**? |
| Purpose | Isolation | Resource limits |
| Controls | Processes, network, mounts, users, hostname, IPC | CPU, memory, disk I/O, process count |
| Prevents | Containers seeing host/other containers | One container starving the host ("noisy neighbour") |

### Namespace types

| Namespace | Isolates |
|---|---|
| **PID** | Process IDs — the container has its own PID 1 |
| **NET** | Network interfaces, IPs, routes, ports |
| **MNT** | Mount points / filesystem |
| **UTS** | Hostname |
| **IPC** | Inter-process communication (shared memory, queues) |
| **USER** | User/group IDs (map container root → non-root host user) |

```text
Container
├── Namespaces → isolated processes, network, filesystem
└── cgroups    → CPU limit, memory limit
```

Other kernel security features used: **seccomp**, **AppArmor / SELinux**, **Linux capabilities**.

> A container **is** a process — just one wrapped in namespaces and limited by cgroups.

---

## 19. 🏗️ Docker Architecture

Docker uses a **client–server architecture**:

```text
┌──────────────┐   REST API over        ┌───────────────────────────────┐        ┌────────────┐
│ Docker CLI   │ /var/run/docker.sock   │         DOCKER HOST           │  pull  │  Registry  │
│  (client)    │ ─────────────────────▶ │  dockerd (daemon)             │ ◀────▶ │ Docker Hub │
│ docker run.. │                        │     ↓                         │  push  │ ECR, ...   │
└──────────────┘                        │  containerd (lifecycle)       │        └────────────┘
                                        │     ↓                         │
                                        │  runc (creates the process    │
                                        │        with namespaces/cgroups)│
                                        │     ↓                         │
                                        │  📦 Containers · Images ·     │
                                        │  Volumes · Networks           │
                                        └───────────────────────────────┘
```

| Component | Role |
|---|---|
| **Docker CLI / client** (`docker`) | Tool you type commands into; converts them to REST API calls |
| **REST API** | Interface between client and daemon |
| **Docker daemon** (`dockerd`) | Background service that manages images, containers, networks, volumes |
| **Docker Engine** | = daemon + REST API + CLI together |
| **containerd** | High-level container runtime: image transfer, storage, container lifecycle |
| **runc** | Low-level OCI runtime: talks to the kernel to create namespaces/cgroups and start the process |
| **Storage driver** (overlay2) | Stacks image layers into one filesystem |
| **Registry** | Stores and distributes images |

**Container runtime** = low-level software that launches and manages containerized processes.
- High-level: `containerd`, `CRI-O`
- Low-level: `runc`, `crun`

### How the CLI talks to the Engine

1. You type `docker ps`.
2. The CLI builds an HTTP REST request.
3. It sends it over the Unix socket `/var/run/docker.sock` (Linux/macOS), a named pipe (Windows), or TLS TCP (`tcp://host:2376`) for remote hosts.
4. `dockerd` performs the action and returns JSON.
5. The CLI prints it as a readable table.

```text
dockerd ──delegates──▶ containerd ──calls──▶ runc ──creates──▶ container process
```

---

## 20. ⚙️ What Happens When You Run `docker run nginx`?

```text
docker run nginx
      │
      ▼
CLI → REST API → dockerd
      │
      ▼
Is image "nginx:latest" local?
      ├── Yes ───────────────┐
      └── No → pull layers   │
             from registry ──┤
                             ▼
        Create thin read-write container layer
                             ▼
        Create network interface (veth) + IP address
                             ▼
        containerd → runc sets up namespaces + cgroups
                             ▼
        Run CMD/ENTRYPOINT as PID 1  →  Nginx is running
```

> `docker run` = **(pull if needed) + create + start**. It creates a **new** container every time.

---

## 21. 🔄 Container Lifecycle & Docker vs Kubernetes

### Lifecycle

```text
Created ──start──▶ Running ──stop──▶ Exited (Stopped) ──rm──▶ Removed
                      │  ▲
                pause │  │ unpause
                      ▼  │
                    Paused
```

| Command | Transition |
|---|---|
| `docker create` | → Created |
| `docker run` | → Created → Running |
| `docker start` | Exited → Running |
| `docker stop` | Running → Exited |
| `docker pause` / `unpause` | Running ↔ Paused |
| `docker rm` | Exited → Removed |

### Docker vs Kubernetes

| Docker | Kubernetes (K8s) |
|---|---|
| Builds, packages and runs containers | **Orchestrates** containers |
| Usually one host | A cluster of many hosts (nodes) |
| You start/stop containers yourself | Automates deployment, scaling, load balancing, self-healing, rolling updates |

---

# 🟧 PART 4 — Docker Commands

## 22. 🔍 Check the Docker Installation

```bash
docker --version      # short version string – quick "is Docker installed?"
docker version        # client + engine (server) versions, API version, OS/arch
docker info           # full environment: no. of containers/images, storage driver, root dir, CPU, memory
docker system df      # disk space used by images, containers, volumes, build cache
```

```text
docker version → "Which Docker version am I using?"
docker info    → "What does my Docker environment look like?"
```

---

## 23. 📋 List Things

| Command | Shows |
|---|---|
| `docker ps` (= `docker container ls`) | **Running** containers only |
| `docker ps -a` (= `docker ps --all`) | **All** containers – running, stopped, exited |
| `docker ps -aq` | IDs only (quiet) |
| `docker images` (= `docker image ls`) | Local images |
| `docker volume ls` | Volumes |
| `docker network ls` | Networks |

Example output:

```text
$ docker ps
CONTAINER ID   IMAGE     COMMAND                  STATUS         PORTS                  NAMES
abc123         nginx     "/docker-entrypoint.…"   Up 2 minutes   0.0.0.0:8080->80/tcp   web

$ docker images
REPOSITORY   TAG       IMAGE ID
nginx        alpine    abc123
mongo        8         def456
```

> ⚠️ `docker ps` does **not** show stopped containers — use `docker ps -a`.

---

## 24. 🖼️ Image Commands

```bash
docker pull mongo:8                # download image "mongo" with tag "8" (no container created)
docker pull nginx                  # = nginx:latest
docker image inspect mongo:8       # metadata: ID, layers, arch, env, ENTRYPOINT, CMD, created time
docker history my-app:1.0          # layers of an image and the instruction that created each
docker image rm my-app:1.0         # remove image   (short: docker rmi my-app:1.0)
docker image prune                 # remove dangling images (asks for confirmation)
```

- If layers already exist locally, `pull` only downloads the missing ones.
- An image **cannot be removed while a container (even a stopped one) uses it** — remove the container first, or use `-f`.
- **Dangling image** = untagged `<none>:<none>` image, left behind when you rebuild using an existing tag.

---

## 25. 🚀 `docker run` — Create + Start a Container

```bash
docker run --detach --name web --publish 8080:80 nginx:alpine
# short form:
docker run -d --name web -p 8080:80 nginx:alpine
```

```text
docker run          → create + start a NEW container
-d / --detach       → run in background
--name web          → container name = web
-p 8080:80          → host port 8080 → container port 80
nginx:alpine        → image = nginx, tag = alpine
```

Then open `http://localhost:8080`:

```text
Browser → localhost:8080 → container port 80 → Nginx
```

### Most used `docker run` flags

| Flag | Long form | Meaning |
|---|---|---|
| `-d` | `--detach` | Run in background |
| `-p H:C` | `--publish` | Map host port H → container port C |
| `--name x` | | Give the container a name |
| `-e K=V` | `--env` | Set an environment variable |
| `--env-file .env` | | Load env variables from a file |
| `-v vol:/path` | `--volume` | Mount a volume or bind mount |
| `--network net` | | Connect to a Docker network |
| `-it` | `--interactive --tty` | Interactive terminal |
| `--rm` | | Delete the container automatically when it stops |
| `--restart unless-stopped` | | Restart policy |
| `--memory 512m` / `--cpus 1.0` | | Resource limits |
| `--entrypoint sh` | | Override the image's ENTRYPOINT |

### Full example

```bash
docker run -d \
  -p 6001:6379 \
  --name redis-old \
  redis:4.0
```

```text
-d                → background
-p 6001:6379      → host 6001 → container 6379 (Redis default port)
--name redis-old  → container name
redis:4.0         → image redis, version 4.0
```

> `docker run redis:4.0` does **two things in one command**: pulls the image (if missing) **and** starts a new container.

---

## 26. 🖥️ Foreground vs Detached vs Interactive

| Command | Behaviour |
|---|---|
| `docker run nginx` | **Foreground/attached** — logs stream to your terminal, `Ctrl+C` stops the container |
| `docker run -d nginx` | **Detached** — runs in background, prints the container ID, terminal is free |
| `docker run -it ubuntu bash` | **Interactive** — opens a bash shell inside a new Ubuntu container |
| `docker run --rm -it alpine sh` | Interactive throw-away container, auto-deleted on exit |

---

## 27. 🆚 `docker run` vs `docker start` (very important)

| `docker run <image>` | `docker start <container>` |
|---|---|
| Works on an **image** | Works on an existing **container** |
| Pulls the image if missing | Does not pull |
| **Creates a NEW container** every time | Restarts the **same** stopped container |
| Accepts options (`-p`, `-e`, `-v` ...) | Keeps the options given at `run` time |

```text
docker run   = (PULL if needed) + CREATE + START
docker start = START an existing stopped container
```

> To change a container's ports/env/volumes you must **remove it and `docker run` again** — `start` cannot change them.

---

## 28. 🛑 Stop, Restart, Remove

```bash
docker stop web          # graceful stop: SIGTERM, then SIGKILL after 10 s
docker start web         # start it again
docker restart web       # stop + start (e.g. to reload config)
docker rm web            # remove a STOPPED container
docker rm -f web         # force: stop + remove a running container (= --force)
docker pause web         # freeze processes
docker unpause web
```

- After `docker stop` the container **still exists** → visible in `docker ps -a` with status `Exited`.
- Plain `docker rm` refuses to remove a running container.
- Removing a container does **not** remove its named volumes.

---

## 29. 📜 `docker logs`

Shows the stdout/stderr of the container's main process (PID 1).

```bash
docker logs web                        # all logs so far
docker logs -f web                     # follow live (--follow), Ctrl+C to exit
docker logs --tail 100 web             # last 100 lines
docker logs -f --tail 100 mongodb      # last 100 lines, then keep watching
docker logs --since 10m web            # only the last 10 minutes
```

---

## 30. 🐚 `docker exec` — Run a Command Inside a Running Container

```bash
docker exec web ls -la /usr/share/nginx/html     # run one command
docker exec -it web bash                         # open an interactive bash shell
docker exec -it web sh                           # if bash doesn't exist (Alpine images)
docker exec -it mongodb mongosh -u admin -p      # open the Mongo shell
```

```text
-i → interactive (keep STDIN open)
-t → allocate a terminal (TTY)
-it → interactive terminal session
```

> If you get `bash: not found`, the image is minimal (e.g. Alpine) — use `sh` or `/bin/sh`.
> `exit` (or `Ctrl+D`) leaves the shell; the container keeps running.

---

## 31. 🔎 Inspect & Monitor Containers

```bash
docker inspect mongodb                                    # full JSON: IP, mounts, env, ports, state, config
docker inspect -f '{{.State.ExitCode}}' web               # just the exit code
docker inspect -f '{{.State.OOMKilled}}' web              # was it killed for using too much memory?
docker inspect -f '{{.NetworkSettings.IPAddress}}' web    # IP (default bridge)
docker stats                                              # live CPU / memory / network / disk I/O of all containers
docker top web                                            # processes running inside the container
```

`docker inspect` works on containers, images, volumes and networks.

---

## 32. 🌐 Port Mapping (Port Binding)

A container has its **own network namespace and ports**. To reach it from your machine, publish a container port to a host port.

```bash
docker run -p <HOST_PORT>:<CONTAINER_PORT> <image>
```

```bash
docker run -d -p 8080:80 nginx
```

```text
Host  localhost:8080
         │
         ▼
Container port 80 → Nginx
```

```text
8080 = HOST port      (left of the colon  – what you open in the browser)
80   = CONTAINER port (right of the colon – what the app listens on)
```

> ⚠️ The second number is the **container port**, **not** a container ID.

### Rules to remember

1. **Many containers can use the same container port**, but each needs a **different host port** — your laptop has a limited set of ports:

```text
host 3000 → container A :3000
host 3001 → container B :3000
host 5000 → container C :5000
```

2. **Two containers cannot use the same host port** at the same time → `port is already allocated`.
3. The **container port must match the port the app listens on.** `docker run -p 80:8080 nginx` maps to container port 8080, but Nginx listens on 80 → *connection refused*.
4. `EXPOSE` in a Dockerfile is only documentation — it does **not** publish a port. You still need `-p` (or `-P` to publish all exposed ports to random host ports).
5. The app inside must listen on `0.0.0.0`, not `127.0.0.1`, otherwise it is unreachable from outside the container.

### Redis example

Redis listens on `6379`:

```bash
docker run -d -p 6000:6379 redis
```

Your app on the host connects to `localhost:6000` → Redis container `6379`.

---

## 33. 🔐 Environment Variables & Secrets

```bash
docker run -e NODE_ENV=production my-api:1.0          # -e = --env
docker run --env-file .env my-api:1.0                 # load many from a file
```

The app inside reads `NODE_ENV=production`.

### ⚠️ Never put real secrets in images or Git

- ❌ Don't hardcode passwords in a Dockerfile (`ENV DB_PASSWORD=...`) — anyone with the image can read them via `docker history` / `docker inspect`.
- ❌ Don't commit `password=MyRealPassword` or `.env` files to Git (add `.env` to `.gitignore` **and** `.dockerignore`).
- ✅ Development: `.env` file.
- ✅ Production: Docker secrets (`/run/secrets/...`), cloud secret managers (AWS Secrets Manager, HashiCorp Vault), Kubernetes Secrets, CI/CD secret stores.

---

## 34. 🏷️ Container Names & Running the Same Command Twice

```bash
docker run -d --name example-api nginx
docker logs example-api
docker stop example-api
docker inspect example-api
```

Without `--name`, Docker gives a random name such as `trusting_hopper`. Names are easier than long IDs, and on a custom network the **name becomes the hostname** (§50).

**What if you run the same `docker run` twice?**

| Case | Result |
|---|---|
| No `--name`, no fixed host port | Two separate containers with random names |
| Same `--name` | ❌ Error: name `/my-web` is already in use |
| Same host port (`-p 8080:80`) | ❌ Error: port is already allocated |

---

# 🟥 PART 5 — Dockerfile & Building Images

## 35. 📄 What is a Dockerfile?

A **Dockerfile** is a text file with step-by-step instructions that Docker uses to **build an image automatically**.

**Why use it?**

- **Infrastructure as Code** — the environment is written down, repeatable and automatic.
- **Version control** — the Dockerfile lives in Git with the code.
- **Consistency** — the same image in dev, test and production.

```text
Dockerfile ──docker build──▶ Image ──docker run──▶ Container
 (recipe)                    (blueprint)            (running instance)
```

---

## 36. 🧾 Dockerfile Example (Node.js) — Line by Line

```dockerfile
FROM node:20              # 1. base image: official Node.js 20
WORKDIR /app              # 2. create + cd into /app inside the image
COPY package*.json ./     # 3. copy package.json + package-lock.json first (better caching)
RUN npm install           # 4. install dependencies (build time)
COPY . .                  # 5. copy the rest of the source code
EXPOSE 3000               # 6. document that the app listens on 3000
CMD ["npm", "start"]      # 7. default command when the container starts
```

Build and run:

```bash
docker build -t my-node-app .
docker run -d -p 3000:3000 my-node-app
```

> Why copy `package*.json` before the rest of the code? Dependencies change rarely, so the `npm install` layer stays **cached** when only your code changes (§40).

---

## 37. 📚 Dockerfile Instructions Reference

| Instruction | When | What it does |
|---|---|---|
| `FROM` | build | Base image. Must be the first instruction. `FROM node:20-alpine` |
| `WORKDIR` | build | Sets (and creates) the working directory for following instructions |
| `COPY` | build | Copies files from the build context into the image |
| `ADD` | build | Like `COPY` + auto-extracts local `.tar` files + can download URLs |
| `RUN` | build | Executes a command and saves the result as a new layer (`apt-get install`, `npm install`) |
| `ENV` | build + runtime | Environment variable that stays in the running container |
| `ARG` | build only | Build-time variable: `docker build --build-arg VERSION=1.0` |
| `EXPOSE` | metadata | Documents the port the app listens on (does **not** publish it) |
| `USER` | build + runtime | User/UID to run as — use a non-root user |
| `VOLUME` | runtime | Marks a path as a mount point for persistent data |
| `LABEL` | metadata | Key-value metadata: `LABEL maintainer="me@example.com" version="1.0"` |
| `CMD` | runtime | Default command/arguments — easily overridden |
| `ENTRYPOINT` | runtime | Main executable that always runs |

---

## 38. 🆚 Commonly Confused Pairs

### `COPY` vs `ADD`

- `COPY` — simple, predictable copy. ✅ **Use this by default.**
- `ADD` — extra magic (extracts tar, downloads URLs). Use only when you need tar extraction.

### `CMD` vs `ENTRYPOINT`

| | `CMD` | `ENTRYPOINT` |
|---|---|---|
| Purpose | Default command / default args | The fixed executable |
| `docker run img something` | `something` **replaces** CMD | `something` is **appended** as arguments |
| Override | Just pass arguments | Needs `--entrypoint` |

Used together — `ENTRYPOINT` = executable, `CMD` = default arguments:

```dockerfile
ENTRYPOINT ["ping"]
CMD ["localhost"]
# docker run img            → ping localhost
# docker run img google.com → ping google.com
```

### `ARG` vs `ENV`

- `ARG` → only during `docker build`; gone in the running container.
- `ENV` → during build **and** inside the running container.

### Multiple instructions

- Multiple `CMD` lines → allowed, but **only the last one counts**.
- Multiple `RUN` lines → allowed; **each `RUN` creates a new layer** (combine related commands with `&&` to reduce layers).

---

## 39. 🔨 `docker build`, Build Context & `.dockerignore`

```bash
docker build -t myapp:1.0 .
```

```text
docker build    → build an image from a Dockerfile
-t myapp:1.0    → name:tag (-t = --tag)
.               → build context = current directory (Dockerfile is looked for here)
```

```bash
docker build -t myapp:1.0 -f docker/Dockerfile.prod .   # use a different Dockerfile
docker build --no-cache -t myapp:1.0 .                  # ignore cache, rebuild every layer
docker build --build-arg VERSION=1.2 -t myapp:1.2 .     # pass an ARG
```

### Build context

The **build context** is the folder you pass (`.`). The CLI sends the whole folder to the daemon so `COPY`/`ADD` can use those files. A huge context = slow builds.

### `.dockerignore`

A file in the context root listing what **not** to send:

```text
node_modules
.git
*.log
.env
dist
```

Why:

- ⚡ **Faster builds** — smaller context.
- 🔒 **Security** — keeps `.env`, keys and passwords out of image layers.
- ♻️ **Better caching** — unrelated file changes don't invalidate layers.

### What happens during a build?

```text
Context sent to daemon
      ↓
Each instruction runs in order (RUN steps run in a temporary container)
      ↓
Each result is saved as a read-only layer (cached, identified by hash)
      ↓
Final image is tagged (myapp:1.0)
```

---

## 40. 🏗️ Image Layers & Build Cache

Each instruction (`FROM`, `RUN`, `COPY`, `ADD`) creates a **read-only layer**. Layers are stacked by a union filesystem (**overlay2**). A running container adds one thin **writable layer** on top.

```text
┌──────────────────────────┐
│ Container writable layer │  ← changes made while running (deleted with container)
├──────────────────────────┤
│ COPY . .   (app code)    │  ┐
├──────────────────────────┤  │
│ RUN npm install          │  │ read-only image layers
├──────────────────────────┤  │
│ COPY package*.json       │  │
├──────────────────────────┤  │
│ FROM node:20 (base)      │  ┘
└──────────────────────────┘
```

**Why layers?**

- ♻️ **Reuse** — many images share the same base layers → less disk & download.
- ⚡ **Caching** — unchanged layers are reused → much faster builds.

### How the build cache works

- Docker reuses a layer if the **instruction and its input files are unchanged** (checked by hash).
- If one line changes, **that layer and every layer after it** is rebuilt; the layers before it still come from cache.
- 👉 Put rarely-changing steps first (install dependencies), frequently-changing steps last (copy source code).

---

## 41. 📉 Smaller Images: Multi-stage Builds & Distroless

### Multi-stage build

Uses **multiple `FROM`** lines: build in a big image, then copy only the result into a small runtime image.

```dockerfile
# Stage 1 — build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 — tiny runtime
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

Benefits: much smaller image (e.g. 1.5 GB → ~20 MB) and smaller attack surface — compilers, git and dev dependencies never reach production.

### Distroless image

Contains **only** your app and its runtime — no shell, no package manager, no OS utilities → fewer vulnerabilities (harder to debug, though: no `sh`).

### How to shrink a 2–3 GB image

1. Use a small base image (`alpine`, `slim`, `distroless`) instead of `ubuntu` / full `node`.
2. Use a **multi-stage build**.
3. Combine `RUN` commands and clean caches in the same layer:
   ```dockerfile
   RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
   ```
4. Add a `.dockerignore`.
5. Install production dependencies only (`npm ci --omit=dev`).

---

# 🟪 PART 6 — Volumes (Persistent Data)

## 42. ❓ Why Do Containers Need Persistent Storage?

Containers are **ephemeral**. Data written inside a container goes to its writable layer, which is **deleted with the container**.

```text
Without volume:  container deleted → data ❌ gone
With volume:     container deleted → volume remains → data ✅ → mount it into a new container
```

---

## 43. 💾 What is a Docker Volume?

A **Docker volume** is **persistent storage managed by Docker** (on Linux under `/var/lib/docker/volumes/`), independent of any container's lifecycle.

> **Volume = persistent data storage**

### Analogy

```text
Container = rented room       → leave the room, the room is gone
Volume    = storage locker    → your things are still in the locker
```

```text
Container = temporary application runtime
Volume    = persistent data
```

```text
┌─────────────────────┐
│   MySQL Container   │  ← app (replaceable)
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│    MySQL Volume     │  ← database data (kept)
└─────────────────────┘
```

---

## 44. 🛠️ Volume Commands

```bash
docker volume create mongo-data      # create
docker volume ls                     # list
docker volume inspect mongo-data     # name, driver, mountpoint, created, scope
docker volume rm mongo-data          # delete ⚠️ deletes the data
docker volume prune                  # delete all unused volumes ⚠️
```

```text
DRIVER    VOLUME NAME
local     mongo-data
```

> ⚠️ Removing a volume **permanently deletes** its data. "Unused" does not mean "unimportant" — review before pruning.

---

## 45. 🔗 Using a Volume with a Container

```bash
docker run -d --name mycontainer -v my_volume:/data nginx
```

```text
-v my_volume:/data
   │          │
   │          └── path inside the container
   └───────────── Docker volume (auto-created if it doesn't exist)
```

Anything written to `/data` is stored in `my_volume`.

### Common database data paths

| Database | Container data path | Example |
|---|---|---|
| MySQL | `/var/lib/mysql` | `-v mysql_data:/var/lib/mysql` |
| PostgreSQL | `/var/lib/postgresql/data` | `-v pg_data:/var/lib/postgresql/data` |
| MongoDB | `/data/db` | `-v mongo-data:/data/db` |
| Redis | `/data` | `-v redis-data:/data` |

### MySQL example

```bash
docker volume create mysql_data

docker run -d \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=change-this-password \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0

docker rm -f mysql        # container gone...
docker volume ls          # ...mysql_data ✅ still there
```

---

## 46. 🆚 Volume vs Bind Mount

```bash
-v my_volume:/data              # VOLUME     – Docker manages the storage
-v /Users/aman/project:/app     # BIND MOUNT – you choose a host folder
-v $(pwd):/app                  # BIND MOUNT – current directory
```

| | 💾 Volume | 📁 Bind Mount |
|---|---|---|
| Host location | Managed by Docker | Any path you choose |
| Managed by | Docker CLI/Engine | You / host OS |
| Portability | High (same on Linux/Mac/Win) | Low (depends on host paths) |
| Performance on Mac/Win | Good | Slower |
| Empty mount | Gets pre-filled with the image's files | Host folder **hides** the image's files |
| Best for | Databases, persistent app data, **production** | **Local development**, live code reload, sharing source code |

---

## 47. 🧠 Volume Key Points

- Named volumes survive `docker rm` and `docker compose down` — removed only by `docker volume rm`, `docker volume prune` or `docker compose down -v`.
- Database lost all data after the container was recreated? → it was writing to the container layer, not a volume. **Fix:** mount a volume on the DB data path.
- Volumes are the preferred choice for production data (managed by Docker, portable, easy to back up).

---

# 🟫 PART 7 — Networking

## 48. 🌐 Docker Networks & Drivers

Docker networking lets containers talk to **each other**, to the **host** and to the **internet**.

| Driver | What it does |
|---|---|
| **bridge** (default) | Private virtual network on the host. Unnamed containers join the default `bridge` (`docker0`, e.g. `172.17.0.0/16`) |
| **custom bridge** | `docker network create my-net` — same as bridge **plus automatic DNS by container name** ✅ use this |
| **host** | No network isolation — container uses the host's network & ports directly |
| **none** | No networking at all (only loopback) |

---

## 49. 🛠️ Network Commands

```bash
docker network create app-network                   # create custom bridge network
docker network ls                                   # list
docker network inspect app-network                  # see connected containers, subnet
docker network connect app-network my-container     # attach an existing container
docker network disconnect app-network my-container  # detach
docker network rm app-network                       # remove
docker run -d --name db --network app-network mongo # start a container on the network
```

---

## 50. 🔤 Container Names as Hostnames (Docker DNS)

On a **custom** network, Docker runs an embedded DNS server (`127.0.0.11`) that turns **container/service names into IPs**. No hard-coded IPs needed.

```bash
docker network create my-network
docker run -d --name db      --network my-network mongo
docker run -d --name backend --network my-network myapp
```

The backend connects with:

```text
mongodb://db:27017/mydatabase
```

| Network | Can use container names? |
|---|---|
| Custom (user-defined) bridge | ✅ Yes |
| Default `bridge` | ❌ No — only IP addresses (or legacy `--link`) |
| Docker Compose default network | ✅ Yes — service names work automatically |

---

## 51. ⚠️ The `localhost` Rule

> Inside a container, **`localhost` means that same container** — not your computer and not another container.

```text
Mongo Express container
   └── localhost:27017  →  port 27017 of Mongo Express itself ❌ (MongoDB is not there)

   └── mongodb:27017    →  container named "mongodb" on the same network ✅
```

So container-to-container connections must use the **container/service name**, never `localhost`.

---

## 52. 🆚 Host → Container vs Container → Container

| Who connects | Use | Example (MongoDB published as `27018:27017`) |
|---|---|---|
| App on **your computer** (host) | `localhost` + **host port** | `mongodb://admin:password@localhost:27018/?authSource=admin` |
| App **in another container** (same network) | **service name** + **container port** | `mongodb://admin:password@mongodb:27017/?authSource=admin` |

```text
HOST              localhost:27018 ──▶ MongoDB container :27017
OTHER CONTAINER   mongodb:27017   ──▶ MongoDB container :27017
```

> 🧠 **Host → `localhost:HOST_PORT` · Container → `name:CONTAINER_PORT`**

> Browser-based frontends (React/Vite) run in the **user's browser**, not in the container — so their API URL must be reachable from the browser (e.g. `http://localhost:5000`), not `http://backend:5000`.

---

# 🧩 PART 8 — Docker Compose

## 53. 🐳 What is Docker Compose & Why Use It?

**Docker Compose** is a tool for **defining and running multi-container applications** from **one YAML file**.

Without Compose you must remember and type many commands, in the right order:

```bash
docker network create ...
docker volume create ...
docker run ... (database)
docker run ... (admin UI)
docker run ... (app)
```

With Compose, describe everything once and run:

```bash
docker compose up -d
```

A typical app:

```text
Application
├── Node.js
├── MongoDB
├── Redis
└── Nginx
```

| 🐳 Docker (CLI) | 🧩 Docker Compose |
|---|---|
| Manages **individual** containers, images, networks, volumes | Manages a **group of related services** |
| Imperative — one command at a time | Declarative — desired state in YAML |
| `docker run nginx` | `docker compose up -d` |

---

## 54. 📁 The Compose File

- Modern name: **`compose.yaml`** (also accepted: `compose.yml`, `docker-compose.yml`).
- Compose automatically creates a **default network** for the project, so all services can reach each other **by service name**.
- Command is `docker compose` (v2, built into Docker). The old `docker-compose` (with a hyphen) is v1.

---

## 55. 🧾 Example: MongoDB + Mongo Express

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
      test: ["CMD", "mongosh", "--quiet", "--eval", "db.runCommand({ ping: 1 }).ok"]
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
      ME_CONFIG_MONGODB_SERVER: mongodb        # service name, NOT localhost
    depends_on:
      mongodb:
        condition: service_healthy

volumes:
  mongo-data:
```

This one file replaces the manual network + volume + two `docker run` commands from §65.

---

## 56. 🔑 Compose Keys Explained

| Key | Meaning | `docker run` equivalent |
|---|---|---|
| `services:` | List of containers that make up the app (here `mongodb`, `mongo-express`) | — |
| `image: mongo:8` | Use this image from a registry | `docker run mongo:8` |
| `build: .` | Build an image from the `Dockerfile` in this folder | `docker build .` |
| `container_name:` | Fixed container name (otherwise `project-service-1`) | `--name` |
| `restart: unless-stopped` | Restart automatically unless you stopped it yourself | `--restart unless-stopped` |
| `ports: ["27018:27017"]` | Host port → container port | `-p 27018:27017` |
| `environment:` | Environment variables | `-e KEY=value` |
| `env_file: .env` | Load variables from a file | `--env-file .env` |
| `volumes: [mongo-data:/data/db]` | Mount a named volume / bind mount | `-v mongo-data:/data/db` |
| `networks:` | Attach to custom networks (optional — a default network exists) | `--network` |
| `depends_on:` | Start order between services | — |
| `healthcheck:` | How Docker tests if the service is healthy | `--health-cmd` |
| top-level `volumes:` | **Declares** named volumes managed by Compose | `docker volume create` |
| top-level `networks:` | **Declares** custom networks | `docker network create` |

Restart policies: `no` (default) · `always` · `on-failure` · `unless-stopped`.

---

## 57. ❤️ `healthcheck` & ⏳ `depends_on`

```yaml
healthcheck:
  test: ["CMD", "mongosh", "--quiet", "--eval", "db.runCommand({ ping: 1 }).ok"]
  interval: 10s   # run the check every 10 seconds
  timeout: 5s     # one check may take max 5 seconds
  retries: 5      # 5 failures in a row → container is "unhealthy"
```

```yaml
depends_on:
  mongodb:
    condition: service_healthy    # wait until mongodb's healthcheck passes
```

| Form | Waits for |
|---|---|
| `depends_on: [mongodb]` | Container **started** only (not ready!) |
| `condition: service_healthy` | Healthcheck **passing** |

> ⚠️ "Container started" ≠ "application ready". `depends_on` only controls start order — your app should still **retry** its database connection.

---

## 58. 🚀 Adding a Node.js App (`build: .`)

Project layout:

```text
my-project/
├── compose.yaml
├── Dockerfile
├── package.json
└── src/
```

Add under `services:`:

```yaml
  app:
    build: .                       # build image from ./Dockerfile
    restart: unless-stopped
    ports:
      - "3000:3000"                # browser → http://localhost:3000
    environment:
      PORT: 3000
      MONGO_URI: mongodb://admin:change-this-password@mongodb:27017/file_upload_test?authSource=admin
      STORAGE_DRIVER: local
    depends_on:
      mongodb:
        condition: service_healthy
```

- `build: .` → build using the `Dockerfile` in the current directory (the build context).
- `MONGO_URI` uses **`mongodb:27017`** (service name + container port) — **not** `localhost:27018`, because the app runs **inside** the Compose network.

### Complete architecture

```text
                         Your Computer
                              │
              ┌───────────────┴───────────────┐
        localhost:3000                 localhost:8081
              ▼                               ▼
       ┌─────────────┐                ┌────────────────┐
       │  Node App   │                │ Mongo Express  │
       └──────┬──────┘                └───────┬────────┘
              │ mongodb:27017                 │ mongodb:27017
              └──────────────┬────────────────┘
                             ▼
                    ┌─────────────────┐
                    │ MongoDB :27017  │
                    └────────┬────────┘
                             ▼
                     mongo-data volume
                     (persistent data)
```

---

## 59. 🛠️ Docker Compose Commands

Run these in the folder that contains `compose.yaml`.

| Command | What it does |
|---|---|
| `docker compose up` | Create + start all services, logs in the terminal |
| `docker compose up -d` | Same, in the background ⭐ most used |
| `docker compose up -d --build` | Rebuild images (for `build:` services), then start |
| `docker compose up -d --scale backend=3` | Run 3 instances of `backend` (no fixed `container_name`/host port) |
| `docker compose build --no-cache` | Rebuild images from scratch |
| `docker compose ps` | Status of the project's services |
| `docker compose logs` | Logs of all services |
| `docker compose logs -f` | Follow logs of all services |
| `docker compose logs -f mongodb` | Follow one service's logs |
| `docker compose exec mongodb mongosh -u admin -p` | Run a command in a running service (asks for password) |
| `docker compose exec <service> sh` | Shell into a service |
| `docker compose restart [service]` | Restart all / one service |
| `docker compose stop` | Stop containers (they remain) |
| `docker compose start` | Start previously stopped containers |
| `docker compose down` | Stop + **remove** containers and the project network |
| `docker compose down -v` | ⚠️ Also remove named volumes → **deletes data** |
| `docker compose config` | Validate the YAML and print the final resolved config |

```text
NAME                SERVICE         STATUS
learning-mongodb    mongodb         Up (healthy)
mongo-express-1     mongo-express   Up
```

---

## 60. 🆚 `stop` vs `down` vs `down -v`, and `start` vs `up`

| Command | Containers | Network | Named volumes (data) |
|---|---|---|---|
| `docker compose stop` | Stopped, **kept** | Kept | Kept ✅ |
| `docker compose down` | **Removed** | Removed | Kept ✅ |
| `docker compose down -v` | Removed | Removed | **Removed ❌ data lost** |

```text
docker compose start → start existing stopped containers
docker compose up    → create (if needed) + start; applies changes from compose.yaml
```

---

## 61. 🧾 Full-Stack Compose Example (custom network)

```yaml
services:
  mongodb:
    image: mongo:8
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: change-this-password
    volumes:
      - mongo-db-data:/data/db
    networks:
      - fullstack-net

  backend:
    build: ./backend
    container_name: backend
    ports:
      - "5000:5000"
    environment:
      PORT: 5000
      MONGO_URI: mongodb://root:change-this-password@mongodb:27017/appdb?authSource=admin
    depends_on:
      - mongodb
    networks:
      - fullstack-net

  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "80:80"
    environment:
      VITE_API_URL: http://localhost:5000     # used by the BROWSER, so localhost + host port
    depends_on:
      - backend
    networks:
      - fullstack-net

volumes:
  mongo-db-data:

networks:
  fullstack-net:
    driver: bridge
```

Workflow:

```bash
docker compose up -d               # start everything
docker compose ps                  # check containers
docker compose logs -f             # watch logs
docker compose down                # stop & remove (data kept)
docker compose build --no-cache    # rebuild images
docker compose up -d               # start again
```

> `VITE_*` variables are baked in at **build time** by Vite, so for a real build pass them as build args — runtime `environment:` won't change an already-built bundle.

---

# 🛠️ PART 9 — Hands-on Projects

## 62. Task 1 — Nginx

```bash
docker pull nginx                                  # 1. pull image
docker run -d -p 8080:80 --name webserver nginx    # 2. run detached, port 8080→80, named
docker ps --filter name=webserver                  # 3. is it running?
curl http://localhost:8080                         # 4. test (or open in browser)
docker logs webserver                              # 5. logs
docker stop webserver                              # 6. stop
docker start webserver                             # 7. start again
docker rm -f webserver                             # 8. remove
```

---

## 63. Task 2 — Redis

```bash
docker run -d --name redis-server -p 6379:6379 redis   # run detached
docker exec -it redis-server redis-cli ping            # → PONG
docker exec -it redis-server bash                      # shell inside
docker top redis-server                                # see the redis-server process
docker logs redis-server                               # logs
docker stop redis-server                               # stop
docker rm redis-server                                 # remove
```

Running an old version side-by-side on another host port:

```bash
docker run -d -p 6001:6379 --name redis-old redis:4.0
```

---

## 64. Task 3 — Build & Run Your Own Image

`Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t my-node-app:1.0 .                             # build
docker run -d -p 3000:3000 --name node-app my-node-app:1.0    # run
curl http://localhost:3000                                    # test
```

---

## 65. Task 4 — MongoDB + Mongo Express (manual, no Compose)

Mongo Express is a web UI for MongoDB.

### Step 1 — Network (so both containers can talk)

```bash
docker network create mongo-network
```

### Step 2 — MongoDB

```bash
docker run -d \
  --name mongodb \
  --network mongo-network \
  -p 27018:27017 \
  -v mongo-data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=change-this-password \
  mongo:8
```

| Part | Meaning |
|---|---|
| `-d` | Background |
| `--name mongodb` | Name = hostname for other containers on the network |
| `--network mongo-network` | Join the custom network |
| `-p 27018:27017` | Host `localhost:27018` → MongoDB's default port `27017` |
| `-v mongo-data:/data/db` | DB files stored in volume → container ❌ removed, data ✅ kept |
| `MONGO_INITDB_ROOT_USERNAME/PASSWORD` | Initial root user (⚠️ change the password; never commit real credentials) |

### Step 3 — Mongo Express

```bash
docker run -d \
  --name mongo-express \
  --network mongo-network \
  -p 8081:8081 \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=change-this-password \
  -e ME_CONFIG_MONGODB_SERVER=mongodb \
  mongo-express:1.0.2-20-alpine3.19
```

- Same network → can reach MongoDB.
- `ME_CONFIG_MONGODB_SERVER=mongodb` → the **container name**, not `localhost` (§51).
- Open `http://localhost:8081`.

### Result

```text
Your Computer
├── localhost:27018 ──▶ MongoDB container ──▶ /data/db ──▶ mongo-data volume
└── localhost:8081  ──▶ Mongo Express ──(mongodb:27017)──▶ MongoDB container
```

Clean up:

```bash
docker rm -f mongo-express mongodb
docker network rm mongo-network
# docker volume rm mongo-data   ← only if you want to delete the data
```

---

## 66. Task 5 — Backend + MongoDB + Frontend on One Network

```bash
docker network create app-network

docker run -d --name mongodb --network app-network \
  -v mongo_data:/data/db mongo:8

docker run -d --name backend --network app-network \
  -e MONGO_URI="mongodb://mongodb:27017/mydb" \
  -p 5000:5000 my-backend-image:latest

docker run -d --name frontend --network app-network \
  -p 80:80 my-frontend-image:latest
```

- Data persistence → `-v mongo_data:/data/db`.
- Backend → MongoDB uses `mongodb:27017` (container name).

If the backend cannot connect:

```bash
docker logs backend                              # error message
docker network inspect app-network               # are both containers attached?
docker exec -it backend ping mongodb             # DNS reachable? (if ping exists in the image)
docker exec -it backend nc -zv mongodb 27017     # port open?
```

---

# 🧹 PART 10 — Cleanup

## 67. 🧽 Prune Commands

| Command | Removes | Risk |
|---|---|---|
| `docker container prune` | All **stopped** containers | ⚠️ stopped containers you wanted to keep |
| `docker image prune` | **Dangling** images (`<none>`) | Low |
| `docker image prune -a` | All images not used by a container | ⚠️ must re-pull later |
| `docker volume prune` | Unused volumes | 🔴 **can delete database data** |
| `docker network prune` | Unused networks | Low |
| `docker system prune` | Stopped containers + unused networks + dangling images + build cache | ⚠️ |
| `docker system prune -a` | ↑ plus **all unused images** | ⚠️⚠️ |
| `docker system prune -a --volumes` | ↑ plus **unused volumes** | 🔴 **most destructive** |
| `docker builder prune` | Build cache | Low |

Check first, then clean:

```bash
docker system df          # what is using space?
docker system prune       # safe-ish default cleanup
```

> Every prune asks for confirmation — **read the list before typing `y`**, especially on servers.

---

## 68. 🚨 Avoid Blind Mass-Deletion Commands

```bash
docker rm -f $(docker ps -aq)          # removes EVERY container on the machine
docker rmi -f $(docker images -aq)     # tries to remove EVERY image
```

Only run these when you fully understand the consequences (never on shared/production servers).

---

# 🚨 PART 11 — Troubleshooting

> First 3 commands for almost any problem: **`docker ps -a`** → **`docker logs <c>`** → **`docker inspect <c>`**.

## 69. Port Is Already Allocated

```text
Bind for 0.0.0.0:8080 failed: port is already allocated
```

**Meaning:** another container or host process already uses host port 8080.

```bash
docker ps                                  # a container publishing 8080?
lsof -nP -iTCP:8080 -sTCP:LISTEN           # host process on 8080 (macOS/Linux)
```

**Fix:** stop that container/process **or** use another host port (`-p 8081:80`, or in Compose `"8082:8081"`).

---

## 70. Container Exits Immediately

```bash
docker ps -a                                   # status: Exited (code)
docker logs <container>                        # crash message
docker inspect -f '{{.State.ExitCode}}' <c>    # exit code
docker run -it --entrypoint sh <image>         # explore the image manually
```

A container lives only as long as its **main process (PID 1)**. It stops if that process:

- crashed (bad config, missing env variable, failed DB connection, invalid command), or
- finished normally (e.g. a script that ends, or a server started in background/daemon mode — Nginx needs `nginx -g 'daemon off;'`).

| Exit code | Usually means |
|---|---|
| `0` | Process finished normally |
| `1` | Application error |
| `125` / `126` / `127` | Docker run error / command not executable / command not found |
| `137` | Killed (SIGKILL) — often **out of memory (OOM)** |
| `143` | Stopped by SIGTERM (`docker stop`) |

---

## 71. App Running but Not Reachable from the Browser

1. `docker ps` → is the port published (`0.0.0.0:8080->80/tcp`)?
2. Is the **container port correct** — the one the app really listens on?
3. Does the app listen on **`0.0.0.0`** (all interfaces)? If it binds to `127.0.0.1` inside the container, it works inside but not from the browser.
4. Host firewall / security group blocking the port?

---

## 72. "Connection Refused"

1. Is the target service actually running and listening on that port? (`docker logs`, `docker ps`)
2. Test from inside the caller: `docker exec -it <c> nc -zv <target> <port>`.
3. Is the service bound to `127.0.0.1` only?
4. Are you using `localhost` to reach another container? → use the service name.

---

## 73. Containers Cannot Communicate

1. Both on the **same custom network**? → `docker network inspect <net>`
2. Using the **container/service name** + **container port** (`mongodb:27017`), not `localhost`?
3. On the default `bridge` network? Names don't resolve there → use a custom network.
4. Firewall/iptables blocking bridge traffic?

---

## 74. Database Data Disappeared

**Why:** data was in the container's writable layer; deleting/recreating the container deleted it.

**Fix:** mount a named volume on the data path:

```bash
docker run -d --name mongodb -v mongo-data:/data/db mongo:8
```

Also: never run `docker compose down -v` or `docker volume prune` unless you mean to delete data.

---

## 75. Image Won't Pull

Check:

1. Image name (`mongo:8` ✅ vs `mongodb:8` ❌ — wrong repository name)
2. Tag exists
3. Internet connection / proxy
4. Registry is up
5. Logged in for private registries (`docker login`)
6. CPU architecture available (ARM64 Mac vs AMD64 image)

---

## 76. High CPU or Memory Usage

```bash
docker stats                        # live usage per container
docker top <container>              # processes inside
docker inspect -f '{{.State.OOMKilled}}' <c>
```

Limit resources:

```bash
docker run -d --memory="512m" --cpus="1.0" myapp:1.0
```

---

## 77. App Suddenly Slow

```bash
docker stats
docker top <container>
docker logs --tail 200 <container>
docker system df                    # disk full?
```

---

## 78. Container Crashes Every Few Minutes

```bash
docker logs --since 10m <container>
docker inspect -f '{{.State.ExitCode}}' <container>
docker inspect -f '{{.State.OOMKilled}}' <container>
docker inspect -f '{{.RestartCount}}' <container>
```

Look for memory leaks (OOM → exit 137), failing health checks, or dependency timeouts.

---

## 79. Server Out of Disk Space Because of Docker

```bash
docker system df                     # breakdown: images, containers, volumes, build cache
docker system prune                  # remove stopped containers, unused networks, dangling images, cache
docker image prune -a                # remove unused images
# docker system prune -a --volumes   ← most aggressive: also unused volumes (🔴 data!)
```

Also cap log size (logs can grow forever): `--log-opt max-size=10m --log-opt max-file=3`.

---

## 80. Image Is Too Big (2–3 GB)

→ small base image, multi-stage build, combine `RUN` + clean caches, `.dockerignore`, production deps only (§41).

---

## 81. Build Is Very Slow

1. No `.dockerignore` → huge build context (`node_modules`, `.git`).
2. Bad instruction order → `COPY . .` before `npm install` breaks the cache on every code change.
3. Downloading packages every time (no cache).

---

## 82. Works Locally, Fails in Production

1. CPU architecture mismatch (ARM64 Mac → AMD64 server). Build for the target: `docker build --platform linux/amd64 ...`.
2. Missing environment variables / secrets in production.
3. Hard-coded local paths or `localhost` URLs.
4. Unpinned versions (`latest` pulled a breaking change).

---

## 83. Monitoring Many Containers (e.g. 100 on one server)

- Quick look: `docker stats`, `docker ps`, `docker system df`.
- Proper setup: **cAdvisor** (container metrics) → **Prometheus** (collect) → **Grafana** (dashboards & alerts); central logging (ELK / Loki).

---

# 🔒 PART 12 — Security & Production

## 84. ⚠️ Major Docker Security Risks

1. Container escape → attacker reaches the host (worse if the container runs as root).
2. Malicious or vulnerable base images.
3. Exposed Docker socket (`/var/run/docker.sock`) — access to it = root on the host.
4. Secrets hard-coded in images (readable via `docker history`).
5. Over-privileged containers (`--privileged`, extra capabilities).

---

## 85. 👤 Don't Run as Root

Root (UID 0) in a container is UID 0 on the host unless user namespaces are enabled — if the process breaks out, the host is compromised.

```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

(Official Node images already include a `node` user → `USER node`.)

---

## 86. 🛡️ Least Privilege & Hardening

**Principle of least privilege** = give a container only the permissions it absolutely needs.

**Linux capabilities** = small pieces of root power (e.g. `CAP_NET_BIND_SERVICE` to bind port < 1024, `CAP_SYS_ADMIN`) that can be granted individually instead of full root.

```bash
docker run -d \
  --user 1000:1000 \
  --read-only \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --security-opt no-new-privileges \
  --memory=512m --cpus=1.0 \
  myapp:1.0
```

---

## 87. 🔍 Image Scanning, Minimal Images & Trust

- **Vulnerability scanning** = checking OS packages & libraries in image layers against CVE databases:
  ```bash
  docker scout quickview myapp:1.0
  docker scout cves myapp:1.0
  trivy image myapp:1.0
  ```
- **Minimal images** (alpine, slim, distroless) → fewer packages (no curl/wget/shell) → smaller attack surface.
- **Docker Content Trust (DCT)** → digitally signs images so you can verify the publisher and that the image wasn't modified (`export DOCKER_CONTENT_TRUST=1`).
- **Pin versions** instead of `latest` (§12).

---

## 88. 📏 Good Container Practices

- **One main process per container** — container lifecycle = process lifecycle, easier scaling, clean logs. (Nginx, PHP-FPM and MySQL = 3 containers.)
- **Scaling:**
  - Horizontal → more container instances (`--scale backend=3`, Kubernetes replicas).
  - Vertical → more CPU/RAM for one container.
- **Config per environment** → `.env` files with `--env-file` or `env_file:` in Compose; never different images per environment.
- Log to **stdout/stderr** so `docker logs` works.
- Add **healthchecks** and **restart policies**.

---

## 89. 📦 How to Dockerize Common Apps

| App | Approach |
|---|---|
| **Node.js** | `node:20-alpine`, copy `package*.json` → `npm ci` → copy code; multi-stage for TypeScript builds; `USER node` |
| **React / Vite** | Multi-stage: Stage 1 Node runs `npm run build` → Stage 2 copies `dist/` into `nginx:alpine` `/usr/share/nginx/html` |
| **Laravel** | Separate services: Nginx + PHP-FPM + MySQL + Redis (Compose) |
| **MySQL** | Official image + `MYSQL_ROOT_PASSWORD` + volume on `/var/lib/mysql` |
| **MongoDB** | Official image + `MONGO_INITDB_ROOT_USERNAME/PASSWORD` + volume on `/data/db` |

Apps connect to DB containers using the **container/service name** on a shared network; data survives teardown via **named volumes**.

---

## 90. 🔄 Deploying with CI/CD

```text
1. Developer pushes code to Git
2. CI pipeline runs tests
3. CI builds the image             → docker build -t registry/app:1.4.2 .
4. CI scans the image              → trivy image registry/app:1.4.2
5. CI pushes the image             → docker push registry/app:1.4.2   (ECR / Docker Hub)
6. CD deploys the new tag          → docker compose pull && docker compose up -d   (or Kubernetes rollout)
7. Monitoring watches the release
```

```bash
docker login                                   # authenticate to a registry
docker tag myapp:1.0 username/myapp:1.0        # name it for the registry
docker push username/myapp:1.0                 # upload
```

---

# 🎤 PART 13 — Interview Quick Answers

> Short answers to say out loud. The § number points to the full explanation above.

## 91. ⭐ Top Concept Questions

| # | Question | Short answer | § |
|---|---|---|---|
| 1 | What is DevOps? | Culture + practices combining Dev and Ops to ship software faster and more reliably via collaboration, automation, CI/CD and monitoring. | 1 |
| 2 | What is Docker and why use it? | Platform to package an app with all its dependencies into containers → same environment everywhere, lighter than VMs, fast deployments. | 5 |
| 3 | What is containerization? | OS-level virtualization: run apps as isolated processes that share the host kernel. | 7 |
| 4 | What is a container? | A running instance of an image — an isolated process (namespaces + cgroups) with its own writable layer. | 7 |
| 5 | What is an image? | Read-only, immutable, layered template used to create containers. | 9 |
| 6 | Image vs container? | Image = blueprint (static, on disk). Container = running instance (dynamic, writable layer). One image → many containers. | 10 |
| 7 | Is an image mutable? | No. Changes go to the container's Copy-on-Write layer, never into the image. | 9 |
| 8 | Container vs VM? | VM virtualizes hardware and has its own kernel/OS (GBs, minutes). Container shares the host kernel (MBs, seconds). | 16 |
| 9 | Does every container have its own OS? | No — only user-space files; all containers share the host's kernel. | 16 |
| 10 | Why can't Linux containers run natively on Windows? | They need a Linux kernel; Docker Desktop provides one through a Linux VM (WSL 2). | 17 |
| 11 | Namespaces vs cgroups? | Namespaces = what a container can **see** (isolation). cgroups = what it can **use** (limits). | 18 |
| 12 | Explain Docker architecture. | Client–server: CLI → REST API (docker.sock) → `dockerd` → `containerd` → `runc` → container; images come from a registry. | 19 |
| 13 | What is containerd / runc? | containerd = high-level runtime managing lifecycle & images. runc = low-level OCI runtime that creates the process with namespaces/cgroups. | 19 |
| 14 | What happens on `docker run nginx`? | CLI → daemon; pull image if missing; create writable layer; set up network; runc applies namespaces/cgroups; start CMD as PID 1. | 20 |
| 15 | Container lifecycle? | Created → Running → (Paused) → Exited → Removed. | 21 |
| 16 | Docker vs Kubernetes? | Docker builds/runs containers; Kubernetes orchestrates many containers across a cluster (scaling, self-healing). | 21 |
| 17 | Registry vs repository? | Registry = service storing images (Docker Hub, ECR). Repository = one image's collection of tags inside it. | 12 |
| 18 | Why not use `latest` in production? | It's a moving tag — deploys become unpredictable; pin exact versions. | 12 |
| 19 | `docker run` vs `docker start`? | run = (pull) + create a **new** container + start. start = start an **existing** stopped container. | 27 |
| 20 | What does `-d` do? | Detached mode — runs in the background and returns the terminal. | 26 |
| 21 | What does `-p 8080:80` mean? | Host port 8080 → container port 80. | 32 |
| 22 | Can two containers use the same host port? | No — "port is already allocated". They can share the same *container* port with different host ports. | 32 |
| 23 | Does `EXPOSE` publish a port? | No — documentation only. Use `-p`. | 32 |
| 24 | `docker logs` / `docker exec`? | logs = output of the main process. exec = run a command inside a running container (`-it ... sh`). | 29–30 |
| 25 | What is a Dockerfile? | Text file of instructions to build an image. | 35 |
| 26 | `CMD` vs `ENTRYPOINT`? | CMD = default, replaced by run args. ENTRYPOINT = fixed executable, run args are appended. | 38 |
| 27 | `COPY` vs `ADD`? | COPY just copies (preferred). ADD also extracts tar and downloads URLs. | 38 |
| 28 | `ARG` vs `ENV`? | ARG = build-time only. ENV = build time + runtime. | 38 |
| 29 | What is the build context / `.dockerignore`? | Folder sent to the daemon for the build; `.dockerignore` excludes files (faster, safer, better cache). | 39 |
| 30 | What are image layers? | Read-only filesystem diffs created by instructions, stacked with overlay2; reused and cached. | 40 |
| 31 | What is the build cache? | Reuse of unchanged layers; a change rebuilds that layer and all after it. | 40 |
| 32 | Multi-stage build? | Several `FROM`s — build in a big image, copy only artifacts into a small runtime image. | 41 |
| 33 | Dangling image? | Untagged `<none>` image left after rebuilding a tag; remove with `docker image prune`. | 24 |
| 34 | Why volumes? | Data persists independently of the container lifecycle (databases). | 42 |
| 35 | Volume vs bind mount? | Volume = Docker-managed, portable, for production data. Bind mount = your host folder, for dev/live code. | 46 |
| 36 | Default network? | `bridge`. Containers on it can't resolve each other by name. | 48 |
| 37 | How do containers communicate? | Put them on the same custom network and use the container/service name (Docker DNS). | 50 |
| 38 | Why not `localhost` between containers? | `localhost` inside a container = that container itself. | 51 |
| 39 | What is Docker Compose / why? | Define and run multi-container apps from one YAML file with one command. | 53 |
| 40 | Docker vs Docker Compose? | Docker = individual containers, imperative. Compose = whole stack, declarative. | 53 |
| 41 | Does `depends_on` wait for readiness? | Only start order — unless `condition: service_healthy`. Apps should still retry. | 57 |
| 42 | `compose stop` vs `down` vs `down -v`? | stop keeps containers; down removes containers + network; `-v` also deletes volumes (data). | 60 |
| 43 | Backend + MongoDB with Compose? | Two services, same (default) network, `MONGO_URI=mongodb://mongodb:27017/...`, volume for data, `docker compose up -d`. | 58 |
| 44 | How to secure containers? | Non-root user, minimal images, scan images, drop capabilities, read-only FS, resource limits, secrets not in images. | 84–87 |
| 45 | Why not hard-code passwords in a Dockerfile? | Layers are readable by anyone with the image (`docker history`). | 33 |

---

## 92. 🧠 "Explain This Command"

| Command | Meaning |
|---|---|
| `docker run -d -p 8080:80 nginx` | Run Nginx in background, host 8080 → container 80 → open `localhost:8080`. |
| `docker run -d -p 6000:6379 --name redis-old redis:4.0` | Pull `redis:4.0` if missing, create a new container named `redis-old`, host 6000 → container 6379, run in background. |
| `docker run -d -p 6000:6789 redis` | Host 6000 → container 6789. ⚠️ Redis listens on **6379**, so nothing answers on 6789 — the mapping is wrong (should be `6000:6379`). |
| `docker start redis-old` | Start the existing stopped container `redis-old` — no new container. |
| `docker run -it ubuntu bash` | New Ubuntu container with an interactive bash shell. |
| `docker run -d --name mydb -p 27017:27017 mongo` | Background MongoDB named `mydb`, default port published. |
| `docker run -d --name mongodb -p 27017:27017 -v mongo-data:/data/db mongo` | Same + data persisted in volume `mongo-data`. |
| `docker exec -it mongodb bash` | Open a bash shell inside the running `mongodb` container. |
| `docker build -t myapp:1.0 .` | Build image `myapp:1.0` using the current folder as context. |
| `docker run -d --name app -p 8080:3000 myapp:1.0` | Run `myapp:1.0` as `app`; host 8080 → app's port 3000. |
| `docker run -d --network my-network --name backend my-backend` | Run image `my-backend` as container `backend` on `my-network` (reachable as `backend`). |
| `docker run -v mydata:/data nginx` | Mount named volume `mydata` at `/data` (auto-created). |
| `docker run -v $(pwd):/app nginx` | Bind-mount the current host folder at `/app`. |
| `docker compose up -d --build` | Rebuild images and start the whole stack in background. |

---

## 93. 🚨 Scenario Questions (short)

| Scenario | First thing to do | § |
|---|---|---|
| Container stops right after start | `docker logs`, check exit code (`137` = OOM) | 70 |
| Running but not reachable in browser | Check `-p`, container port, app binds `0.0.0.0` | 71 |
| "Port is already allocated" | Free the port or use another host port | 69 |
| "Connection refused" | Service listening? right host/port? `nc -zv` | 72 |
| Backend can't reach `localhost:27017` | Use `mongodb:27017` on the same network | 51 |
| Data lost after recreating DB container | Mount a volume on the data path | 74 |
| Image is 2–3 GB | Alpine/distroless, multi-stage, `.dockerignore` | 41 |
| Build is slow | `.dockerignore`, instruction order for cache | 81 |
| High CPU / memory | `docker stats`, `docker top`, `--cpus` / `--memory` | 76 |
| Crashes every 10 minutes | `logs --since`, exit code, `OOMKilled` | 78 |
| Disk full | `docker system df`, then prune | 79 |
| Works locally, fails in prod | Architecture, env vars, `latest` tags | 82 |
| Monitor 100 containers | cAdvisor + Prometheus + Grafana | 83 |

---

# ✅ PART 14 — Cheat Sheets & Mental Model

## 94. 📊 Docker Command Cheat Sheet

| Task | Command |
|---|---|
| Docker version | `docker --version` / `docker version` |
| Environment info | `docker info` |
| Disk usage | `docker system df` |
| Pull image | `docker pull ubuntu` |
| List images | `docker images` |
| Build image | `docker build -t myapp:1.0 .` |
| Remove image | `docker rmi <image>` |
| Run container | `docker run nginx` |
| Run in background | `docker run -d nginx` |
| Custom name | `docker run --name my-app nginx` |
| Map port 8080 → 80 | `docker run -p 8080:80 nginx` |
| Run interactively | `docker run -it ubuntu bash` |
| Running containers | `docker ps` |
| All containers | `docker ps -a` |
| Stop / start / restart | `docker stop <c>` · `docker start <c>` · `docker restart <c>` |
| Remove container | `docker rm <c>` |
| Force remove | `docker rm -f <c>` |
| View logs | `docker logs <c>` |
| Follow logs | `docker logs -f <c>` |
| Enter container | `docker exec -it <c> bash` (or `sh`) |
| Inspect | `docker inspect <c>` |
| Resource usage | `docker stats` |
| Processes in container | `docker top <c>` |
| Create / list volume | `docker volume create <v>` · `docker volume ls` |
| Create / list / remove network | `docker network create <n>` · `docker network ls` · `docker network rm <n>` |
| Clean unused resources | `docker system prune` |

Compose commands → §59.

---

## 95. 🔥 Must-Memorize Commands

```bash
# Containers
docker ps
docker ps -a
docker run -d --name web -p 8080:80 nginx
docker logs -f web
docker exec -it web sh
docker stop web
docker start web
docker restart web
docker rm -f web

# Images
docker images
docker pull nginx
docker build -t myapp:1.0 .
docker rmi myapp:1.0

# Volumes & networks
docker volume create my-volume
docker volume ls
docker network create app-network
docker network ls

# Compose
docker compose up -d
docker compose ps
docker compose logs -f
docker compose exec <service> sh
docker compose down
docker compose config
```

---

## 96. 🧾 Concept Cheat Sheet

```text
IMAGE                    → template / blueprint (read-only)
CONTAINER                → running instance of an image
DOCKERFILE               → recipe to build an image
REGISTRY                 → where images are stored (Docker Hub, ECR)

docker run               → (pull) + create + start NEW container
docker start             → start EXISTING container
docker stop              → stop container (it still exists)
docker rm                → remove container
docker logs              → view container output
docker exec              → run a command inside a running container

-d                       → detached / background
-p HOST:CONTAINER        → port mapping
-e KEY=VALUE             → environment variable
-v VOLUME:CONTAINER_PATH → persistent storage
--network NAME           → join a Docker network
--name NAME              → container name (= hostname on the network)

Host → container         → localhost:HOST_PORT
Container → container    → service-name:CONTAINER_PORT

docker compose up -d     → start multi-container app
docker compose down      → remove containers + network (data kept)
docker compose down -v   → also remove volumes ⚠️ DESTRUCTIVE
```

---

## 97. 🚀 Complete Mental Model

```text
                    Dockerfile
                        │ docker build
                        ▼
                 ┌──────────────┐   docker push / pull   ┌──────────┐
                 │ Docker Image │ ◀────────────────────▶ │ Registry │
                 └──────┬───────┘                        └──────────┘
                        │ docker run
                        ▼
              ┌───────────────────┐
              │ Docker Container  │
              │ App + Runtime +   │
              │ Dependencies      │
              └───────┬───────────┘
          ┌───────────┼────────────┐
          ▼           ▼            ▼
        Port       Network       Volume
          │           │            │
          ▼           ▼            ▼
     Host access  Container-to-  Persistent
     (browser)    container DNS     data
```

For multiple containers:

```text
             compose.yaml
                  │
        docker compose up -d
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
    Node App   MongoDB     Redis
       └──────────┼──────────┘
          Default Compose network
       (reach each other by service name)
```

```text
                         DOCKER
          ┌─────────────────┼─────────────────┐
        Images          Containers         Compose
     docker pull       docker run         services
     docker build      docker start       networks
     docker rmi        docker stop        volumes
                       docker logs
                       docker exec
                       docker rm
```

---

## 98. 🗺️ Final Memory Map

```text
DEVOPS
  ├── CI/CD
  ├── Automation
  ├── Monitoring
  ├── Infrastructure
  └── Collaboration
          │
          ▼
       DOCKER
          ├── Dockerfile → Image → Container
          ├── Registry (public / private)
          ├── Port mapping (-p)
          ├── Logs & exec
          ├── Network (service names)
          ├── Volume (persistent data)
          └── Compose (multi-container apps)
```

> ⭐ **Core idea:** Docker packages the application environment into an **image**, creates **containers** from it, connects them with **networks** and **ports**, keeps data safe in **volumes**, and **Docker Compose** runs the whole multi-container application from one YAML file.
