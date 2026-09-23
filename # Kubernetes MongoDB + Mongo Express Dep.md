# Kubernetes MongoDB + Mongo Express Deployment --- Complete Explanation

This guide explains the complete `mongodb-deployment.yaml` file from top
to bottom in one place.

------------------------------------------------------------------------

# 1. Complete YAML File

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb
          image: mongo
          ports:
            - containerPort: 27017
          env:
            - name: MONGO_INITDB_ROOT_USERNAME
              value: admin
            - name: MONGO_INITDB_ROOT_PASSWORD
              value: password

---
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  selector:
    app: mongodb
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo-express
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo-express
  template:
    metadata:
      labels:
        app: mongo-express
    spec:
      containers:
        - name: mongo-express
          image: mongo-express
          ports:
            - containerPort: 8081
          env:
            - name: ME_CONFIG_MONGODB_ADMINUSERNAME
              value: admin
            - name: ME_CONFIG_MONGODB_ADMINPASSWORD
              value: password
            - name: ME_CONFIG_MONGODB_SERVER
              value: mongodb-service

---
apiVersion: v1
kind: Service
metadata:
  name: mongo-express-service
spec:
  type: NodePort
  selector:
    app: mongo-express
  ports:
    - protocol: TCP
      port: 8081
      targetPort: 8081
      nodePort: 30081
```

------------------------------------------------------------------------

# 2. What Does This YAML Create?

This single YAML file creates **4 Kubernetes objects**:

1.  MongoDB Deployment
2.  MongoDB Service
3.  Mongo Express Deployment
4.  Mongo Express Service

The architecture is:

``` text
                         Browser
                            |
                            | :30081
                            v
              +---------------------------+
              | Mongo Express Service     |
              | Type: NodePort            |
              | NodePort: 30081           |
              +-------------+-------------+
                            |
                            | :8081
                            v
              +---------------------------+
              | Mongo Express Pod         |
              | Container: mongo-express  |
              | Port: 8081                |
              +-------------+-------------+
                            |
                            | mongodb-service:27017
                            v
              +---------------------------+
              | MongoDB Service           |
              | Type: ClusterIP           |
              | Port: 27017               |
              +-------------+-------------+
                            |
                            | :27017
                            v
              +---------------------------+
              | MongoDB Pod               |
              | Container: mongodb        |
              | Port: 27017               |
              +---------------------------+
```

The main traffic flow is:

``` text
Browser
   ↓
Mongo Express Service
   ↓
Mongo Express Pod
   ↓
MongoDB Service
   ↓
MongoDB Pod
```

------------------------------------------------------------------------

# 3. What Is `apiVersion`?

Example:

``` yaml
apiVersion: apps/v1
```

`apiVersion` tells Kubernetes which API version should be used to create
the object.

For example:

``` yaml
apiVersion: apps/v1
kind: Deployment
```

means:

> Create a Deployment using the `apps/v1` API.

For a Service:

``` yaml
apiVersion: v1
kind: Service
```

Services use the core Kubernetes API group, so `v1` is used.

------------------------------------------------------------------------

# 4. What Is `kind`?

Example:

``` yaml
kind: Deployment
```

`kind` tells Kubernetes what type of object you want to create.

Your file contains:

``` text
Deployment
Service
Deployment
Service
```

So Kubernetes creates four objects.

------------------------------------------------------------------------

# 5. What Is `metadata`?

Example:

``` yaml
metadata:
  name: mongodb
```

`metadata` contains information that identifies the Kubernetes object.

Here:

``` text
name = mongodb
```

You can later refer to this Deployment using:

``` bash
kubectl get deployment mongodb
```

Similarly:

``` yaml
metadata:
  name: mongodb-service
```

creates a Service named:

``` text
mongodb-service
```

------------------------------------------------------------------------

# 6. First Object --- MongoDB Deployment

The first part is:

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
```

This tells Kubernetes:

> Create a Deployment named `mongodb`.

A Deployment is responsible for managing Pods.

Think:

``` text
Deployment
     |
     ↓
ReplicaSet
     |
     ↓
Pod
     |
     ↓
Container
```

You normally don't create the Pod manually when using a Deployment.

------------------------------------------------------------------------

# 7. `replicas: 1`

``` yaml
spec:
  replicas: 1
```

This means:

> Kubernetes should maintain one MongoDB Pod.

Conceptually:

``` text
MongoDB Deployment
       |
       ↓
   MongoDB Pod
```

If you changed it to:

``` yaml
replicas: 3
```

Kubernetes would try to maintain three Pods:

``` text
MongoDB Deployment
       |
   +---+---+
   |   |   |
   ↓   ↓   ↓
 Pod Pod Pod
```

For MongoDB, simply increasing replicas like this is NOT a complete
production database replication strategy. It is only useful here for
learning the Deployment concept.

------------------------------------------------------------------------

# 8. Deployment Selector

``` yaml
selector:
  matchLabels:
    app: mongodb
```

This tells the Deployment:

> Manage Pods whose label is `app=mongodb`.

The important part is:

``` text
app: mongodb
```

------------------------------------------------------------------------

# 9. Pod Template

``` yaml
template:
  metadata:
    labels:
      app: mongodb
```

This defines the Pod that the Deployment will create.

The Pod receives the label:

``` text
app=mongodb
```

Notice that these two sections match:

``` yaml
selector:
  matchLabels:
    app: mongodb
```

and:

``` yaml
labels:
  app: mongodb
```

This is extremely important.

The Deployment says:

> I manage Pods with `app=mongodb`.

The Pod says:

> My label is `app=mongodb`.

Therefore Kubernetes knows that this Pod belongs to this Deployment.

------------------------------------------------------------------------

# 10. Container Definition

Inside the Pod:

``` yaml
spec:
  containers:
    - name: mongodb
      image: mongo
```

This tells Kubernetes to create a container called:

``` text
mongodb
```

using the image:

``` text
mongo
```

Conceptually:

``` text
Pod
 |
 └── MongoDB Container
       |
       └── mongo image
```

If the image is not already available on the node, Kubernetes/container
runtime will pull it from a container registry according to the image
configuration.

------------------------------------------------------------------------

# 11. MongoDB Container Port

``` yaml
ports:
  - containerPort: 27017
```

MongoDB normally listens on port:

``` text
27017
```

This declares that the MongoDB container uses port `27017`.

Important:

`containerPort` by itself does NOT expose MongoDB to the outside world.

For networking to the Pod, you use a Service.

------------------------------------------------------------------------

# 12. MongoDB Username

``` yaml
env:
  - name: MONGO_INITDB_ROOT_USERNAME
    value: admin
```

This creates an environment variable inside the MongoDB container:

``` text
MONGO_INITDB_ROOT_USERNAME=admin
```

MongoDB uses this variable during initialization to create the
root/admin user.

Username:

``` text
admin
```

------------------------------------------------------------------------

# 13. MongoDB Password

``` yaml
- name: MONGO_INITDB_ROOT_PASSWORD
  value: password
```

This creates:

``` text
MONGO_INITDB_ROOT_PASSWORD=password
```

So for this practice setup:

``` text
MongoDB username = admin
MongoDB password = password
```

Important:

For production, do not store passwords directly in the YAML file. Use
Kubernetes Secrets.

------------------------------------------------------------------------

# 14. What Does `---` Mean?

You have:

``` yaml
---
```

This separates multiple YAML documents.

Your file contains four documents:

``` text
Document 1 → MongoDB Deployment

Document 2 → MongoDB Service

Document 3 → Mongo Express Deployment

Document 4 → Mongo Express Service
```

This allows you to keep multiple Kubernetes resources in one file.

------------------------------------------------------------------------

# 15. Second Object --- MongoDB Service

Now:

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
```

This creates a Kubernetes Service called:

``` text
mongodb-service
```

Why do we need a Service?

Because Pods are not permanent.

A Pod can be deleted and recreated.

For example:

``` text
Old Pod:
mongodb-abc123
IP: 10.244.0.5
```

After recreation:

``` text
New Pod:
mongodb-xyz789
IP: 10.244.0.9
```

The Pod IP can change.

You don't want Mongo Express to depend on a specific Pod IP.

Instead:

``` text
Mongo Express
      |
      ↓
mongodb-service
      |
      ↓
MongoDB Pod
```

The Service provides a stable network endpoint.

------------------------------------------------------------------------

# 16. MongoDB Service Selector

``` yaml
selector:
  app: mongodb
```

This tells the Service:

> Send traffic to Pods with the label `app=mongodb`.

Your MongoDB Pod has:

``` yaml
labels:
  app: mongodb
```

Therefore:

``` text
mongodb-service
      |
      | selector: app=mongodb
      ↓
MongoDB Pod
```

This is how the Service finds the correct Pod.

------------------------------------------------------------------------

# 17. MongoDB Service Ports

``` yaml
ports:
  - protocol: TCP
    port: 27017
    targetPort: 27017
```

There are two important ports:

### `port`

``` yaml
port: 27017
```

This is the port exposed by the Kubernetes Service.

### `targetPort`

``` yaml
targetPort: 27017
```

This is the port on the target Pod/container.

So:

``` text
mongodb-service:27017
          |
          ↓
MongoDB Pod:27017
```

They happen to be the same in this example.

They don't have to be.

For example:

``` yaml
port: 9999
targetPort: 27017
```

would mean:

``` text
Service:9999
     ↓
Pod:27017
```

------------------------------------------------------------------------

# 18. Why Is MongoDB Service a ClusterIP?

You didn't specify:

``` yaml
type:
```

Therefore Kubernetes uses the default Service type:

``` text
ClusterIP
```

A ClusterIP Service is normally accessible inside the Kubernetes
cluster.

This is good for MongoDB.

You generally don't want to expose the database directly to the public
internet.

So:

``` text
Mongo Express
      |
      ↓
MongoDB Service
      |
      ↓
MongoDB
```

MongoDB remains internal.

------------------------------------------------------------------------

# 19. Third Object --- Mongo Express Deployment

Now:

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo-express
```

This creates a Deployment named:

``` text
mongo-express
```

Its job is to manage the Mongo Express Pod.

------------------------------------------------------------------------

# 20. Mongo Express Replicas

``` yaml
spec:
  replicas: 1
```

Kubernetes tries to maintain one Mongo Express Pod.

Conceptually:

``` text
Mongo Express Deployment
          |
          ↓
Mongo Express Pod
```

------------------------------------------------------------------------

# 21. Mongo Express Selector

``` yaml
selector:
  matchLabels:
    app: mongo-express
```

The Deployment says:

> I manage Pods with `app=mongo-express`.

The Pod template contains:

``` yaml
labels:
  app: mongo-express
```

Again, they match.

``` text
Deployment selector
        |
        ↓
app=mongo-express
        |
        ↓
Pod label
app=mongo-express
```

------------------------------------------------------------------------

# 22. Mongo Express Container

``` yaml
containers:
  - name: mongo-express
    image: mongo-express
```

This creates a container named:

``` text
mongo-express
```

using the:

``` text
mongo-express
```

container image.

Conceptually:

``` text
Mongo Express Pod
       |
       └── Mongo Express Container
```

------------------------------------------------------------------------

# 23. Mongo Express Port

``` yaml
ports:
  - containerPort: 8081
```

Mongo Express's web interface listens on:

``` text
8081
```

So the Pod exposes the application on:

``` text
Mongo Express Pod:8081
```

Again, `containerPort` itself does not make it accessible from outside
the cluster.

The Service does that.

------------------------------------------------------------------------

# 24. Mongo Express MongoDB Username

``` yaml
- name: ME_CONFIG_MONGODB_ADMINUSERNAME
  value: admin
```

Mongo Express needs MongoDB credentials.

This tells it:

``` text
MongoDB username = admin
```

------------------------------------------------------------------------

# 25. Mongo Express MongoDB Password

``` yaml
- name: ME_CONFIG_MONGODB_ADMINPASSWORD
  value: password
```

This tells Mongo Express:

``` text
MongoDB password = password
```

These match the MongoDB credentials:

``` text
MongoDB:
username = admin
password = password

Mongo Express:
username = admin
password = password
```

Therefore Mongo Express can authenticate to MongoDB.

------------------------------------------------------------------------

# 26. Most Important Mongo Express Configuration

``` yaml
- name: ME_CONFIG_MONGODB_SERVER
  value: mongodb-service
```

This tells Mongo Express:

> The MongoDB server is reachable using the Kubernetes Service named
> `mongodb-service`.

Mongo Express does NOT connect to:

``` text
localhost
```

and it should not depend on a temporary Pod IP.

Instead:

``` text
mongodb-service
```

is used.

Inside the Kubernetes cluster, Kubernetes DNS allows Pods to resolve
Service names.

So Mongo Express can use:

``` text
mongodb-service:27017
```

Conceptually:

``` text
Mongo Express Pod
       |
       | mongodb-service:27017
       ↓
Kubernetes DNS
       |
       ↓
MongoDB Service
       |
       ↓
MongoDB Pod
```

This is one of the most important Kubernetes networking concepts.

------------------------------------------------------------------------

# 27. Fourth Object --- Mongo Express Service

Now:

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: mongo-express-service
```

This creates:

``` text
mongo-express-service
```

Its purpose is to expose Mongo Express.

------------------------------------------------------------------------

# 28. Why Does Mongo Express Need a Service?

You want to access Mongo Express from your browser.

The browser is outside the Pod.

You therefore need:

``` text
Browser
   |
   ↓
Kubernetes Service
   |
   ↓
Mongo Express Pod
```

That's why we create:

``` text
mongo-express-service
```

------------------------------------------------------------------------

# 29. `type: NodePort`

Your Service has:

``` yaml
type: NodePort
```

NodePort allows traffic to enter through a port on the Kubernetes node.

The main Service types you should know are:

``` text
ClusterIP
NodePort
LoadBalancer
```

### ClusterIP

Internal cluster access.

### NodePort

Exposes a Service through a port on a node.

### LoadBalancer

Usually used with cloud environments to provision/expose an external
load balancer.

For your local Minikube setup, NodePort is useful for accessing Mongo
Express from your browser.

------------------------------------------------------------------------

# 30. Mongo Express Service Selector

``` yaml
selector:
  app: mongo-express
```

The Service looks for Pods with:

``` text
app=mongo-express
```

Your Pod has:

``` yaml
labels:
  app: mongo-express
```

Therefore:

``` text
mongo-express-service
          |
          | selector: app=mongo-express
          ↓
Mongo Express Pod
```

------------------------------------------------------------------------

# 31. Mongo Express Service Ports

Your configuration:

``` yaml
ports:
  - protocol: TCP
    port: 8081
    targetPort: 8081
    nodePort: 30081
```

There are three important port concepts here.

### `nodePort`

``` text
30081
```

The external node port.

### `port`

``` text
8081
```

The Service port.

### `targetPort`

``` text
8081
```

The Pod/container port.

Think:

``` text
Browser
   |
   | :30081
   ↓
Kubernetes Node
   |
   ↓
Service :8081
   |
   ↓
Pod :8081
```

------------------------------------------------------------------------

# 32. `nodePort: 30081`

``` yaml
nodePort: 30081
```

This means Kubernetes exposes the Service through node port:

``` text
30081
```

For example, if your Minikube IP is:

``` text
192.168.49.2
```

you can access Mongo Express with:

``` text
http://192.168.49.2:30081
```

The exact IP depends on your Minikube setup.

You can check the Minikube IP using:

``` bash
minikube ip
```

Or you can use:

``` bash
minikube service mongo-express-service
```

to open/access the Service through Minikube.

------------------------------------------------------------------------

# 33. Complete Port Flow

For MongoDB:

``` text
Mongo Express
     |
     | mongodb-service:27017
     ↓
MongoDB Service
     |
     | targetPort:27017
     ↓
MongoDB Pod:27017
```

For Mongo Express:

``` text
Browser
   |
   | NodePort:30081
   ↓
Kubernetes Node
   |
   ↓
mongo-express-service:8081
   |
   | targetPort:8081
   ↓
Mongo Express Pod:8081
```

------------------------------------------------------------------------

# 34. Complete Application Architecture

The complete application looks like this:

``` text
                         BROWSER
                            |
                            |
                       :30081
                            |
                            ↓
              +---------------------------+
              | Mongo Express Service     |
              | Type: NodePort            |
              | NodePort: 30081           |
              | Port: 8081                |
              +-------------+-------------+
                            |
                            | targetPort 8081
                            ↓
              +---------------------------+
              | Mongo Express Pod         |
              |                           |
              | Container                 |
              | mongo-express             |
              |                           |
              | Port: 8081                |
              +-------------+-------------+
                            |
                            | mongodb-service:27017
                            ↓
              +---------------------------+
              | MongoDB Service           |
              | Type: ClusterIP           |
              | Port: 27017               |
              +-------------+-------------+
                            |
                            | targetPort 27017
                            ↓
              +---------------------------+
              | MongoDB Pod               |
              |                           |
              | Container                 |
              | mongodb                   |
              |                           |
              | Port: 27017               |
              +---------------------------+
```

------------------------------------------------------------------------

# 35. What Happens When You Run `kubectl apply`?

First save the file as:

``` text
mongodb-deployment.yaml
```

Then run:

``` bash
kubectl apply -f mongodb-deployment.yaml
```

Kubernetes reads all four YAML documents.

It creates:

``` text
Deployment/mongodb
Service/mongodb-service
Deployment/mongo-express
Service/mongo-express-service
```

------------------------------------------------------------------------

# 36. What Does Kubernetes Do Internally?

For the MongoDB Deployment:

``` text
Deployment
     ↓
ReplicaSet
     ↓
MongoDB Pod
     ↓
MongoDB Container
```

For the Mongo Express Deployment:

``` text
Deployment
     ↓
ReplicaSet
     ↓
Mongo Express Pod
     ↓
Mongo Express Container
```

The Services then provide networking:

``` text
mongodb-service
       ↓
MongoDB Pod

mongo-express-service
       ↓
Mongo Express Pod
```

------------------------------------------------------------------------

# 37. Check Deployments

Run:

``` bash
kubectl get deployments
```

You should see something similar to:

``` text
NAME             READY   UP-TO-DATE   AVAILABLE
mongodb          1/1     1            1
mongo-express    1/1     1            1
```

The exact output may contain additional columns depending on your
Kubernetes version.

------------------------------------------------------------------------

# 38. Check Pods

Run:

``` bash
kubectl get pods
```

You may see:

``` text
NAME                            READY   STATUS
mongodb-xxxxxxxxxx              1/1     Running
mongo-express-xxxxxxxxxx        1/1     Running
```

The Pod names are generated automatically.

For example:

``` text
mongodb-7d6c8b7c5d-abc12
mongo-express-5f6d7c8b9d-xyz45
```

------------------------------------------------------------------------

# 39. Check Services

Run:

``` bash
kubectl get services
```

You should see something similar to:

``` text
NAME                    TYPE        PORT(S)
mongodb-service        ClusterIP   27017/TCP
mongo-express-service  NodePort    8081:30081/TCP
```

This tells you:

``` text
mongodb-service
Type = ClusterIP
Port = 27017

mongo-express-service
Type = NodePort
Port = 8081
NodePort = 30081
```

------------------------------------------------------------------------

# 40. Check Everything at Once

Run:

``` bash
kubectl get all
```

This can show:

``` text
Pods
Services
Deployments
ReplicaSets
```

It is a very useful command when learning Kubernetes.

------------------------------------------------------------------------

# 41. Describe a Pod

First:

``` bash
kubectl get pods
```

Then:

``` bash
kubectl describe pod <pod-name>
```

For example:

``` bash
kubectl describe pod mongodb-xxxxxxxxx
```

This helps you see:

-   Pod status
-   Node
-   Containers
-   Environment variables
-   Events
-   Image
-   Ports
-   Volumes
-   Conditions

------------------------------------------------------------------------

# 42. Check Logs

MongoDB logs:

``` bash
kubectl logs <mongodb-pod-name>
```

Mongo Express logs:

``` bash
kubectl logs <mongo-express-pod-name>
```

Logs are extremely useful for troubleshooting.

For example, if Mongo Express cannot connect to MongoDB, its logs may
show a connection problem.

------------------------------------------------------------------------

# 43. Why Service Is Better Than Pod IP

Suppose MongoDB currently has:

``` text
Pod IP = 10.244.0.5
```

Mongo Express connecting directly:

``` text
10.244.0.5:27017
```

is not a good design.

If the Pod is recreated:

``` text
Old Pod IP = 10.244.0.5
New Pod IP = 10.244.0.9
```

The connection breaks.

Instead:

``` text
Mongo Express
      |
      ↓
mongodb-service:27017
      |
      ↓
Current MongoDB Pod
```

The Service remains stable while the Pod can change.

------------------------------------------------------------------------

# 44. What Happens If MongoDB Pod Dies?

Suppose:

``` text
MongoDB Pod
mongodb-abc123
```

crashes.

The Deployment notices that it wants:

``` text
Desired replicas = 1
```

but currently has:

``` text
Running replicas = 0
```

Kubernetes creates another Pod:

``` text
mongodb-xyz789
```

The Pod IP may be different.

But Mongo Express continues to use:

``` text
mongodb-service
```

It does not need to know the new Pod IP.

That's the purpose of the Service abstraction.

------------------------------------------------------------------------

# 45. Deployment vs Pod vs Service

This distinction is extremely important for interviews.

## Pod

A Pod is the smallest deployable unit in Kubernetes.

It runs one or more containers.

In your application:

``` text
MongoDB Pod
    ↓
MongoDB Container
```

and:

``` text
Mongo Express Pod
    ↓
Mongo Express Container
```

## Deployment

A Deployment manages Pods.

``` text
Deployment
    ↓
ReplicaSet
    ↓
Pods
```

It helps with:

-   Creating Pods
-   Maintaining replicas
-   Replacing failed Pods
-   Rolling updates
-   Version management

## Service

A Service provides stable networking to Pods.

``` text
Service
   ↓
Pods
```

It uses labels/selectors to find the correct Pods.

------------------------------------------------------------------------

# 46. Deployment Selector vs Service Selector

This is a common interview question.

Deployment:

``` yaml
selector:
  matchLabels:
    app: mongodb
```

Meaning:

> This Deployment manages Pods with `app=mongodb`.

Service:

``` yaml
selector:
  app: mongodb
```

Meaning:

> This Service sends traffic to Pods with `app=mongodb`.

They look similar but perform different jobs.

``` text
Deployment selector
       ↓
Identifies Pods managed by Deployment

Service selector
       ↓
Identifies Pods receiving network traffic
```

------------------------------------------------------------------------

# 47. `containerPort` vs `targetPort` vs `port` vs `nodePort`

This is one of the most important things to understand.

## `containerPort`

Example:

``` yaml
containerPort: 8081
```

This describes the port used by the container.

## `targetPort`

Example:

``` yaml
targetPort: 8081
```

The Service sends traffic to this port on the selected Pod.

## `port`

Example:

``` yaml
port: 8081
```

The port exposed by the Service inside the cluster.

## `nodePort`

Example:

``` yaml
nodePort: 30081
```

The port exposed on the Kubernetes node for a NodePort Service.

So:

``` text
NodePort
   |
   | 30081
   ↓
Service
   |
   | 8081
   ↓
Pod
   |
   | 8081
   ↓
Container/Application
```

------------------------------------------------------------------------

# 48. Why MongoDB Uses ClusterIP and Mongo Express Uses NodePort

MongoDB:

``` text
ClusterIP
```

because MongoDB only needs to be accessed by applications inside the
cluster.

Mongo Express:

``` text
NodePort
```

because you want to access its web interface from your browser.

So:

``` text
                    Browser
                       |
                       ↓
                 NodePort 30081
                       |
                       ↓
               Mongo Express
                       |
                       ↓
                 ClusterIP
                       |
                       ↓
                    MongoDB
```

------------------------------------------------------------------------

# 49. Kubernetes DNS

The line:

``` yaml
ME_CONFIG_MONGODB_SERVER: mongodb-service
```

works because Kubernetes provides DNS-based service discovery.

The Service:

``` text
mongodb-service
```

can be resolved by Pods in the same namespace.

Therefore Mongo Express can connect using:

``` text
mongodb-service:27017
```

You don't need to manually find the MongoDB Pod IP.

For a Service in another namespace, you can use a DNS name such as:

``` text
mongodb-service.namespace-name
```

or the full Kubernetes service DNS name when necessary.

------------------------------------------------------------------------

# 50. Important Problem --- No Persistent Storage

Your MongoDB Deployment currently has:

``` yaml
replicas: 1
```

but no:

``` text
PersistentVolume
PersistentVolumeClaim
```

That means the MongoDB data is stored in the Pod/container's writable
filesystem.

If the Pod is deleted, the database data may be lost.

For production, you normally want:

``` text
MongoDB Pod
     |
     ↓
PersistentVolumeClaim
     |
     ↓
PersistentVolume
     |
     ↓
Storage
```

For learning Kubernetes Deployments and Services, your current YAML is
fine.

But remember:

> A real database deployment needs persistent storage.

------------------------------------------------------------------------

# 51. Important Problem --- Passwords Are Hardcoded

You currently have:

``` yaml
value: admin
```

and:

``` yaml
value: password
```

This is okay for a local learning project.

But don't do this in production.

Instead use:

``` text
Kubernetes Secret
```

Conceptually:

``` text
Secret
 ├── username
 └── password
       |
       ↓
MongoDB Pod
       |
       ↓
Mongo Express Pod
```

This keeps credentials separate from normal configuration.

------------------------------------------------------------------------

# 52. Important Problem --- MongoDB Image Tag

You use:

``` yaml
image: mongo
```

and:

``` yaml
image: mongo-express
```

For a learning environment this is convenient.

For reproducible production deployments, it is better to use a specific
image tag/version rather than relying on an unpinned default tag.

Example conceptually:

``` yaml
image: mongo:<specific-version>
```

This avoids unexpected image-version changes.

------------------------------------------------------------------------

# 53. Commands You Should Practice

Apply the file:

``` bash
kubectl apply -f mongodb-deployment.yaml
```

Get all resources:

``` bash
kubectl get all
```

Get Deployments:

``` bash
kubectl get deployments
```

Get Pods:

``` bash
kubectl get pods
```

Get Services:

``` bash
kubectl get services
```

Get ReplicaSets:

``` bash
kubectl get replicasets
```

Describe MongoDB Deployment:

``` bash
kubectl describe deployment mongodb
```

Describe MongoDB Service:

``` bash
kubectl describe service mongodb-service
```

Describe Mongo Express Service:

``` bash
kubectl describe service mongo-express-service
```

Get Pod details:

``` bash
kubectl describe pod <pod-name>
```

Check MongoDB logs:

``` bash
kubectl logs <mongodb-pod-name>
```

Check Mongo Express logs:

``` bash
kubectl logs <mongo-express-pod-name>
```

Delete everything created by the YAML:

``` bash
kubectl delete -f mongodb-deployment.yaml
```

------------------------------------------------------------------------

# 54. Useful Minikube Commands

If you're using Minikube:

Check status:

``` bash
minikube status
```

Get Minikube IP:

``` bash
minikube ip
```

Open the NodePort Service:

``` bash
minikube service mongo-express-service
```

This can be easier than manually typing the node IP and port.

------------------------------------------------------------------------

# 55. What Happens Step-by-Step?

When you run:

``` bash
kubectl apply -f mongodb-deployment.yaml
```

think about it in this order:

### Step 1

Kubernetes creates:

``` text
MongoDB Deployment
```

### Step 2

The Deployment creates a ReplicaSet.

``` text
MongoDB Deployment
       ↓
ReplicaSet
```

### Step 3

The ReplicaSet creates the MongoDB Pod.

``` text
ReplicaSet
    ↓
MongoDB Pod
```

### Step 4

The Pod starts the MongoDB container.

``` text
MongoDB Pod
    ↓
MongoDB Container
```

### Step 5

Kubernetes creates:

``` text
mongodb-service
```

### Step 6

The Service finds the MongoDB Pod using:

``` text
app=mongodb
```

### Step 7

Kubernetes creates the Mongo Express Deployment.

``` text
Mongo Express Deployment
       ↓
ReplicaSet
       ↓
Mongo Express Pod
```

### Step 8

Mongo Express starts.

It reads:

``` text
username = admin
password = password
server = mongodb-service
```

### Step 9

Mongo Express connects to:

``` text
mongodb-service:27017
```

### Step 10

Kubernetes routes that traffic to the MongoDB Pod.

### Step 11

Kubernetes creates:

``` text
mongo-express-service
```

with:

``` text
NodePort = 30081
```

### Step 12

Your browser accesses:

``` text
http://<minikube-ip>:30081
```

### Step 13

Traffic reaches:

``` text
Mongo Express Service
        ↓
Mongo Express Pod
```

### Step 14

Mongo Express communicates with:

``` text
mongodb-service
        ↓
MongoDB Pod
```

------------------------------------------------------------------------

# 56. Complete Mental Model

Memorize this architecture:

``` text
                     KUBERNETES CLUSTER
                            |
          +-----------------+------------------+
          |                                    |
          ↓                                    ↓
 MongoDB Deployment                  Mongo Express Deployment
          |                                    |
          ↓                                    ↓
     ReplicaSet                         ReplicaSet
          |                                    |
          ↓                                    ↓
     MongoDB Pod                      Mongo Express Pod
          |                                    |
          ↓                                    ↓
 MongoDB Container                  Mongo Express Container
    :27017                                :8081
          ↑                                    ↑
          |                                    |
          |                                    |
 MongoDB Service                  Mongo Express Service
   ClusterIP                            NodePort
    :27017                               :30081
          ↑                                    ↑
          |                                    |
          +------------- Application ---------+
                            |
                            ↓
                         Browser
```

The actual request flow is:

``` text
Browser
   |
   | :30081
   ↓
Mongo Express NodePort Service
   |
   | :8081
   ↓
Mongo Express Pod
   |
   | mongodb-service:27017
   ↓
MongoDB ClusterIP Service
   |
   | :27017
   ↓
MongoDB Pod
   |
   ↓
MongoDB
```

------------------------------------------------------------------------

# 57. Interview Questions From This YAML

## Q1. Why do we use a Deployment?

A Deployment manages Pods and maintains the desired number of replicas.
It also supports rolling updates and replacing failed Pods.

------------------------------------------------------------------------

## Q2. Why do we use a Service?

A Service provides a stable network endpoint for accessing Pods.

Pods can be recreated and their IP addresses can change, but the Service
remains stable.

------------------------------------------------------------------------

## Q3. Why is MongoDB using ClusterIP?

Because MongoDB only needs to be accessed internally by Mongo Express or
other applications inside the cluster.

------------------------------------------------------------------------

## Q4. Why is Mongo Express using NodePort?

Because we want to access the Mongo Express web UI from outside the
cluster, such as from a browser.

------------------------------------------------------------------------

## Q5. What is the difference between `port` and `targetPort`?

`port` is the port exposed by the Service.

`targetPort` is the port on the selected Pod to which the Service
forwards traffic.

Example:

``` text
Service:8081
     ↓
Pod:8081
```

------------------------------------------------------------------------

## Q6. What is `nodePort`?

`nodePort` exposes a NodePort Service through a port on the Kubernetes
node.

In your YAML:

``` text
nodePort: 30081
```

------------------------------------------------------------------------

## Q7. Why does Mongo Express use `mongodb-service`?

Because `mongodb-service` is the stable Kubernetes Service name for
MongoDB.

Mongo Express does not need to know the MongoDB Pod IP.

------------------------------------------------------------------------

## Q8. How does the MongoDB Service find the MongoDB Pod?

Using the selector:

``` yaml
selector:
  app: mongodb
```

The MongoDB Pod has:

``` yaml
labels:
  app: mongodb
```

Therefore the Service selects that Pod.

------------------------------------------------------------------------

## Q9. How does the Mongo Express Service find its Pod?

Using:

``` yaml
selector:
  app: mongo-express
```

The Pod has:

``` yaml
labels:
  app: mongo-express
```

------------------------------------------------------------------------

## Q10. What happens if the MongoDB Pod crashes?

The Deployment/ReplicaSet detects that the desired replica count is not
satisfied and creates a replacement Pod.

The MongoDB Service continues providing a stable endpoint.

------------------------------------------------------------------------

## Q11. Does `containerPort` expose the application outside the cluster?

No.

`containerPort` describes the container port.

A Service is used to provide Kubernetes networking to the Pod, and a
NodePort/LoadBalancer can expose an application externally.

------------------------------------------------------------------------

## Q12. Why do we use `---`?

It separates multiple YAML documents in the same file.

Your file contains four Kubernetes resources.

------------------------------------------------------------------------

## Q13. What is the relationship between Deployment and ReplicaSet?

The Deployment manages the ReplicaSet, and the ReplicaSet manages the
Pods.

``` text
Deployment
    ↓
ReplicaSet
    ↓
Pod
```

------------------------------------------------------------------------

## Q14. What happens if the MongoDB Pod IP changes?

Mongo Express doesn't need to change its configuration because it
connects to:

``` text
mongodb-service
```

The Service routes traffic to the current MongoDB Pod.

------------------------------------------------------------------------

## Q15. What is missing for a production MongoDB deployment?

At minimum, you should consider:

``` text
Persistent storage
Secrets
Resource requests/limits
Health probes
Security configuration
Specific image versions
Proper MongoDB replication/backup strategy
```

------------------------------------------------------------------------

# 58. The 10 Things You Must Remember

If you don't want to memorize the entire YAML, remember these 10
concepts:

``` text
1. Deployment manages Pods.

2. Replica count tells Kubernetes how many Pod replicas to maintain.

3. Labels identify Pods.

4. Deployment selectors identify the Pods managed by a Deployment.

5. Service selectors identify the Pods receiving Service traffic.

6. Service provides stable networking for Pods.

7. ClusterIP is normally for internal cluster communication.

8. NodePort exposes a Service through a node port.

9. mongodb-service is the stable endpoint used by Mongo Express.

10. MongoDB should use persistent storage and Secrets in production.
```

------------------------------------------------------------------------

# 59. Final One-Line Explanation

Your entire YAML can be explained in one sentence:

> **Create one MongoDB Pod and one Mongo Express Pod using Deployments,
> create an internal ClusterIP Service so Mongo Express can communicate
> with MongoDB using `mongodb-service:27017`, and create a NodePort
> Service so a browser can access Mongo Express through port `30081`.**

The most important traffic flow to memorize is:

``` text
Browser
   ↓
NodePort :30081
   ↓
Mongo Express Service
   ↓
Mongo Express Pod :8081
   ↓
mongodb-service :27017
   ↓
MongoDB Pod :27017
```
