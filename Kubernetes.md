# Kubernetes (K8s) — Architecture Notes

## What is Kubernetes?

- Open source container orchestration tool
- Developed by Google
- Helps you manage containerized applications in different deployment environments

---

# The need for a container orchestration tool

- Trend from monolith to microservices
- Increased usage of containers
- Demand for a proper way of managing hundreds of containers

## What features do orchestration tools offer?

- High availability or no downtime
- Scalability or high performance
- Disaster recovery — backup or restore

---

# Components of K8s

## 1. Pod

- Smallest unit of K8s
- Abstraction over container
- Usually 1 application per pod
- Each pod has its own IP address
- New IP address on re-creation

### Pod example

```text
+----------------------+
|        POD           |
|                      |
|  +----------------+  |
|  |    my app      |  |
|  |   container    |  |
|  +----------------+  |
|                      |
|        DB            |
+----------------------+
```

A Pod is the smallest unit that Kubernetes works with. A Pod can contain one or more containers. In the simple example above, the application is running inside a container that is inside the Pod.

---

# Work machine in K8s cluster

A work machine in a Kubernetes cluster is called a **Node**.

- Each node has multiple Pods on it.
- 3 processes must be installed on every node.
- Worker nodes do the actual work.

## 3 node processes

1. Kubelet
2. Kube-proxy
3. Container runtime

---

## Kubelet

- Kubelet interacts with both the container and node.
- Kubelet starts the Pod with the container inside.

---

## Kube-proxy

- Communication happens via Services.
- Kube-proxy forwards the request.

---

## Container Runtime

The container runtime is responsible for running the containers on the node.

---

# Worker Node example

```text
                 WORKER NODE
+------------------------------------------+
|                                          |
|   +----------------+   +--------------+ |
|   |      Pod       |   |     Pod      | |
|   |                |   |              | |
|   |    my app      |   |      DB      | |
|   |                |   |              | |
|   +----------------+   +--------------+ |
|                                          |
|   +------------------------------------+ |
|   |          Container Runtime         | |
|   +------------------------------------+ |
|                                          |
|   +----------------+  +---------------+ |
|   |    Kubelet     |  |  Kube-proxy   | |
|   +----------------+  +---------------+ |
|                                          |
+------------------------------------------+
```

---

# How do you interact with the cluster?

- How to schedule Pod?
- How to monitor?
- How to re-schedule/re-start Pod?
- How to join a new node?

All this managing processes are done by the **Master Node**.

---

# Master Processes

1. API Server
2. Scheduler
3. Controller Manager
4. etcd

---

# API Server

The API Server is the entry point into the Kubernetes cluster.

```text
Some request
     |
     v
+-------------+
| API Server  |
+-------------+
     |
     v
Validates request
     |
     v
Other process
     |
     v
    Pod
```

### Important point

There is only **one entry point into the cluster**: the API Server.

---

# Scheduling a new Pod

```text
Schedule new Pod
       |
       v
+-------------+
| API Server  |
+-------------+
       |
       v
+-------------+
|  Scheduler  |
+-------------+
       |
       v
Where to put the Pod?
       |
       v
+-------------+
|    Node     |
+-------------+
       |
       v
   Kubelet
       |
       v
     Pod
```

## Scheduler

- Scheduler just decides on which node a new Pod should be scheduled.

After the Pod is assigned to a node, the Kubelet on that node makes sure the Pod is started.

---

# Controller Manager

The Controller Manager:

- Detects cluster state changes.

---

# etcd

## etcd is the cluster brain!

- Cluster changes get stored in the key-value store.
- etcd is the key-value store used to store Kubernetes cluster state.

### What information is etcd concerned with?

```text
+-----------------------------+
|            etcd             |
|      Key-Value Store        |
+-----------------------------+
             |
             +---- What resources are available?
             |
             +---- Did the cluster state change?
             |
             +---- Is the cluster healthy?
```

### Important

**Application data is not stored in etcd!**

etcd stores the Kubernetes **cluster state/configuration information**, not the application's actual business data.

---

# Master Node Architecture

```text
                         CLIENT
                           |
                     Update / Query
                           |
                           v
                 +-------------------+
                 |    API SERVER     |
                 +-------------------+
                    |      |      |
                    |      |      |
                    v      v      v
              Scheduler  Controller  etcd
                         Manager       |
                           |           |
                           |     Key-Value Store
                           |
                           v
                    Cluster State
                           |
                           v
              +------------------------+
              |      Worker Nodes      |
              +------------------------+
```

---

# Master + Worker Nodes

```text
                         CLIENT
                           |
                           v
                    +-------------+
                    | API Server  |
                    +-------------+
                           |
             +-------------+-------------+
             |             |             |
             v             v             v
        Scheduler    Controller       etcd
                     Manager
             |
             v
      Decides where Pod
      should be scheduled
             |
             v
   +-------------------+      +-------------------+
   |     Master 1      |      |     Master 2      |
   |                   |      |                   |
   | API Server        |      | API Server        |
   | Scheduler         |      | Scheduler         |
   | Controller Mgr    |      | Controller Mgr    |
   | etcd              |      | etcd              |
   +-------------------+      +-------------------+

             Cluster
                |
       +--------+--------+
       |                 |
       v                 v
+-------------+   +-------------+
|   Node 1    |   |   Node 2    |
|             |   |             |
|    Pods     |   |    Pods     |
|             |   |             |
|  Kubelet    |   |  Kubelet    |
| Kube-proxy  |   | Kube-proxy  |
| Container   |   | Container   |
|  Runtime    |   |  Runtime    |
+-------------+   +-------------+
```

---

# Complete flow example

Suppose you want to create a new Pod.

```text
Client
  |
  | Request to create Pod
  v
API Server
  |
  | validates request
  v
Scheduler
  |
  | decides which Node
  v
Worker Node
  |
  v
Kubelet
  |
  v
Container Runtime
  |
  v
Container
  |
  v
Pod
```

At the same time, the cluster state is stored in **etcd**:

```text
                Kubernetes Cluster
                       |
          +------------+------------+
          |                         |
          v                         v
     Actual workload           Cluster state
          |                         |
          v                         v
     Pods/Containers              etcd
```

---

# Quick Revision

## Kubernetes

- Open source container orchestration tool
- Developed by Google
- Manages containerized applications in different deployment environments

## Why orchestration?

- Monolith → Microservices
- More containers
- Need to manage hundreds of containers
- High availability / no downtime
- Scalability / high performance
- Disaster recovery / backup / restore

## Pod

- Smallest unit of Kubernetes
- Abstraction over container
- Usually 1 application per Pod
- Each Pod has its own IP address
- New IP address on re-creation

## Worker Node

3 important processes:

1. Kubelet
2. Kube-proxy
3. Container Runtime

## Master Node

Main processes:

1. API Server
2. Scheduler
3. Controller Manager
4. etcd

## Remember

```text
API Server      -> Entry point into the cluster
Scheduler       -> Decides where a new Pod should run
Controller Mgr  -> Detects cluster state changes
etcd            -> Cluster state key-value store
Kubelet         -> Manages Pods/containers on a node
Kube-proxy      -> Helps forward network requests
Runtime         -> Runs containers
Pod             -> Smallest unit of Kubernetes
```
::: ​​