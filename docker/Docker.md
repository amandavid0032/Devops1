# 🐳 Docker Fundamentals — Containers & Docker

> **Goal:** Understand what Docker and Docker containers are before moving to images, commands, networking, volumes, Docker Compose, etc.

---

# 🐳 What is Docker?

**Docker is a platform used to build, package, distribute, and run applications in containers.**

In simple words:

> 🐳 **Docker allows us to package an application and everything it needs into a container so it can run consistently in different environments.**

For example, an application may require:

```text
PHP 8.3
Composer
Laravel
PHP extensions
Configuration
Application code
```

Docker helps us create a consistent environment for that application.

### Simple idea

```text
👨‍💻 Developer
     │
     │ builds application
     ↓
🐳 Docker
     │
     ↓
📦 Container
     │
     ↓
🚀 Application runs
```

---

# 📦 What is a Container?

A **container is an isolated environment where an application runs together with the things it needs to work.**

Another way to understand it:

> 📦 A container packages an application with its necessary dependencies and configuration so the application can run consistently.

A container can contain things such as:

```text
📦 Container
│
├── 💻 Application
├── 📚 Dependencies
├── ⚙️ Configuration
├── 🔧 Required libraries
└── 🏃 Runtime
```

For example:

```text
📦 Laravel Container
│
├── Laravel Application
├── PHP
├── Required PHP extensions
├── Composer dependencies
└── Configuration
```

The purpose is to give the application an **isolated and consistent environment**.

---

# 🚀 Why do we use Containers?

Containers make development and deployment more efficient.

Without containers, an application may depend heavily on the environment where it is running.

For example:

```text
💻 Developer Machine
PHP 8.3
Node 22
MySQL 8
```

But the production server might have:

```text
🖥️ Production Server
PHP 8.1
Node 20
MySQL 5.7
```

This can cause:

```text
❌ Version mismatch
❌ Missing dependency
❌ Different configuration
❌ Application works locally but fails on server
```

With containers:

```text
💻 Development
     │
     ↓
📦 Container
     │
     ↓
🖥️ Production
     │
     ↓
📦 Same Container Environment
```

This helps make the application environment more predictable.

---

# 📦 Container as a Package

A container can be thought of as a **portable package for running an application**.

```text
📦 Application
   +
📚 Dependencies
   +
⚙️ Configuration
   +
🔧 Runtime
   ↓
🐳 Container
```

Because the application environment is packaged, it can be moved between environments more easily.

For example:

```text
💻 Local Machine
       ↓
📦 Container
       ↓
☁️ Cloud Server
       ↓
🖥️ Production Server
```

---

# 🔒 What does "isolated" mean?

A container provides an isolated environment for an application.

For example, imagine two applications:

```text
📦 Container A
Laravel
PHP 8.3

📦 Container B
Node.js
Node 22
```

They can run separately without needing to install all their dependencies directly into the host environment.

Conceptually:

```text
                 🖥️ Host Machine
                       │
                🐳 Docker
             ┌─────────┴─────────┐
             │                   │
             ↓                   ↓
        📦 Container A      📦 Container B
        Laravel/PHP         Node.js
```

Containers are isolated from one another to a significant degree, while still being able to communicate when explicitly configured to do so.

---

# 📦 Are Containers Virtual Machines?

**No.**

A container is not the same thing as a Virtual Machine (VM).

### Virtual Machine

```text
🖥️ Physical Server
│
├── 🖥️ VM
│    ├── Guest Operating System
│    └── Application
│
└── 🖥️ VM
     ├── Guest Operating System
     └── Application
```

### Container

```text
🖥️ Host
│
└── 🐳 Docker
     │
     ├── 📦 Container
     │    └── Application
     │
     └── 📦 Container
          └── Application
```

Containers share the host operating system's kernel, rather than each containing a complete guest operating system like a typical VM.

This generally makes containers lighter and faster to start than full VMs.

---

# 🐳 What is Docker used for?

Docker is commonly used to:

* 📦 Package applications
* 🔧 Package dependencies
* 🚀 Run applications consistently
* 🧪 Create reproducible development environments
* 🚚 Move applications between environments
* ☁️ Deploy applications to servers/cloud platforms
* 📈 Run multiple isolated application workloads
* 🔄 Make deployment more predictable

---

# 🌍 Where do Containers Live?

A container exists on a **machine where a container runtime is running**.

For example:

```text
💻 Your Mac
   │
   └── 🐳 Docker
        │
        └── 📦 Container
```

Or on a server:

```text
🖥️ Production Server
   │
   └── 🐳 Docker
        │
        ├── 📦 Laravel Container
        ├── 📦 Nginx Container
        └── 📦 Redis Container
```

The container itself is running on that machine.

---

# 🌐 Where are Container Images Stored?

There is an important distinction:

> **Containers run on machines. Images are stored in registries/repositories and are used to create containers.**

A registry is a service for storing and distributing container images.

The general flow is:

```text
👨‍💻 Developer
      │
      ↓
🐳 Build Image
      │
      ↓
📦 Container Image
      │
      ↓
🌐 Container Registry
      │
      ↓
🖥️ Server
      │
      ↓
🐳 Docker
      │
      ↓
📦 Container
```

---

# 🗄️ Container Registry

A **container registry** is a service that stores and distributes container images.

Think of it as a place where Docker images can be uploaded and downloaded.

```text
🌐 Container Registry
│
├── 📦 Image A
├── 📦 Image B
├── 📦 Image C
└── 📦 Image D
```

A server can pull an image from the registry and use it to create a container.

---

# 🌍 Public Container Repositories

A **public repository** allows container images to be publicly accessible.

One major example is:

🐳 **Docker Hub**

Docker Hub provides public repositories where Docker images can be published and shared.

Example concept:

```text
🌐 Public Registry
        │
        ↓
🐳 Docker Hub
        │
        ├── 📦 nginx
        ├── 📦 mysql
        ├── 📦 redis
        └── 📦 many other images
```

Public images can be downloaded by users according to the repository's access and licensing conditions.

---

# 🔐 Private Container Repositories

A **private repository** restricts access to authorized users or systems.

This is useful when an organization has proprietary applications.

For example:

```text
🏢 Company
   │
   ↓
🔐 Private Registry
   │
   ├── 📦 company-api
   ├── 📦 company-web
   └── 📦 company-admin
```

Only authorized users, servers, or CI/CD systems can access these images.

Private registries are commonly used for:

* 🔒 Private company applications
* 🏢 Internal services
* 🔑 Proprietary software
* 🚀 Production deployments
* 🤖 CI/CD pipelines

---

# 🆚 Public vs Private Repository

|                | 🌍 Public Repository                 | 🔐 Private Repository       |
| -------------- | ------------------------------------ | --------------------------- |
| Access         | Publicly accessible                  | Restricted                  |
| Typical use    | Open-source/public images            | Company/internal images     |
| Authentication | May not be required for public pulls | Usually required            |
| Visibility     | Public                               | Limited to authorized users |
| Example        | Public Docker Hub repository         | Private company registry    |

---

# 🧠 Important Terminology

These terms should not be mixed up.

## 🐳 Docker

The platform/tool used to build, distribute, and run containers.

```text
🐳 Docker
   ↓
Build / Run / Manage
   ↓
📦 Containers
```

## 📦 Container

An isolated running environment/process for an application.

```text
📦 Container
   ↓
🚀 Application runs
```

## 🖼️ Container Image

A packaged, immutable template used to create containers.

```text
🖼️ Image
   ↓
Create
   ↓
📦 Container
```

## 🌐 Container Registry

A service used to store and distribute container images.

```text
🌐 Registry
   ↓
🖼️ Container Images
```

## 📁 Repository

A location within a registry where a particular image and its versions/tags are stored.

Conceptually:

```text
🌐 Registry
   │
   ├── 📁 repository-a
   │     ├── image:tag1
   │     └── image:tag2
   │
   └── 📁 repository-b
         ├── image:tag1
         └── image:tag2
```

---

# 🔄 Basic Docker Flow

At a high level, Docker works like this:

```text
👨‍💻 Application Source Code
          │
          ↓
🐳 Docker Build
          │
          ↓
🖼️ Container Image
          │
          ↓
🌐 Container Registry
          │
          ↓
🖥️ Server
          │
          ↓
🐳 Docker
          │
          ↓
📦 Container
          │
          ↓
🚀 Application
```

---

# ⭐ Most Important Mental Model

Remember this relationship:

```text
                 🐳 DOCKER
                     │
             builds / runs / manages
                     │
                     ↓
                🖼️ IMAGE
              "Blueprint"
                     │
              creates / starts
                     │
                     ↓
                📦 CONTAINER
             "Running instance"
                     │
                     ↓
                🚀 APPLICATION
```

And for storage/distribution:

```text
🖼️ IMAGE
   │
   ↓
🌐 CONTAINER REGISTRY
   │
   ├── 🌍 Public Repository
   │
   └── 🔐 Private Repository
```

---

