# Complete Docker Interview & Practical Assessment Solutions Guide

This guide contains comprehensive, detailed answers and practical explanations for all **320 questions, practical tasks, troubleshooting scenarios, and final mock interview questions**.

---

# 🟢 PART 1 — Docker Fundamentals

### 1. What is Docker?
**Docker** is an open-source platform designed to create, deploy, run, and manage applications using **containerization**. It packages an application along with all its code, dependencies, libraries, configuration files, and runtime environment into a single standardized unit called a **container**. This ensures that the application executes uniformly and reliably regardless of the host operating system, infrastructure, or hardware setup.

---

### 2. Why was Docker created? What problem does it solve?
Docker was created to solve the classic developer dilemma: **"It works on my machine!"**

#### Problems Docker Solves:
1. **Environment Inconsistency**: Differences between developer machines, staging servers, and production environments often cause unexpected bugs due to OS variations, missing libraries, or conflicting dependency versions.
2. **Heavy Resource Overhead of Virtual Machines**: Hypervisor-based Virtual Machines (VMs) require a complete guest operating system for every application, consuming gigabytes of RAM and storage.
3. **Complex Dependency Management**: Applications often require specific versions of runtimes (e.g., Python 3.9 vs 3.11, Node.js 18 vs 20). Docker isolates these environments completely on the same host.
4. **Slow Deployment Pipelines**: Provisioning VMs takes minutes. Docker containers launch in milliseconds.

---

### 3. What is containerization?
**Containerization** is an OS-level virtualization method used to deploy and run applications without launching an entire Virtual Machine. It packages application code along with its runtime, system tools, libraries, and configuration files into an isolated process space (container) on the host operating system. Containers share the host system’s Linux kernel while maintaining isolated file systems, process trees, network stacks, and user spaces.

---

### 4. What is the difference between a virtual machine and a Docker container?

| Feature | Virtual Machine (VM) | Docker Container |
| :--- | :--- | :--- |
| **Architecture** | Hypervisor (Type 1 or Type 2) + Guest OS | Docker Engine + Shared Host OS Kernel |
| **Boot Time** | Minutes (boots guest OS) | Milliseconds to seconds |
| **Resource Overhead** | High (GBs of RAM, dedicated CPU & disk per OS) | Very Low (MBs of RAM, shares host kernel) |
| **Isolation Level** | Hardware-level isolation (hypervisor enforced) | Process-level isolation (namespaces & cgroups) |
| **Portability** | Low (heavy image files, e.g., 10GB–50GB) | High (lightweight layered images, e.g., 5MB–500MB) |
| **Density** | Can run tens of VMs on a host | Can run hundreds/thousands of containers on a host |

---

### 5. What is a Docker image?
A **Docker image** is a read-only, executable template containing instructions for building a container. It consists of multiple stacked, immutable filesystem layers representing everything required to execute an application—including operating system libraries, application code, dependencies, environment variables, and default configuration commands.

---

### 6. What is a Docker container?
A **Docker container** is a runnable, isolated instance of a Docker image. It is essentially a process running on the host Linux kernel with a writable layer (container layer) added on top of the image's read-only layers. Containers can be started, stopped, moved, restarted, or deleted using the Docker API or CLI commands.

---

### 7. What is the difference between a Docker image and a Docker container?
* **Analogy**:
  * **Docker Image** = Blueprint / Class / Executable Binary.
  * **Docker Container** = Built House / Object Instance / Running Process.
* An **image** is static, read-only, and stored on disk.
* A **container** is dynamic, running, stateful (via top writable layer), and active in memory/CPU execution.

---

### 8. Is a Docker image mutable or immutable?
A Docker image is **immutable** (read-only). Once an image layer is built, it can never be altered or modified. Any state changes, file modifications, or file creations made inside a running container are written to a temporary container-specific writable layer (Copy-on-Write layer) and do **not** modify the underlying parent image.

---

### 9. Can multiple containers be created from the same image?
**Yes.** You can instantiate as many containers as host resources allow from a single Docker image. Each container runs as an independent process with its own isolated file system layer, IP address, and process ID (PID) namespace.

---

### 10. What happens when you run a Docker image?
When you execute `docker run <image-name>`:
1. The Docker CLI communicates with the Docker Daemon (`dockerd`).
2. The daemon checks if the requested image is stored in the local image cache.
3. If not found locally, the daemon pulls the image layers from the default or specified Docker Registry (e.g., Docker Hub).
4. The daemon creates a read-write container layer on top of the image's immutable layers.
5. The daemon allocates network interfaces, IP addresses, and routes to the container.
6. The container runtime (`containerd` + `runc`) isolates the process using kernel namespaces and cgroups, then executes the specified entrypoint/command (e.g., `CMD` or `ENTRYPOINT`).

---

### 11. What is Docker Engine?
**Docker Engine** is the core client-server application component of Docker responsible for building, running, and managing containers. It consists of three main components:
1. **Daemon (`dockerd`)**: The background daemon process that manages Docker objects (images, containers, networks, volumes).
2. **REST API**: An interface used by programs/CLI to command `dockerd`.
3. **Docker CLI (`docker`)**: The command-line client tool used by developers to interact with the Docker Daemon.

---

### 12. What is Docker Desktop?
**Docker Desktop** is an easy-to-install GUI application for macOS and Windows development environments. It includes Docker Engine, Docker CLI, Docker Compose, Kubernetes, Docker Scout, buildx, and container management tools packaged together with a lightweight Linux Virtual Machine (Hyper-V/WSL2 on Windows, Apple Virtualization Framework/hyperkit on macOS) to run Linux containers natively.

---

### 13. What is Docker Hub?
**Docker Hub** is a cloud-based public and private registry service hosted by Docker Inc. It serves as a central repository for finding, sharing, and storing Docker container images (e.g., official images like `ubuntu`, `nginx`, `node`, `mongo`, `python`).

---

### 14. What is a Docker Registry?
A **Docker Registry** is a stateless, highly scalable server application that stores and distributes Docker images. Registries store Docker repositories containing tagged images. Standard registries include Docker Hub, Amazon ECR (Elastic Container Registry), Google Artifact Registry, Azure Container Registry (ACR), and self-hosted registries (Harbor, Nexus).

---

### 15. What is the difference between Docker Hub and a private registry?
* **Docker Hub**: Publicly accessible, multi-tenant cloud registry maintained by Docker Inc. Stores open-source images, official vendor base images, and user repositories.
* **Private Registry**: Enterprise-hosted registry (e.g., AWS ECR, self-hosted Harbor) restricted behind internal corporate firewalls or IAM controls. Used to store proprietary code, custom enterprise base images, and compliant production artifacts securely.

---

### 16. What is Docker CLI?
**Docker CLI (`docker`)** is the primary command-line tool developers use to interact with Docker. It processes user terminal inputs (e.g., `docker run`, `docker build`), converts them into REST API HTTP requests, and sends them to the Docker daemon (`dockerd`) over Unix domain sockets (`/var/run/docker.sock`) or TCP sockets.

---

### 17. What is the Docker daemon?
The **Docker daemon (`dockerd`)** is the background service running on the host system. It listens for Docker API requests from the CLI or third-party tools and manages Docker objects such as images, containers, networks, volumes, and storage drivers.

---

### 18. What is the Docker client?
The **Docker client** is the primary command-line interface or GUI tool (like Docker CLI or Docker Desktop UI) through which users issue commands to manage Docker infrastructure. The client communicates with one or multiple Docker daemons remotely or locally via REST APIs.

---

### 19. Explain how Docker CLI communicates with Docker Engine.
1. The user types a command in the terminal (e.g., `docker ps`).
2. The Docker CLI parses the arguments and formats an HTTP REST API request payload.
3. The CLI transmits this HTTP request over the IPC socket `/var/run/docker.sock` (on Linux/macOS) or named pipe (on Windows). For remote hosts, it uses TLS-encrypted TCP sockets (e.g., `tcp://host:2376`).
4. The Docker daemon (`dockerd`) receives and authenticates the API request, performs the requested action, and returns a JSON/streamed HTTP response back to the CLI.
5. The CLI formats the JSON response into human-readable terminal output.

---

### 20. What is a container runtime?
A **container runtime** is low-level software responsible for launching, running, and managing the lifecycle of containerized processes on a host operating system.
* **High-Level Runtimes**: `containerd`, `CRI-O` (manage image pulling, storage layers, network wiring, and API specs).
* **Low-Level Runtimes**: `runc`, `crun` (interact directly with Linux kernel namespaces and cgroups to spawn process boundaries).

---

### 21. What is the difference between Docker and Kubernetes?
* **Docker**: A containerization technology and runtime ecosystem used to build, package, run, and distribute individual containers on a single host.
* **Kubernetes (K8s)**: A container **orchestrator** platform used to automate the deployment, scaling, load balancing, self-healing, networking, and management of thousands of containers across a cluster of multiple host nodes.

---

### 22. Why are containers lightweight compared with VMs?
Containers do not include a full guest operating system (kernel, device drivers, system services). They run directly as isolated processes on the host OS kernel. This avoids hypervisor emulation overhead, guest OS memory reservations, and kernel boot times, resulting in minimal footprint (MBs instead of GBs) and instant startup times.

---

### 23. Does every Docker container have its own operating system?
**No.** Docker containers do **not** have their own OS kernel. Containers only contain user-space distributions (root filesystem directories `/bin`, `/lib`, `/usr`, binary tools, and libraries). All containers running on a host share the single underlying host Linux kernel.

---

### 24. What is the role of the Linux kernel in containers?
The Linux kernel is the single shared core engine that enables containerization. It manages hardware resources (CPU, RAM, disk, networking) and provides isolation primitives (**namespaces**, **cgroups**, **seccomp**, **AppArmor/SELinux**) to enforce security, process boundary separation, and strict resource allocations between containers.

---

### 25. What are namespaces in Linux?
**Namespaces** provide process-level isolation by giving a container its own isolated view of system resources. Linux namespaces include:
* **PID Namespace**: Process IDs (container PID 1 is isolated from host PIDs).
* **NET Namespace**: Network interfaces, IP routes, iptables rules, port bindings.
* **MNT Namespace**: Mount points and filesystem structures.
* **IPC Namespace**: Inter-Process Communication (POSIX message queues, shared memory).
* **UTS Namespace**: Hostname and NIS domain name.
* **USER Namespace**: User and group IDs (map container root to non-root host user).

---

### 26. What are cgroups?
**Control Groups (cgroups)** are a Linux kernel feature that controls, limits, accounts for, and isolates resource usage (CPU time, RAM capacity, disk I/O bandwidth, network bandwidth) among groups of processes. They ensure that a single container cannot exhaust system RAM or CPU (preventing "noisy neighbor" issues).

---

### 27. Why are namespaces and cgroups important for containers?
* **Namespaces** answer: **"What can a container SEE?"** (provides boundary isolation so containers cannot see host processes or other containers).
* **Cgroups** answer: **"What can a container USE?"** (enforces resource utilization limits so containers cannot crash the host machine).
Together, they form the core virtualization building blocks of Linux containers.

---

# 🟢 PART 2 — Essential Docker Commands

### 28. How do you check whether Docker is installed?
```bash
docker --version
# or
docker info
```

---

### 29. How do you check the Docker version?
```bash
docker version
```

---

### 30. How do you see Docker system information?
```bash
docker info
```

---

### 31. How do you download an image?
```bash
docker pull <image_name>:<tag>
# Example:
docker pull nginx:latest
```

---

### 32. How do you list Docker images?
```bash
docker images
# or
docker image ls
```

---

### 33. How do you run a container?
```bash
docker run <image_name>
```

---

### 34. How do you list running containers?
```bash
docker ps
# or
docker container ls
```

---

### 35. How do you list all containers, including stopped containers?
```bash
docker ps -a
# or
docker container ls -a
```

---

### 36. How do you stop a running container?
```bash
docker stop <container_id_or_name>
```

---

### 37. How do you start a stopped container?
```bash
docker start <container_id_or_name>
```

---

### 38. How do you restart a container?
```bash
docker restart <container_id_or_name>
```

---

### 39. How do you remove a container?
```bash
docker rm <container_id_or_name>
```

---

### 40. How do you remove an image?
```bash
docker rmi <image_id_or_name>
# or
docker image rm <image_id_or_name>
```

---

### 41. How do you forcefully remove a container?
```bash
docker rm -f <container_id_or_name>
```

---

### 42. How do you see container logs?
```bash
docker logs <container_id_or_name>
```

---

### 43. How do you follow container logs continuously?
```bash
docker logs -f <container_id_or_name>
```

---

### 44. How do you inspect a container?
```bash
docker inspect <container_id_or_name>
```

---

### 45. How do you inspect an image?
```bash
docker inspect <image_id_or_name>
```

---

### 46. How do you execute a command inside a running container?
```bash
docker exec <container_id_or_name> <command>
# Example:
docker exec my-container ls -la /app
```

---

### 47. How do you open a shell inside a container?
```bash
docker exec -it <container_id_or_name> bash
# If bash is not available:
docker exec -it <container_id_or_name> sh
```

---

### 48. How do you see container processes?
```bash
docker top <container_id_or_name>
```

---

### 49. How do you see Docker networks?
```bash
docker network ls
```

---

### 50. How do you see Docker volumes?
```bash
docker volume ls
```

---

### 51. How do you remove unused Docker resources?
```bash
docker system prune -a --volumes
```

---

# 🟢 PART 3 — Important Commands: Practice

### 52. `docker pull nginx`
Downloads the official Nginx image (tagged `latest` by default) from Docker Hub to the local image repository without creating or starting a container.

---

### 53. `docker run nginx`
Downloads Nginx (if not already local), creates a container from it, and executes it in the **foreground**. Terminal stdout/stderr streams will be attached to the container process.

---

### 54. `docker run -d nginx`
Runs the Nginx container in **detached mode** (in the background). Prints the long container ID to the terminal and yields control back to the user prompt immediately.

---

### 55. `docker run --name my-nginx nginx`
Runs an Nginx container and assigns it the explicit human-readable container name `my-nginx` instead of an auto-generated random name (e.g., `trusting_hopper`).

---

### 56. `docker ps`
Lists all currently active (**running**) containers along with container IDs, image tags, commands, creation time, status, ports, and names.

---

### 57. `docker ps -a`
Lists **all** containers in the local engine state, including running, paused, exited, and stopped containers.

---

### 58. `docker stop my-nginx`
Sends a `SIGTERM` signal to the main process (PID 1) inside container `my-nginx` to allow graceful shutdown. If it does not stop within a timeout (default 10s), it sends `SIGKILL`.

---

### 59. `docker start my-nginx`
Starts an existing, stopped container named `my-nginx` without recreating its configuration or layer state.

---

### 60. `docker restart my-nginx`
Stops the container `my-nginx` (via `SIGTERM`) and immediately starts it back up. Useful for reloading configurations.

---

### 61. `docker rm my-nginx`
Removes the stopped container `my-nginx` from disk (frees container layer storage). Returns an error if the container is currently running.

---

### 62. `docker rmi nginx`
Deletes the `nginx` image from local storage. Fails if active or stopped containers are still referencing this image.

---

### 63. `docker logs my-nginx`
Retrieves and prints all historical stdout and stderr output generated by process PID 1 inside the `my-nginx` container up to the current moment.

---

### 64. `docker logs -f my-nginx`
Streams (`--follow`) live stdout and stderr logs from `my-nginx` continuously in real time until interrupted (`Ctrl+C`).

---

### 65. `docker exec -it my-nginx bash`
Executes an interactive terminal (`-i` interactive stdin, `-t` pseudo-TTY) opening a `/bin/bash` shell inside the running container `my-nginx`.

---

### 66. `docker inspect my-nginx`
Returns a detailed JSON object containing low-level operational configuration data of `my-nginx` (IP address, mounts, environment variables, state, network specs).

---

### 67. `docker stats`
Displays a live, real-time streaming stats overview of CPU usage, memory consumption/limits, memory %, network I/O, and disk block I/O for all running containers.

---

### 68. `docker top my-nginx`
Lists the active host system process list (PIDs, user, CPU usage, command) running inside the `my-nginx` container.

---

# 🟢 PART 4 — docker run

### 69. Explain this command completely: `docker run -d -p 8080:80 nginx`
* `docker run`: Instructs Docker Engine to create and start a container.
* `-d`: Detached mode (runs the container process in the background).
* `-p 8080:80`: Port forwarding flag mapping host port `8080` to container port `80`.
* `nginx`: The image name used to instantiate the container.

---

### 70. What does `-d` mean?
Detached mode. It runs the container in the background and returns the container ID to the terminal prompt.

---

### 71. What does `-p` mean?
Publish / Port-mapping flag. It binds a port on the host machine interface to a listening port inside the isolated container network space.

---

### 72. What does `8080:80` mean?
It defines `<Host Port>:<Container Port>`. Incoming traffic hitting port `8080` on the host machine is forwarded by Docker's proxy/iptables to port `80` inside the container.

---

### 73. Which port is the host port?
`8080` (the number before the colon `:`).

---

### 74. Which port is the container port?
`80` (the number after the colon `:`).

---

### 75. What happens if you use `docker run -p 80:8080 nginx`?
It maps **host port 80** to **container port 8080**. Nginx inside the standard image listens on port 80 (not 8080), so accessing host `http://localhost:80` will result in a connection refusal because container port 8080 has no listening service.

---

### 76. What is the difference between `docker run nginx` and `docker run -d nginx`?
* `docker run nginx`: Runs attached in the foreground. Terminal stays locked, streaming logs. Closing terminal kills the container process.
* `docker run -d nginx`: Runs detached in the background. Terminal remains free for further CLI commands.

---

### 77. What happens if you run the same container command twice?
* **Without explicit `--name`**: Docker creates two separate containers with distinct random names and container IDs.
* **With explicit `--name`** (e.g. `--name my-web`): The second execution fails with an error stating that container name `/my-web` is already in use.
* **With fixed host port** (e.g. `-p 8080:80`): The second execution fails because host port `8080` is already allocated to the first container.

---

### 78. Can two containers use the same host port?
**No.** On a single host machine, two processes/containers cannot bind to the exact same host network port and protocol (e.g., `8080/tcp`) simultaneously.

---

### 79. Why would Docker give a "port is already allocated" error?
This occurs when you attempt to bind a container to a host port that is already in use by another running container or an existing host system service (e.g., local Nginx, Apache, or PostgreSQL daemon).

---

### 80. How would you solve a port conflict?
1. Choose a different, unallocated host port (e.g., change `-p 8080:80` to `-p 8081:80`).
2. Identify and stop the process/container currently occupying the host port:
   ```bash
   # Find container using port
   docker ps | grep 8080
   docker stop <conflicting_container_id>
   ```

---

# 🟡 PART 5 — Dockerfile

### 81. What is a Dockerfile?
A **Dockerfile** is a text script containing a sequential set of commands and instructions used by Docker to automatically build a custom Docker image.

---

### 82. Why do we use Dockerfiles?
* **Infrastructure as Code (IaC)**: Automates image creation repeatably across environments.
* **Version Control**: Allows image configuration tracking via Git.
* **Consistency**: Guarantees identical container build artifacts across development, testing, and production pipelines.

---

### 83. Explain this Dockerfile:
```dockerfile
FROM node:20            # 1. Sets official Node.js version 20 as base image
WORKDIR /app            # 2. Creates and sets container working directory to /app
COPY package*.json ./   # 3. Copies package.json and package-lock.json to /app
RUN npm install         # 4. Executes 'npm install' to install app dependencies
COPY . .                # 5. Copies remaining source code from host to /app
EXPOSE 3000             # 6. Documents that the application listens on port 3000
CMD ["npm", "start"]    # 7. Specifies default execution command when container runs
```

---

### 84. What does `FROM` do?
Specifies the parent/base image upon which your image layer stack is built. Must be the first non-comment instruction in a standard Dockerfile.

---

### 85. What does `WORKDIR` do?
Sets the working directory for subsequent `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, and `ADD` instructions. Creates the directory automatically if it does not exist.

---

### 86. What does `COPY` do?
Copies local files and directories from the host build context into the filesystem of the container image layer.

---

### 87. What does `ADD` do?
Copies files/directories from host to image filesystem like `COPY`, but also supports extracting local TAR archives automatically and downloading files directly from remote URL sources.

---

### 88. Difference between `COPY` and `ADD`.
* `COPY`: Standard, explicit, predictable file copying from host context. **Best Practice** for almost all file copies.
* `ADD`: Extra functionality (auto-decompresses TAR files and downloads remote URLs). Should only be used specifically when TAR extraction is required.

---

### 89. What does `RUN` do?
Executes commands during the image **build phase** and commits the resulting layer state into the final Docker image (e.g., installing OS packages `apt-get install`, dependencies).

---

### 90. What does `CMD` do?
Provides default arguments and execution instructions for the container at **runtime** (when `docker run` is executed). Can be overridden easily via CLI.

---

### 91. What does `ENTRYPOINT` do?
Defines the main executable binary that will **always** run when the container starts. CLI arguments passed to `docker run` are appended to `ENTRYPOINT`.

---

### 92. Difference between `CMD` and `ENTRYPOINT`.
* `CMD`: Default command that gets **completely overridden** if the user passes trailing arguments to `docker run`.
* `ENTRYPOINT`: Hard execution target that **cannot be overridden** easily (unless `--entrypoint` flag is passed). Arguments passed at runtime are appended as parameters to `ENTRYPOINT`.
* **Combined Usage**: `ENTRYPOINT` defines the executable, while `CMD` provides default parameter arguments.

---

### 93. What does `EXPOSE` do?
Acts as documentation between the image author and user indicating which ports the containerized application listens on.

---

### 94. Does `EXPOSE 3000` actually publish port 3000?
**No.** `EXPOSE` is purely metadata documentation. It does **not** bind or publish ports on the host system interface. You must still pass `-p 3000:3000` or `-P` at runtime.

---

### 95. What does `ENV` do?
Sets key-value environment variables that persist throughout the image build process and remain active inside running containers.

---

### 96. What does `ARG` do?
Defines build-time variables that users can pass during `docker build` (using `--build-arg key=value`). They do **not** persist in the final running container runtime environment.

---

### 97. Difference between `ARG` and `ENV`.
* `ARG`: Available **only** during image build time (`docker build`). Not available when container is running.
* `ENV`: Available during build phase **and persistent** in container runtime (`docker run`).

---

### 98. What does `USER` do?
Sets the username or UID (and optionally group GID) for subsequent instructions in the Dockerfile and when running the final container, enforcing non-root security principles.

---

### 99. What does `VOLUME` do?
Creates a mount point and instructs Docker that specified paths should be treated as persistent external data mounts.

---

### 100. What does `LABEL` do?
Adds metadata key-value pairs to an image (e.g., `LABEL maintainer="admin@example.com" version="1.0"`).

---

### 101. Can a Dockerfile contain multiple `CMD` instructions?
**Yes**, syntax-wise, but **only the last `CMD` instruction** in the Dockerfile takes effect. Previous `CMD` lines are overridden.

---

### 102. Can a Dockerfile contain multiple `RUN` instructions?
**Yes.** Every `RUN` instruction creates a distinct read-only layer in the image stack.

---

### 103. What happens when you build a Dockerfile?
The Docker daemon reads instructions sequentially, executes each command in a temporary container context, commits changes as an immutable layer, caches layers, and outputs a completed image tagged with a unique hash ID.

---

### 104. What is a Docker image layer?
A Docker image layer is an immutable read-only filesystem diff created by instructions (`RUN`, `COPY`, `ADD`) in a Dockerfile. Layers are stacked hierarchically using Union Filesystems (Overlay2).

---

### 105. Why does Docker use layers?
1. **Reusability & Space Savings**: Multiple images share common base layers (e.g. `ubuntu` base), saving disk space and network bandwidth.
2. **Fast Builds (Caching)**: Unchanged build layers are cached and reused instantly in subsequent builds.

---

# 🟡 PART 6 — Building Images

### 106. How do you build an image?
```bash
docker build -t <image_name>:<tag> <path_to_context>
```

---

### 107. Explain: `docker build -t myapp:1.0 .`
* `docker build`: Command initiating image creation.
* `-t myapp:1.0`: Tags the resulting image with name `myapp` and tag version `1.0`.
* `.`: Sets the current directory as the **build context**.

---

### 108. What does `-t` mean?
Name and optionally a tag in the format `name:tag`.

---

### 109. What does `.` mean in the build command?
It specifies the local directory path containing the source files and Dockerfile used as the **build context**.

---

### 110. What is the Docker build context?
The build context is the set of local host files and directories located at the path specified in `docker build`. The Docker CLI compresses and sends this entire directory context to the Docker daemon so `COPY` and `ADD` instructions can access host files.

---

### 111. What is `.dockerignore`?
A text file placed in the build context root listing file and pattern paths (e.g., `node_modules`, `.git`, `*.log`, `.env`) that must be excluded from being sent to the Docker daemon during build context evaluation.

---

### 112. Why should we use `.dockerignore`?
* **Faster Builds**: Prevents sending large unneeded files (`node_modules`, build artifacts) over API sockets.
* **Security**: Excludes sensitive files (private keys, passwords, `.env` files) from accidentally leaking into image layers.
* **Cache Efficiency**: Keeps cache valid by ignoring frequently changing non-build files (logs, docs).

---

### 113. What happens if you modify one line in a Dockerfile and rebuild?
Docker invalidates the cache for that specific instruction layer and **for all subsequent instructions** in the Dockerfile. Previous unchanged steps before the modified line will still use build cache.

---

### 114. What is Docker build cache?
A performance mechanism where Docker reuses existing cached image layers from previous builds if the instructions and input files have not changed.

---

### 115. Why is Docker caching useful?
It reduces build times from several minutes down to milliseconds by avoiding redundant network downloads and code compilation steps.

---

### 116. How can you disable the cache during a build?
```bash
docker build --no-cache -t myapp:1.0 .
```

---

### 117. What is a dangling image?
A dangling image is an untagged image layer displayed as `<none>:<none>` in `docker images`. It occurs when a new image is built with an existing tag, leaving the older build layers unassociated with any named tag.

---

### 118. How do you remove dangling images?
```bash
docker image prune
```

---

# 🟡 PART 7 — Docker Volumes

### 119. Why do containers need persistent storage?
Containers are ephemeral by default. When a container process exits or is deleted, its top read-write container layer is destroyed along with all data generated during execution. Persistent storage decouples data lifecycle from container lifecycle.

---

### 120. What happens to data inside a container when the container is deleted?
Any data stored inside the default container filesystem (writable container layer) is **permanently destroyed**. Only data written to mounted Docker volumes or bind mounts will survive.

---

### 121. What is a Docker volume?
A Docker volume is a storage area managed directly by Docker Engine on the host filesystem (typically under `/var/lib/docker/volumes/`). Volumes are completely isolated from core host system structure and are the standard way to persist container data.

---

### 122. What is a bind mount?
A bind mount maps a specific, explicit directory or file on the host machine filesystem (e.g., `/home/user/app`) directly into a container directory.

---

### 123. Difference between volume and bind mount.

| Feature | Docker Volume | Bind Mount |
| :--- | :--- | :--- |
| **Host Storage Path** | Managed by Docker (`/var/lib/docker/volumes/`) | Explicit user path anywhere on host (`/path/on/host`) |
| **Managed By** | Docker CLI & Engine | Host OS file system & User |
| **Portability** | High (works identically on Linux, Win, macOS) | Low (relies on host specific paths) |
| **Performance** | Optimized performance | Slower on non-Linux OS (macOS/Win virtualization) |
| **Populate Default** | Populates volume with image directory data | Overwrites image container contents with host files |

---

### 124. How do you create a volume?
```bash
docker volume create my-vol
```

---

### 125. How do you list volumes?
```bash
docker volume ls
```

---

### 126. How do you inspect a volume?
```bash
docker volume inspect my-vol
```

---

### 127. How do you remove a volume?
```bash
docker volume rm my-vol
```

---

### 128. Explain: `docker run -v mydata:/data nginx`
Mounts a named Docker volume named `mydata` to the directory `/data` inside the Nginx container. If `mydata` volume does not exist, Docker creates it automatically.

---

### 129. Explain: `docker run -v $(pwd):/app nginx`
Creates a **bind mount** mapping the current working directory on the host machine (`$(pwd)`) to the directory `/app` inside the container.

---

### 130. Which is generally preferred for production application data: volumes or bind mounts?
**Docker Volumes** are strongly preferred for production due to security (isolated from direct host access), management via Docker API, cloud backup capability, and platform independence. Bind mounts are primarily used during local development (live code updates).

---

### 131. How would you persist MongoDB data using Docker?
```bash
docker run -d \
  --name mongodb \
  -v mongo_data:/data/db \
  mongo:latest
```

---

# 🟡 PART 8 — Docker Networking

### 132. What is Docker networking?
Docker networking allows containers to communicate with each other, with the host machine, and with external network networks using software-defined virtual network drivers.

---

### 133. What is the default Docker network?
The default network is the **`bridge`** network (named `bridge` or `docker0`). Containers attached to this default network receive an IP from a virtual subnet (e.g. `172.17.0.0/16`).

---

### 134. What is a bridge network?
A software-defined virtual bridge interface running on the host OS. Containers attached to the same custom bridge network can communicate with each other using IP addresses or container names via internal DNS.

---

### 135. What is a host network?
Removes network isolation between the container and the Docker host. The container shares the host’s exact network interfaces, IP address, and port namespace directly.

---

### 136. What is a none network?
Disables all networking for the container. The container only has a loopback (`127.0.0.1`) interface and is completely isolated from outside communication.

---

### 137. How do you create a Docker network?
```bash
docker network create my-net
```

---

### 138. How do you connect a container to a network?
```bash
docker network connect my-net container_name
```

---

### 139. How do you disconnect a container from a network?
```bash
docker network disconnect my-net container_name
```

---

### 140. How do containers communicate with each other?
1. **On User-Defined Custom Networks**: Containers communicate directly using container names or aliases via embedded Docker DNS resolution.
2. **On Default Bridge Network**: Containers can only communicate using explicit IP addresses or legacy `--link` flags.

---

### 141. Can containers communicate using container names?
**Yes**, but **only on custom user-defined networks** (not on the default `bridge` network).

---

### 142. Why is Docker DNS important?
Docker runs an embedded DNS server at `127.0.0.11` inside custom bridge networks. It dynamically translates container names into their respective internal container IP addresses, eliminating hardcoded IP reliance in microservice architectures.

---

### 143. Explain: `docker network create my-network`
Creates a custom user-defined bridge network named `my-network` with automatic DNS resolution enabled.

---

### 144. Explain: `docker run -d --name db --network my-network mongo`
Runs a MongoDB container named `db` in detached mode attached to `my-network`.

---

### 145. Explain: `docker run -d --name backend --network my-network myapp`
Runs a backend container named `backend` attached to the same `my-network` bridge.

---

### 146. How would the backend connect to MongoDB?
The backend application connection string uses the container name `db` as the hostname:
`mongodb://db:27017/mydatabase`

---

### 147. Why shouldn't you normally use `localhost` to connect from one container to another?
Inside a container, `localhost` refers strictly to the container's **own internal loopback interface** (`127.0.0.1`), not the host machine or neighboring containers.

---

# 🟡 PART 9 — Docker Compose

### 148. What is Docker Compose?
**Docker Compose** is a declarative tool for defining and running multi-container Docker applications using a single YAML configuration file (`compose.yaml` or `docker-compose.yml`).

---

### 149. Why do we use Docker Compose?
It replaces complex, error-prone multi-line terminal commands with a clean, version-controlled YAML specification that can spin up an entire stack of containers, networks, and volumes with a single command (`docker compose up`).

---

### 150. What is `compose.yaml`?
The standard configuration file used by Docker Compose to define services (containers), networks, volumes, environment variables, and deployment parameters.

---

### 151. What is the difference between Docker and Docker Compose?
* **Docker CLI**: Used to manage individual containers, images, volumes, and networks manually one command at a time.
* **Docker Compose**: Orchestrates multi-container applications declaratively using YAML files.

---

### 152. Explain this compose file:
```yaml
services:
  mongodb:
    image: mongo          # Service 1: Runs MongoDB image
    ports:
      - "27017:27017"    # Maps host port 27017 to container port 27017

  backend:
    build: .              # Service 2: Builds custom image from Dockerfile in current dir
    ports:
      - "3000:3000"      # Maps host port 3000 to container port 3000
    depends_on:
      - mongodb           # Ensures mongodb service starts before backend service
```

---

### 153. What does `services` mean?
Defines the container configurations that make up the application stack.

---

### 154. What does `image` mean?
Specifies the pre-built container image tag to pull from a registry.

---

### 155. What does `build` mean?
Specifies the path or build context used to compile a custom image from a local Dockerfile.

---

### 156. What does `ports` mean?
Maps host network ports to container ports (`<host>:<container>`).

---

### 157. What does `environment` mean?
Defines environment variables passed into the service containers.

---

### 158. What does `depends_on` mean?
Defines startup and shutdown dependency order between services.

---

### 159. What does `volumes` mean?
Mounts host paths or named volumes into service containers.

---

### 160. What does `networks` mean?
Defines custom virtual networks to attach to the services. If omitted, Compose creates a default network for all defined services.

---

### 161. How do you start a Compose application?
```bash
docker compose up
```

---

### 162. How do you start it in detached mode?
```bash
docker compose up -d
```

---

### 163. How do you stop Compose services?
```bash
docker compose stop
```

---

### 164. How do you remove Compose containers?
```bash
docker compose down
```

---

### 165. How do you see Compose logs?
```bash
docker compose logs -f
```

---

### 166. How do you rebuild Compose services?
```bash
docker compose up -d --build
```

---

### 167. How do you scale a Compose service?
```bash
docker compose up -d --scale backend=3
```

---

# 🛠️ PART 10 — Practical Docker Tasks

## Task 1 — Nginx

### 168. Pull the Nginx image.
```bash
docker pull nginx
```

---

### 169–171. Run Nginx in detached mode, map port 8080:80, name `webserver`.
```bash
docker run -d -p 8080:80 --name webserver nginx
```

---

### 172. Check whether it is running.
```bash
docker ps | grep webserver
```

---

### 173. Open its logs.
```bash
docker logs webserver
```

---

### 174. Stop the container.
```bash
docker stop webserver
```

---

### 175. Start it again.
```bash
docker start webserver
```

---

### 176. Remove the container.
```bash
docker rm -f webserver
```

---

## Task 2 — Redis

### 177. Run Redis in detached mode.
```bash
docker run -d --name redis-server redis
```

---

### 178. Enter the Redis container.
```bash
docker exec -it redis-server bash
```

---

### 179. Check the Redis process.
```bash
docker top redis-server
```

---

### 180. View Redis logs.
```bash
docker logs redis-server
```

---

### 181. Stop Redis.
```bash
docker stop redis-server
```

---

### 182. Remove Redis.
```bash
docker rm redis-server
```

---

## Task 3 — Custom Docker Image

### 183–189. Create Dockerfile with complete structure.
Create file `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

---

### 190. Build the image.
```bash
docker build -t my-node-app:1.0 .
```

---

### 191. Run the container.
```bash
docker run -d -p 3000:3000 --name node-app my-node-app:1.0
```

---

### 192. Test the application.
```bash
curl http://localhost:3000
```

---

# 🛠️ PART 11 — Real-World Practical Scenario

### 193. Create a Docker network.
```bash
docker network create app-network
```

---

### 194. Run MongoDB on that network.
```bash
docker run -d \
  --name mongodb \
  --network app-network \
  -v mongo_data:/data/db \
  mongo:latest
```

---

### 195–196. Run the backend on that network & communicate with MongoDB.
```bash
docker run -d \
  --name backend \
  --network app-network \
  -e MONGO_URI="mongodb://mongodb:27017/mydb" \
  -p 5000:5000 \
  my-backend-image:latest
```

---

### 197–198. Run the frontend & make it communicate with backend.
```bash
docker run -d \
  --name frontend \
  --network app-network \
  -p 80:80 \
  -e BACKEND_URL="http://localhost:5000" \
  my-frontend-image:latest
```

---

### 199. Persist MongoDB data.
Data persistence is handled by mounting the named volume `-v mongo_data:/data/db` on the MongoDB container.

---

### 200. Check logs if backend cannot connect to MongoDB.
```bash
# Check backend execution logs
docker logs backend

# Verify network DNS reachability inside backend container
docker exec -it backend ping mongodb
```

---

# 🛠️ PART 12 — Docker Compose Practical Project

### 201–208. Create `compose.yaml`.
Create `compose.yaml`:
```yaml
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: secretpassword
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
      MONGO_URI: mongodb://root:secretpassword@mongodb:27017/appdb?authSource=admin
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
      VITE_API_URL: http://localhost:5000
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

---

### 209. Start the complete application.
```bash
docker compose up -d
```

---

### 210. Check all containers.
```bash
docker compose ps
```

---

### 211. Check logs.
```bash
docker compose logs -f
```

---

### 212. Stop everything.
```bash
docker compose down
```

---

### 213. Rebuild the application.
```bash
docker compose build --no-cache
```

---

### 214. Start it again.
```bash
docker compose up -d
```

---

# 🚨 PART 13 — Troubleshooting Interview Questions

### 215. Container stops immediately after starting. What would you check?
1. Run `docker logs <container_id>` to view crash exceptions.
2. Check if the Dockerfile `CMD`/`ENTRYPOINT` process terminates immediately (e.g. running a background script or missing daemon flag like `nginx -g 'daemon off;'`).
3. Verify exit code using `docker inspect <container_id>` (e.g. Exit Code 137 = OOM Killed, Exit Code 1 = app exception).

---

### 216. Container is running but application is inaccessible. What would you check?
1. Verify port binding (`docker ps`) to ensure `-p <host>:<container>` is correctly configured.
2. Check if the app inside listens on `0.0.0.0` instead of `127.0.0.1`.
3. Check host firewall/iptables rules.

---

### 217. You get "port is already allocated". What does it mean?
The host port specified in `-p <host_port>:<container_port>` is already bound by another container or host process.

---

### 218. Application says "Connection refused". How to troubleshoot?
1. Check if the targeted server service is active and listening on the specified port.
2. Verify container network connectivity using `docker exec -it <container> nc -zv <target> <port>`.
3. Ensure service isn't binding exclusively to `127.0.0.1` inside its container.

---

### 219. Backend cannot connect to MongoDB using `localhost:27017`. Why?
Inside a container, `localhost` points to the backend container's own internal loopback interface. It must use the MongoDB container name (e.g., `mongodb:27017`) on a shared custom bridge network.

---

### 220. Image is 2 GB. How to reduce size?
1. Use lightweight base images (`alpine` or `distroless`).
2. Implement **multi-stage builds**.
3. Combine `RUN` commands and clean package manager caches (`rm -rf /var/lib/apt/lists/*`).
4. Add a `.dockerignore` file.

---

### 221. Build is very slow. What to investigate?
1. Lack of `.dockerignore` causing large build context upload.
2. Order of Dockerfile instructions invalidating build cache early.
3. Unoptimized package downloads without mirror caches.

---

### 222. Container consuming too much CPU. How to investigate?
```bash
docker stats
docker top <container_id>
```
Limit CPU allocation using `--cpus="1.5"`.

---

### 223. Container consuming too much memory. How to investigate?
Check `docker stats` and system syslog for Out-Of-Memory (OOM) kills. Limit RAM using `--memory="512m"`.

---

### 224. Container logs show application error. What command to use?
```bash
docker logs --tail 100 -f <container_id>
```

---

### 225. Container deleted accidentally. What happens to data?
Data inside the unmounted writable container layer is lost forever. Data stored in mounted volumes/bind mounts persists intact.

---

### 226. Database data disappears when container is recreated. Why?
The database container is storing data in its temporary container layer instead of a persistent Docker volume or bind mount.

---

### 227. How to prevent database data loss?
Mount a persistent Docker volume to the database data path (e.g. `-v mongo_data:/data/db`).

---

### 228. Dockerfile works locally but fails in production. What to investigate?
1. CPU architecture mismatches (`ARM64` vs `AMD64`).
2. Hardcoded local host paths or missing production environment variables.
3. Unpinned image dependency versions (`latest` pulling breaking changes).

---

### 229. Works inside container but not from browser. What could be wrong?
Application inside container is bound to `127.0.0.1` inside the container instead of `0.0.0.0` (all interfaces).

---

### 230. Two containers cannot communicate. What to check?
1. Verify both containers are attached to the exact same custom Docker network (`docker network inspect <net>`).
2. Ensure host firewall/iptables isn't blocking internal bridge traffic.

---

# 🔴 PART 14 — Advanced Docker Interview Questions

### 231. Explain Docker architecture.
Docker uses a client-server architecture:
* **Docker Client**: CLI/API sending commands.
* **Docker Host**: Runs the Docker Daemon (`dockerd`), container runtime (`containerd`), storage drivers (Overlay2), and virtual networking.
* **Registry**: Stores and distributes images (Docker Hub, ECR).

---

### 232. Explain Docker Client → Daemon → Container flow.
1. Client makes REST request over `/var/run/docker.sock`.
2. `dockerd` validates request and fetches image layers.
3. `dockerd` passes container spec to `containerd`.
4. `containerd` invokes `runc` to spawn process with namespaces/cgroups.

---

### 233. What is `containerd`?
An industry-standard core container runtime daemon that manages the complete container lifecycle: image transfer, container execution, storage mounts, and network attachments.

---

### 234. What is `runc`?
A lightweight, low-level CLI tool built according to OCI (Open Container Initiative) specifications to spawn and run containers using Linux kernel primitives (namespaces, cgroups).

---

### 235. Relationship between Docker Engine, containerd, and runc.
`Docker Engine (dockerd)` high-level management layer ➔ delegates to `containerd` lifecycle supervisor ➔ calls `runc` to create kernel process boundaries.

---

### 236. Difference between a container and a process?
A container **is** a process running on the host OS, but enclosed within Linux namespace boundaries and cgroup limitations.

---

### 237. What happens internally when you run `docker run nginx`?
`dockerd` API call ➔ Image pull ➔ Create read-write layer ➔ Allocate virtual veth pair ➔ `runc` configures namespaces & cgroups ➔ Executes PID 1 `nginx`.

---

### 238. Explain the lifecycle of a Docker container.
`Created` ➔ `Running` ➔ `Paused` / `Stopped` ➔ `Exited` ➔ `Destroyed`.

---

### 239. What happens internally during `docker build .`?
Tarball of context sent to daemon ➔ Step-by-step evaluation of Dockerfile ➔ Interim containers spun up for `RUN` ➔ Layers saved and hash-tagged.

---

### 240. Explain Docker image layers in detail.
Docker uses Overlay2 union filesystem. Each instruction in a Dockerfile generates a read-only filesystem layer. When a container runs, a thin read-write container layer is placed at the top of the stack.

---

### 241. How does Docker image caching work?
Docker checks if the instruction and the files being copied match the SHA-256 hash of existing layers on host. If matching, it reuses the layer cache.

---

### 242. What is a multi-stage Docker build?
A pattern using multiple `FROM` statements in a single Dockerfile to separate the compilation environment from the minimal production runtime environment.

---

### 243. Why are multi-stage builds useful?
Significantly decreases image size (e.g. from 1.5GB build SDK down to 15MB runtime binary) and reduces attack surface by leaving build tools (compilers, git, dev dependencies) out of production images.

---

### 244. Explain this concept:
```dockerfile
FROM node:20 AS builder   # Stage 1: Build & compile application code
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:alpine         # Stage 2: Minimal runtime web server
COPY --from=builder /app/dist /usr/share/nginx/html  # Copies only build artifacts
```

---

### 245. What is a distroless image?
An image containing **only** your application and its runtime dependencies (e.g., Node, Python, Java binary). It contains no package managers, shell (`/bin/sh`), or standard OS utilities, minimizing vulnerability vectors.

---

### 246. Why should containers generally run one main process?
Maintains container lifecycle alignment with process lifecycle (PID 1 exit = container stop), simplifies horizontal scaling, and enables clear logging/monitoring.

---

### 247. Difference between horizontal and vertical scaling in container environments?
* **Horizontal**: Increasing number of container instances across nodes.
* **Vertical**: Increasing CPU/Memory allocations for an individual container.

---

### 248. How to make Docker containers more secure?
Run non-root users, use minimal base images, scan vulnerabilities, read-only root filesystems (`--read-only`), drop capabilities (`--cap-drop=ALL`).

---

### 249. Why avoid running containers as root?
If a process breaks out of container isolation, host root access could be compromised.

---

### 250. How to scan Docker images for vulnerabilities?
```bash
docker scout quickview
# or
trivy image myapp:1.0
```

---

### 251. How should secrets be handled in Docker?
Use Docker Secrets, environment files (`.env` excluded from image layers), or vault secret managers (AWS Secrets Manager, HashiCorp Vault). Never hardcode secrets in Dockerfiles.

---

### 252. Why shouldn't passwords be hardcoded in Dockerfiles?
Dockerfile commands and layers are cached and inspectable by anyone with read access to the image via `docker history`.

---

### 253. What is Docker Content Trust (DCT)?
A security feature enabling digital signatures for images sent to and received from remote registries to verify publisher authenticity and integrity.

---

### 254. What is image tagging?
Labeling images with version identifiers (`image:tag`) to track builds.

---

### 255. Difference between `latest`, `1.0`, `1.0.1`.
* `latest`: Floating pointer pointing to most recent build. Unstable for production.
* `1.0`: Minor release tag.
* `1.0.1`: Exact patch version tag guaranteeing immutable builds.

---

### 256. Why shouldn't production systems blindly use `latest`?
`latest` can change unexpectedly between deployments, introducing breaking changes, unvetted updates, or rollback failures.

---

# 🔴 PART 15 — Docker Security

### 257. What are the major Docker security risks?
1. Unprivileged container escape to host root.
2. Compromised base images containing malware.
3. Exposed Docker daemon API socket (`/var/run/docker.sock`).
4. Hardcoded secrets in image layers.

---

### 258. Why is running containers as root dangerous?
Root inside a container defaults to UID 0, which maps directly to host UID 0 if user namespaces are disabled.

---

### 259. How can you run a container as a non-root user?
In Dockerfile:
```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

---

### 260. What are Linux capabilities?
Granular privileges granted to processes (e.g. `CAP_NET_BIND_SERVICE`, `CAP_SYS_ADMIN`) instead of full root powers.

---

### 261. What is the principle of least privilege?
Granting containers only the absolute minimum permissions, capabilities, and file access required to execute.

---

### 262–264. How can you limit container resources?
```bash
docker run -d \
  --memory="512m" \
  --cpus="1.0" \
  myapp:1.0
```

---

### 265–266. Securely managing env variables and secrets.
Inject secrets at runtime using environment variables from secure secret managers or mount Docker Secrets (`/run/secrets/`).

---

### 267. What is image vulnerability scanning?
Automated static analysis of binary dependencies and OS packages within image layers against Known Vulnerabilities (CVE) databases.

---

### 268. Why should production images be kept minimal?
Fewer packages and absence of utilities (like `curl`, `wget`, `netcat`, shell binaries) dramatically shrink the potential attack surface.

---

# 🎯 PART 16 — Interview Scenario Questions

### 269. You have 100 containers running on a server. How would you monitor them?
Use Prometheus with cAdvisor metric exporters paired with Grafana dashboards for metric visualization and alerting.

---

### 270. A container crashes every 10 minutes. How would you investigate?
1. Inspect logs: `docker logs --since 10m <container_id>`.
2. Inspect exit code: `docker inspect <container_id> --format='{{.State.ExitCode}}'`.
3. Check memory/OOM kills: `docker inspect <container_id> --format='{{.State.OOMKilled}}'`.

---

### 271. Application is working but suddenly becomes slow. What commands to use?
```bash
docker stats
docker top <container_id>
docker logs --tail 200 <container_id>
```

---

### 272–273. Server running out of disk space because of Docker. How to investigate & clean?
```bash
# Check space breakdown
docker system df

# Clean unused containers, networks, dangling images, and build cache
docker system prune -a --volumes
```

---

### 274. Docker image is 3 GB. Explain how to optimize it.
1. Switch base image from `ubuntu`/`node:full` to `alpine` or `distroless`.
2. Convert build to a **multi-stage build**.
3. Consolidate `RUN` statements and remove package manager caches.
4. Filter context using `.dockerignore`.

---

### 275–276. How to Dockerize a Laravel application?
Services: Nginx container + PHP-FPM container + MySQL container + Redis container.

---

### 277. How to Dockerize a Node.js application?
Multi-stage build compiling TypeScript/dependencies into clean `dist/` directory, run under non-root `USER node` on `node:alpine`.

---

### 278. How to Dockerize a React application?
Multi-stage build: Stage 1 uses Node to run `npm run build`; Stage 2 copies output static assets to `/usr/share/nginx/html` on `nginx:alpine`.

---

### 279–280. How to Dockerize MySQL & MongoDB?
Use official images with environment configurations (`MYSQL_ROOT_PASSWORD`, `MONGO_INITDB_ROOT_USERNAME`) paired with persistent volume mounts (`-v mysql_data:/var/lib/mysql`).

---

### 281–282. Connecting applications to DB containers.
Use container names as hostnames on shared custom bridge networks.

---

### 283. Persisting DB data across teardowns.
Mount named Docker Volumes to database data directories.

---

### 284. Handling environment-specific configuration.
Use `.env` files passed via `--env-file` or `env_file:` in Docker Compose.

---

### 285. Deploying Docker application using CI/CD.
1. Commit code to repository.
2. CI pipeline builds image (`docker build`).
3. Runs automated container security scan (`trivy`).
4. Pushes image tag to registry (ECR / Docker Hub).
5. SSH or CD agent triggers deployment rolling update (`docker compose up -d` or Kubernetes rollout).

---

# 💻 PART 17 — Command Challenge

### 286. Check Docker version.
`docker --version`

### 287. Pull Ubuntu.
`docker pull ubuntu`

### 288. List images.
`docker images`

### 289. List running containers.
`docker ps`

### 290. List all containers.
`docker ps -a`

### 291. Run Ubuntu interactively.
`docker run -it ubuntu bash`

### 292. Run Nginx in detached mode.
`docker run -d nginx`

### 293. Give a container a custom name.
`docker run --name my-app nginx`

### 294. Map port 8080 → 80.
`docker run -p 8080:80 nginx`

### 295. Stop a container.
`docker stop <container_id>`

### 296. Start a container.
`docker start <container_id>`

### 297. Restart a container.
`docker restart <container_id>`

### 298. Remove a container.
`docker rm <container_id>`

### 299. Force remove a container.
`docker rm -f <container_id>`

### 300. Remove an image.
`docker rmi <image_id>`

### 301. View container logs.
`docker logs <container_id>`

### 302. Follow logs.
`docker logs -f <container_id>`

### 303. Enter a running container.
`docker exec -it <container_id> bash`

### 304. Inspect a container.
`docker inspect <container_id>`

### 305. See container resource usage.
`docker stats`

### 306. See processes inside a container.
`docker top <container_id>`

### 307. Create a volume.
`docker volume create <vol_name>`

### 308. List volumes.
`docker volume ls`

### 309. Create a network.
`docker network create <net_name>`

### 310. List networks.
`docker network ls`

### 311. Remove a network.
`docker network rm <net_name>`

### 312. Remove unused Docker resources.
`docker system prune -a --volumes`

---

# 🧠 PART 18 — Explain This Command

### 313. `docker run -d -p 6000:6789 redis`
Runs a Redis container in background (`-d`), mapping host port `6000` to container port `6789`.

---

### 314. `docker run -it ubuntu bash`
Spawns an interactive (`-i`), terminal-attached (`-t`) container from `ubuntu` image running `/bin/bash` shell.

---

### 315. `docker run -d --name mydb -p 27017:27017 mongo`
Runs a detached MongoDB container named `mydb` mapping default MongoDB port `27017` on host to container.

---

### 316. `docker run -d --name mongodb -p 27017:27017 -v mongo-data:/data/db mongo`
Runs a detached MongoDB container named `mongodb`, mapping port `27017` and persisting database records to named volume `mongo-data`.

---

### 317. `docker exec -it mongodb bash`
Opens an interactive bash terminal inside the running container `mongodb`.

---

### 318. `docker build -t myapp:1.0 .`
Builds a Docker image tagged `myapp:1.0` using the current directory (`.`) as the build context and Dockerfile source.

---

### 319. `docker run -d --name app -p 8080:3000 myapp:1.0`
Spawns a detached container named `app` from image `myapp:1.0`, exposing container port `3000` on host port `8080`.

---

### 320. `docker run -d --network my-network --name backend my-backend`
Runs container `my-backend` named `backend` in detached mode attached to custom network `my-network`.

---

# 🏆 PART 19 — Final Mock Interview

### Question 1: What is Docker and why do we use it?
**Answer**: Docker is a containerization engine that packages code and dependencies into isolated containers. We use it to ensure environment consistency across development and production, optimize infrastructure resource utilization compared to VMs, and enable rapid deployment pipelines.

---

### Question 2: Image vs container?
**Answer**: An image is an immutable, read-only blueprint template. A container is a runnable, dynamic instance of an image executing isolated on the kernel with a writable top filesystem layer.

---

### Question 3: Container vs VM?
**Answer**: VMs virtualize hardware and run complete guest operating systems via hypervisors. Containers virtualize the operating system, sharing the host Linux kernel, making them significantly faster, lighter, and more resource-efficient.

---

### Question 4: Explain Docker architecture.
**Answer**: Docker uses a client-server architecture consisting of the Docker CLI client, the background Docker Daemon (`dockerd`), low-level runtimes (`containerd` & `runc`), storage drivers, virtual bridge networking, and remote image registries.

---

### Question 5: What happens when you run `docker run nginx`?
**Answer**: The CLI commands `dockerd` over a socket; `dockerd` checks/pulls the `nginx` image, creates a container layer, allocates IP network interfaces, invokes `containerd` and `runc` to set up namespaces/cgroups, and executes Nginx as PID 1.

---

### Question 6: Explain `docker run -d -p 8080:80 nginx`.
**Answer**: Starts Nginx in detached background mode (`-d`), binding host port `8080` to container port `80`.

---

### Question 7: What is a Dockerfile?
**Answer**: A text configuration script containing sequential build instructions used to automate creation of custom Docker images.

---

### Question 8: Explain instructions: `FROM`, `RUN`, `COPY`, `CMD`, `ENTRYPOINT`, `EXPOSE`, `WORKDIR`.
**Answer**:
* `FROM`: Specifies base image.
* `RUN`: Executes build-time commands and commits image layers.
* `COPY`: Copies files from build context into container image layer.
* `CMD`: Provides default runtime arguments.
* `ENTRYPOINT`: Specifies non-overridable default execution binary.
* `EXPOSE`: Documents container port bindings.
* `WORKDIR`: Sets current working directory path for commands.

---

### Question 9: What are Docker image layers?
**Answer**: Read-only filesystem diffs stacked using union filesystems (Overlay2) generated by Dockerfile instructions.

---

### Question 10: What is Docker build cache?
**Answer**: A performance feature where Docker reuses unchanged existing build layers from local storage during compilation.

---

### Question 11: What is a Docker volume?
**Answer**: Host storage managed completely by Docker (`/var/lib/docker/volumes/`) used for persistent container data storage.

---

### Question 12: Volume vs bind mount?
**Answer**: Volumes are managed by Docker in an isolated path and are portable. Bind mounts explicitly map user-selected host directory paths into containers.

---

### Question 13: How do containers communicate?
**Answer**: Via virtual network interfaces. On custom bridge networks, they use internal DNS to resolve container names.

---

### Question 14: What is Docker Compose?
**Answer**: A declarative orchestration tool using `compose.yaml` to define and run multi-container applications.

---

### Question 15: Docker vs Docker Compose?
**Answer**: Docker manages single containers manually via CLI. Compose manages multi-container application stacks declaratively.

---

### Question 16: How would you run a backend + MongoDB using Docker Compose?
**Answer**: Define `backend` and `mongodb` services in `compose.yaml`, connect them on a shared bridge network, set environment variables (`MONGO_URI=mongodb://mongodb:27017`), and run `docker compose up -d`.

---

### Question 17: Why can't one container connect to another using `localhost`?
**Answer**: `localhost` inside a container resolves only to its own isolated loopback network interface.

---

### Question 18: Container keeps crashing. How do you debug it?
**Answer**: Run `docker logs <id>` to inspect exceptions, check exit codes via `docker inspect`, verify command syntax in `CMD`, and test interactively with `docker run -it --entrypoint sh <image>`.

---

### Question 19: Application not accessible from browser. How to troubleshoot?
**Answer**: Check port mapping (`docker ps`), ensure host ports aren't blocked by firewalls, and verify that the containerized application binds to `0.0.0.0`.

---

### Question 20: Database loses all data after container deletion. Why and how to fix?
**Answer**: Data was stored on the transient container writable layer. Fix it by mounting a persistent Docker volume to the database data directory (`-v db_data:/var/lib/mysql`).
