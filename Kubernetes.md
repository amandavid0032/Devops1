# Kubernetes — Minikube, kubectl, Deployments & YAML

# 1. Local Kubernetes Setup

When learning Kubernetes, it is not necessary to start with a large cloud cluster.

We can create a **Kubernetes cluster locally** on our own computer using **Minikube**.

The two important tools are:

```text
Minikube
   +
kubectl
```

---

# 2. What is Minikube?

**Minikube** is a tool that runs a small, local Kubernetes cluster on your computer.

It is mainly used for:

- Learning Kubernetes
- Development
- Testing
- Experimenting with Kubernetes commands
- Running applications locally

### Simple Definition

> **Minikube creates and runs a Kubernetes cluster locally on your machine.**

Instead of having:

```text
Your Computer
      |
      v
Internet
      |
      v
Cloud Kubernetes Cluster
```

you can have:

```text
Your Computer
      |
      v
Minikube
      |
      v
Local Kubernetes Cluster
```

---

# 3. Minikube Cluster

A simplified view of a Minikube cluster:

```text
+---------------------------------------+
|          Minikube Kubernetes          |
|              Cluster                  |
|                                       |
|   +-------------------------------+   |
|   |            Node               |   |
|   |                               |   |
|   |   +-------+   +-------+       |   |
|   |   | Pod 1 |   | Pod 2 |       |   |
|   |   +-------+   +-------+       |   |
|   |                               |   |
|   +-------------------------------+   |
|                                       |
+---------------------------------------+
```

Minikube can run the Kubernetes control-plane components and workload components locally.

---

# 4. What is kubectl?

**kubectl** is the command-line tool used to interact with a Kubernetes cluster.

### Simple Definition

> **kubectl is the CLI tool that allows us to communicate with and manage a Kubernetes cluster.**

For example:

```bash
kubectl get pods
```

This asks Kubernetes:

> "Show me the Pods running in the cluster."

---

# 5. How kubectl Communicates With Kubernetes

A simplified flow is:

```text
You
 |
 | kubectl command
 v
API Server
 |
 +--------> etcd
 |
 +--------> Scheduler
 |
 +--------> Controller Manager
 |
 v
Cluster resources
```

The important thing to remember is:

> **kubectl normally communicates with the Kubernetes API Server, not directly with Pods or Nodes.**

---

# 6. Kubernetes Control Plane

The Kubernetes control plane contains the components responsible for managing the cluster.

The major components are:

```text
Control Plane
 |
 +-- API Server
 |
 +-- Scheduler
 |
 +-- Controller Manager
 |
 +-- etcd
```

---

# 7. API Server

The **API Server** is the main entry point into the Kubernetes cluster.

It exposes the Kubernetes API.

Different clients can communicate with the API Server:

```text
             API Server
            /    |     \
           /     |      \
        kubectl  UI      API
```

### Clients can include:

1. **kubectl / CLI**
2. Kubernetes dashboards or UI tools
3. Other applications using the Kubernetes API

For example:

```bash
kubectl get pods
```

The flow is approximately:

```text
kubectl
   |
   | API request
   v
API Server
   |
   v
Kubernetes
```

---

# 8. etcd

**etcd** is a distributed key-value store used by Kubernetes to store important cluster data.

It stores the Kubernetes cluster's persistent state/configuration information.

For example, Kubernetes needs to keep track of things such as:

- Cluster configuration
- Deployments
- Pods
- Services
- Secrets
- ConfigMaps
- Other Kubernetes objects and their desired state

### Simple Definition

> **etcd is the key-value database that stores Kubernetes cluster state.**

Think of it as the cluster's **memory/database for its state**.

```text
                 Kubernetes
                     |
                  API Server
                     |
                     v
                   etcd
                     |
          +----------+----------+
          |                     |
      Cluster State        Configuration
```

### Important

Do not think of etcd as storing the actual application data of your database.

For example:

```text
MySQL customer data
MongoDB documents
Application uploaded files
```

are normally stored elsewhere using persistent storage.

etcd stores **Kubernetes state**, not your application's business data.

---

# 9. Why is etcd Important?

Suppose you create a Deployment:

```bash
kubectl create deployment nginx-depl --image=nginx
```

Kubernetes needs to remember the desired state.

For example:

```text
Deployment:
    Name = nginx-depl
    Image = nginx
    Replicas = ...
```

That Kubernetes state is persisted through etcd.

---

# 10. Scheduler

The **Scheduler** decides which Node should run a newly created Pod.

For example:

```text
New Pod
   |
   v
Scheduler
   |
   +------> Node 1
   |
   +------> Node 2
   |
   +------> Node 3
```

The Scheduler considers things such as:

- Available resources
- CPU
- Memory
- Scheduling constraints
- Node requirements
- Other scheduling rules

### Simple Definition

> **Scheduler decides where a Pod should run.**

---

# 11. Controller Manager

The **Controller Manager** runs controllers that continuously compare the desired state with the actual state and take actions to make them match.

For example:

Desired:

```text
3 Pods
```

Actual:

```text
2 Pods
```

A controller can detect the difference and work toward:

```text
Desired: 3 Pods
Actual:  3 Pods
```

This is one of the key ideas behind Kubernetes.

---

# 12. Worker Node

A worker Node is where application workloads run.

A simplified Node contains:

```text
+----------------------------------+
|              Node                |
|                                  |
|   +-------+  +-------+           |
|   | Pod 1 |  | Pod 2 |           |
|   +-------+  +-------+           |
|                                  |
|   Container Runtime              |
|   kubelet                         |
|   Networking components           |
|                                  |
+----------------------------------+
```

### Main idea

> **Control Plane manages the cluster; worker Nodes run application workloads.**

---

# 13. Kubernetes Architecture

A simplified architecture:

```text
                         Kubernetes Cluster
                                |
             +------------------+------------------+
             |                                     |
       Control Plane                           Worker Node
             |                                     |
      +------+------+                    +---------+---------+
      |      |      |                    |         |         |
   API     etcd  Scheduler           Pod       Pod       Pod
   Server         Controller
                  Manager
```

---

# 14. Where Does Kubernetes Get Status Data?

A very important concept from the diagram:

```text
                 Kubernetes Control Plane
                         |
                         v
                    API Server
                         |
                         v
                       etcd
```

**etcd stores the persistent state of Kubernetes objects.**

For example, Kubernetes can keep track of the state/configuration associated with:

```text
Deployment
Pod
Service
Secret
ConfigMap
Node
etc.
```

The API Server is responsible for providing access to this cluster state through the Kubernetes API.

### Remember

```text
kubectl
   |
   v
API Server
   |
   v
etcd
```

---

# 15. Pod — Smallest Deployable Unit

A **Pod is the smallest deployable unit in Kubernetes.**

A Pod can contain one or more containers.

Usually, especially for beginners:

```text
1 Pod
  |
  +---- 1 Application Container
```

But this is also possible:

```text
1 Pod
 |
 +---- Application Container
 |
 +---- Sidecar Container
```

Containers inside the same Pod share the Pod's network namespace and can communicate with each other using `localhost`.

---

# 16. Pod IP Address

Each Pod normally receives its own IP address.

Example:

```text
Pod 1 → 10.244.0.5
Pod 2 → 10.244.0.6
Pod 3 → 10.244.0.7
```

But Pods are **ephemeral**.

If a Pod is deleted and recreated:

```text
Old Pod
IP = 10.244.0.5
     |
     v
   Deleted
     |
     v
New Pod
IP = 10.244.0.12
```

The IP can change.

Therefore, applications should generally not depend directly on Pod IP addresses.

Kubernetes **Services** provide stable networking for applications.

---

# 17. Deployment

Now we come to one of the most important concepts.

Although a Pod is the smallest deployable unit, we usually **do not manage Pods directly** for normal application deployments.

Instead, we use higher-level Kubernetes objects such as a **Deployment**.

Think of a Deployment as a higher-level abstraction for managing application Pods.

```text
Deployment
     |
     v
ReplicaSet
     |
     v
Pods
     |
     v
Containers
```

---

# 18. Layers of Abstraction

This is one of the most important diagrams to remember:

```text
Deployment
     |
     | manages
     v
ReplicaSet
     |
     | manages
     v
Pod
     |
     | contains
     v
Container
     |
     | runs
     v
Application
```

### Responsibilities

**Deployment**

Manages the desired state of the application and manages ReplicaSets.

↓

**ReplicaSet**

Ensures the required number of Pod replicas exist.

↓

**Pod**

Provides the environment in which containers run.

↓

**Container**

Runs the actual application.

---

# 19. Creating a Deployment

Example command:

```bash
kubectl create deployment nginx-depl --image=nginx
```

Let's break this down.

```text
kubectl
```

Command-line Kubernetes client.

```text
create deployment
```

Create a Deployment.

```text
nginx-depl
```

Name of the Deployment.

```text
--image=nginx
```

Use the `nginx` container image.

---

# 20. What Happens After Creating a Deployment?

When you run:

```bash
kubectl create deployment nginx-depl --image=nginx
```

Kubernetes creates a hierarchy similar to:

```text
Deployment
nginx-depl
     |
     v
ReplicaSet
nginx-depl-xxxxxxxx
     |
     v
Pod
nginx-depl-xxxxxxxx-xxxxx
     |
     v
Container
nginx
```

You asked Kubernetes to create a Deployment.

You did **not** manually create the ReplicaSet and Pod.

Kubernetes creates and manages those lower-level objects for you.

---

# 21. ReplicaSet

A **ReplicaSet** makes sure the desired number of Pod replicas are running.

For example:

```text
ReplicaSet
    |
    +---- Pod 1
    +---- Pod 2
    +---- Pod 3
```

If the desired number is 3:

```text
Desired = 3
Actual  = 2
```

The ReplicaSet works toward:

```text
Desired = 3
Actual  = 3
```

---

# 22. Why Don't We Usually Create ReplicaSets Directly?

Because a Deployment provides a higher-level abstraction.

A Deployment manages ReplicaSets and provides additional functionality such as:

- Rolling updates
- Rollbacks
- Version management
- Scaling
- Managing the desired state of the application

Therefore, for normal applications:

```text
Deployment
    ↓
ReplicaSet
    ↓
Pod
```

is the common pattern.

---

# 23. Everything Below Deployment is Managed by Kubernetes

When you create a Deployment:

```bash
kubectl create deployment nginx-depl --image=nginx
```

you don't normally manually create:

```text
ReplicaSet
Pod
Container
```

Kubernetes handles these lower-level resources based on the desired state.

You declare what you want:

```text
"I want an nginx application running."
```

Kubernetes works to make the actual cluster match that desired state.

---

# 24. Useful kubectl Commands

## Check Nodes

```bash
kubectl get nodes
```

Shows Nodes in the cluster.

---

## Check Pods

```bash
kubectl get pods
```

Shows Pods.

---

## Check Deployments

```bash
kubectl get deployments
```

or:

```bash
kubectl get deployment
```

---

## Check ReplicaSets

```bash
kubectl get replicasets
```

or:

```bash
kubectl get rs
```

---

## Check Everything

```bash
kubectl get all
```

Useful for getting a quick overview of common Kubernetes resources in the current namespace.

---

# 25. View Pod Logs

If the Pod name is:

```text
nginx-depl-569bd7dcf9-rqvwb
```

you can run:

```bash
kubectl logs nginx-depl-569bd7dcf9-rqvwb
```

This displays the container's logs.

---

# 26. Describe a Pod

To get detailed information about a Pod:

```bash
kubectl describe pod nginx-depl-569bd7dcf9-rqvwb
```

This can show:

- Pod details
- Node
- IP address
- Containers
- Images
- Events
- Conditions
- Mounts
- Scheduling information

### Important Correction

The correct syntax is:

```bash
kubectl describe pod <pod-name>
```

not simply:

```bash
kubectl describe <pod-name>
```

You can also describe a Deployment:

```bash
kubectl describe deployment nginx-depl
```

---

# 27. Delete a Deployment

If you created:

```bash
kubectl create deployment nginx-depl --image=nginx
```

delete it using:

```bash
kubectl delete deployment nginx-depl
```

### Important

You delete the **Deployment by its Deployment name**:

```text
nginx-depl
```

not the generated Pod name.

When a Deployment is deleted, Kubernetes also removes the ReplicaSet and Pods managed by that Deployment.

---

# 28. kubectl apply

Instead of creating resources using long commands, Kubernetes commonly uses YAML configuration files.

For example:

```bash
kubectl apply -f nginx-deployment.yml
```

The `-f` means:

```text
-f = file
```

So:

```bash
kubectl apply -f nginx-deployment.yml
```

means:

> Apply the configuration described in this YAML file to the Kubernetes cluster.

---

# 29. What Happens if You Run `kubectl apply` Again?

Suppose you have:

```yaml
replicas: 2
```

and apply it:

```bash
kubectl apply -f nginx-deployment.yml
```

Kubernetes creates or updates the resource so that the cluster moves toward the configuration in the file.

If you change:

```yaml
replicas: 2
```

to:

```yaml
replicas: 4
```

and run:

```bash
kubectl apply -f nginx-deployment.yml
```

Kubernetes detects the desired configuration and updates the Deployment accordingly.

### Simple Idea

```text
YAML
 |
 | kubectl apply
 v
Kubernetes
 |
 v
Create or update resource
```

So yes:

> **`kubectl apply` is commonly used to create resources if they don't exist and update them when the configuration changes.**

---

# 30. Kubernetes YAML Configuration

Instead of running commands such as:

```bash
kubectl create deployment nginx-depl --image=nginx
```

we can define Kubernetes resources using YAML.

Example:

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment

spec:
  replicas: 2

  selector:
    matchLabels:
      app: nginx

  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
        - name: nginx
          image: nginx
```

Then:

```bash
kubectl apply -f nginx-deployment.yml
```

---

# 31. Main Parts of a Kubernetes YAML File

A Kubernetes manifest commonly contains:

```yaml
apiVersion:
kind:
metadata:
spec:
```

Let's understand them.

---

## apiVersion

Defines which Kubernetes API version should be used for the resource.

Example:

```yaml
apiVersion: apps/v1
```

---

## kind

Defines what type of Kubernetes resource you are creating.

Example:

```yaml
kind: Deployment
```

Other examples:

```yaml
kind: Pod
kind: Service
kind: ConfigMap
kind: Secret
```

---

## metadata

Contains identifying information about the resource.

Example:

```yaml
metadata:
  name: nginx-deployment
```

It can also contain labels and annotations.

Example:

```yaml
metadata:
  name: nginx-deployment
  labels:
    app: nginx
```

---

## spec

`spec` describes the **desired state** of the resource.

For example:

```yaml
spec:
  replicas: 3
```

means:

> I want 3 replicas of this application.

Another example:

```yaml
containers:
  - name: nginx
    image: nginx
```

means:

> Run an nginx container.

---

# 32. What About `status`?

You may hear:

> "Every Kubernetes configuration has metadata, spec, and status."

This needs an important clarification.

A Kubernetes object has a structure that includes things such as:

```text
apiVersion
kind
metadata
spec
status
```

However, **`status` is generally not something you manually write in your normal YAML manifest**.

You normally define:

```text
apiVersion
kind
metadata
spec
```

Kubernetes/controllers populate and update:

```text
status
```

based on what is actually happening in the cluster.

---

# 33. Desired State vs Actual State

This is one of the most important Kubernetes concepts.

Suppose your YAML says:

```yaml
spec:
  replicas: 3
```

This means:

```text
Desired State = 3 Pods
```

But suppose only 2 Pods are currently running:

```text
Desired State = 3
Actual State  = 2
```

Kubernetes controllers continuously work to make:

```text
Desired State
      =
Actual State
```

Eventually:

```text
Desired State = 3
Actual State  = 3
```

---

# 34. `spec` vs `status`

Think of it like this:

```text
             Kubernetes Object
                    |
          +---------+---------+
          |                   |
         spec               status
          |                   |
      What I want          What is
                           happening
```

### `spec`

You say:

> "I want 3 Pods."

### `status`

Kubernetes reports something like:

> "3 Pods are currently available."

So:

```text
spec   → Desired state
status → Observed/current state
```

---

# 35. YAML and Deployment → Pod Connection

A Deployment YAML contains a **Pod template**.

For example:

```yaml
spec:
  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
        - name: nginx
          image: nginx
```

This section:

```yaml
spec:
  template:
```

describes the Pods that the Deployment should create.

The relationship is:

```text
Deployment
     |
     | Pod Template
     v
ReplicaSet
     |
     v
Pods
```

---

# 36. Labels and Selectors

Labels are very important in Kubernetes.

Example:

```yaml
labels:
  app: nginx
```

A Deployment can use a selector:

```yaml
selector:
  matchLabels:
    app: nginx
```

This tells Kubernetes which Pods belong to that workload.

Later, Services also use selectors to find the appropriate Pods.

For example:

```text
             Service
                |
                | selector:
                | app=nginx
                v
        +-------+-------+
        |       |       |
      Pod 1   Pod 2   Pod 3
      app=    app=    app=
      nginx   nginx   nginx
```

This is how Kubernetes can connect a Service to the appropriate Pods.

---

# 37. Deployment + Service + Pod

A common Kubernetes application architecture looks like:

```text
                    User
                     |
                     v
                  Service
                     |
            +--------+--------+
            |        |        |
           Pod      Pod      Pod
            |        |        |
         Container Container Container
            |        |        |
         Application Application Application
```

The Deployment manages the Pods through ReplicaSets:

```text
                Deployment
                     |
                     v
                ReplicaSet
                     |
            +--------+--------+
            |        |        |
           Pod      Pod      Pod
```

The Service provides stable networking:

```text
                Service
                   |
          +--------+--------+
          |        |        |
         Pod      Pod      Pod
```

So Deployment and Service have different responsibilities:

```text
Deployment → manages application Pods
Service    → provides stable network access to Pods
```

---

# 38. Important Kubernetes Abstraction

Memorize this:

```text
Deployment
    ↓
ReplicaSet
    ↓
Pod
    ↓
Container
    ↓
Application
```

And separately:

```text
Service
    ↓
Provides stable network access
    ↓
to selected Pods
```

---

# 39. Complete Flow

Let's connect everything together.

You run:

```bash
kubectl create deployment nginx-depl --image=nginx
```

The simplified flow is:

```text
You
 |
 | kubectl
 v
API Server
 |
 +------> etcd
 |
 v
Deployment
 |
 v
ReplicaSet
 |
 v
Pod
 |
 v
Container
 |
 v
Nginx Application
```

The Scheduler helps decide where the Pod should run:

```text
                API Server
                    |
                    v
                 Pod needs
                 scheduling
                    |
                    v
                Scheduler
                    |
                    v
                  Node
                    |
                    v
                   Pod
```

The kubelet on the Node then works with the container runtime to ensure the Pod's containers are running.

---

# 40. Minikube + kubectl Complete Picture

When learning locally:

```text
                 Your Computer
                       |
             +---------+---------+
             |                   |
          kubectl             Minikube
             |                   |
             |                   v
             |             Kubernetes Cluster
             |                   |
             |            +------+------+
             |            |             |
             +---------> API Server    etcd
                          |
                 +--------+--------+
                 |        |        |
             Scheduler Controller  ...
                       Manager
                          |
                          v
                        Node
                          |
                    +-----+-----+
                    |     |     |
                   Pod   Pod   Pod
                    |     |     |
                Container ...
```

---

# 41. Basic Minikube Commands

Start a local Kubernetes cluster:

```bash
minikube start
```

Check Minikube status:

```bash
minikube status
```

Open the Kubernetes dashboard:

```bash
minikube dashboard
```

Stop the cluster:

```bash
minikube stop
```

Delete the Minikube cluster:

```bash
minikube delete
```

Check Nodes:

```bash
kubectl get nodes
```

---

# 42. Basic kubectl Learning Flow

After starting Minikube:

```bash
minikube start
```

Check the Node:

```bash
kubectl get nodes
```

Create a Deployment:

```bash
kubectl create deployment nginx-depl --image=nginx
```

Check Deployment:

```bash
kubectl get deployment
```

Check ReplicaSet:

```bash
kubectl get replicaset
```

Check Pods:

```bash
kubectl get pods
```

Check everything:

```bash
kubectl get all
```

Check Pod details:

```bash
kubectl describe pod <pod-name>
```

Check logs:

```bash
kubectl logs <pod-name>
```

Delete Deployment:

```bash
kubectl delete deployment nginx-depl
```

---

# 43. Most Important Interview Concepts

## What is Minikube?

> Minikube is a tool used to run a Kubernetes cluster locally, mainly for learning, development, and testing.

---

## What is kubectl?

> kubectl is the Kubernetes command-line interface used to communicate with and manage a Kubernetes cluster through the Kubernetes API Server.

---

## What is etcd?

> etcd is a distributed key-value store that persists Kubernetes cluster state and configuration data.

---

## What is the API Server?

> The Kubernetes API Server is the central entry point to the Kubernetes API. kubectl and other clients communicate with the cluster through it.

---

## What is a Pod?

> A Pod is the smallest deployable unit in Kubernetes and contains one or more containers.

---

## What is a ReplicaSet?

> A ReplicaSet ensures that the desired number of Pod replicas are running.

---

## What is a Deployment?

> A Deployment is a higher-level Kubernetes resource that manages ReplicaSets and provides features such as rolling updates, rollbacks, and scaling.

---

# 44. Final Mental Model

If you remember only one diagram from this section, remember this:

```text
                         USER
                           |
                           | kubectl
                           v
                    +-------------+
                    | API SERVER  |
                    +-------------+
                      |    |    |
                      |    |    +----------+
                      |    |               |
                      v    v               v
                    etcd Scheduler   Controller Manager
                           |
                           v
                         Node
                           |
                           v
                      Deployment
                           |
                           v
                      ReplicaSet
                           |
                    +------+------+
                    |      |      |
                   Pod    Pod    Pod
                    |      |      |
                Container Container Container
                    |      |      |
                 Application/Application/Application
```

### The core idea:

```text
Minikube
   ↓
Runs Kubernetes locally

kubectl
   ↓
Talks to API Server

API Server
   ↓
Central entry point to Kubernetes

etcd
   ↓
Stores Kubernetes cluster state

Scheduler
   ↓
Decides where Pods should run

Controller Manager
   ↓
Works to maintain desired state

Deployment
   ↓
Manages ReplicaSets

ReplicaSet
   ↓
Maintains Pod replicas

Pod
   ↓
Smallest deployable unit

Container
   ↓
Runs the application
```

## Golden Rule

> **You declare the desired state, and Kubernetes continuously works to make the actual state match it.**

For example:

```yaml
spec:
  replicas: 3
```

means:

```text
"I want 3 replicas."
```

Kubernetes then works to maintain:

```text
Desired = 3
Actual  = 3
```

If one Pod crashes:

```text
Desired = 3
Actual  = 2
       ↓
Kubernetes detects the difference
       ↓
Replacement Pod
       ↓
Desired = 3
Actual  = 3
```

That **desired-state + reconciliation** concept is at the heart of Kubernetes.





Name:                     mongodb-service
Namespace:                default
Labels:                   <none>
Annotations:              <none>
Selector:                 app=mongodb
Type:                     ClusterIP
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.96.118.203
IPs:                      10.96.118.203
Port:                     <unset>  27017/TCP
TargetPort:               27017/TCP
Endpoints:                10.244.0.5:27017
Session Affinity:         None
Internal Traffic Policy:  Cluster
Events:                   <none>
aman@ITs-MacBook-Pro devops % 




aman@ITs-MacBook-Pro yaml % kubectl get namespace 
NAME              STATUS   AGE
default           Active   28h
kube-node-lease   Active   28h
kube-public       Active   28h
kube-system       Active   28h
aman@ITs-MacBook-Pro yaml % kubectl cluster-info 
Kubernetes control plane is running at https://127.0.0.1:59466
CoreDNS is running at https://127.0.0.1:59466/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
aman@ITs-MacBook-Pro yaml % 



k8s comoponets 


kubernetes namespaces explained 
 what is a namespace?
 1.organise resources in namespace
 2.virtual cluster inside a cluster

4 namespaces per default 

kubernetes-dashboard only with minikube 

kube-system
don't create or modify in kube-system 
system-processes
master and kubectl process 


kube-public
publicely  accessible data 
a configmap,which contains cluster information 




kube-node-lease   

heartbeats of nodes
each node has associated lease object in name space 

 what are the use cases?


 how namespaces work and how to use it 


 
          kubernets cluster
       [                    ]
       [   kube-system      ]
       [                    ]
       [                    ]
       [   kube-public      ]
       [                    ]
       [                    ]

how to make it an external service ?
-type    "loadblancer"
assings service an external ip address and so accepts external requests 