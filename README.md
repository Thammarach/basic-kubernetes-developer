# Basic Kubernetes Developer

A hands-on Kubernetes learning repository covering fundamental concepts and real-world deployment scenarios. This project demonstrates how to deploy containerized applications, manage workloads, expose services, configure networking, implement autoscaling, and deploy a complete MERN stack application on Kubernetes.

## Repository Structure

```text
.
├── demo-mongo/
├── k8s-basic/
├── workshop-mern-deployed/
└── README.md
```

---

# Repository Summary

| Directory | Description |
|-----------|-------------|
| **k8s-basic** | Core Kubernetes concepts including Pods, Deployments, Services, Ingress, Rolling Updates, Horizontal Pod Autoscaler (HPA), Metrics Server, and load testing using k6. |
| **demo-mongo** | Complete MongoDB deployment example with Namespace, Secret, Persistent Volume, Persistent Volume Claim, Deployment, Service, and client Pod. |
| **workshop-mern-deployed** | Production-style deployment of a MERN (MongoDB, Express, React, Node.js) application using Kubernetes resources and Ingress. |

---

# Project Overview

## 1. k8s-basic

Learn the essential Kubernetes resources and deployment workflow.

### Kubernetes Manifests

| File | Description |
|------|-------------|
| **01-pod.yaml** | Deploys a single Pod to demonstrate the most basic Kubernetes workload. |
| **02-deployment.yaml** | Creates a Deployment for managing multiple Pod replicas with self-healing capabilities. |
| **03-service.yaml** | Exposes Pods through a Kubernetes Service for internal or external communication. |
| **04-rolling-update.yaml** | Demonstrates zero-downtime application updates using the RollingUpdate strategy. |
| **05-autoscaling-deployment.yml** | Deployment configured for Horizontal Pod Autoscaler testing. |
| **06-ingress.yaml** | Configures Ingress rules to expose HTTP services through a single entry point. |
| **server-deployment.yaml** | Backend application Deployment. |
| **client-deployment.yaml** | Frontend application Deployment. |
| **mongo-deployment.yaml** | MongoDB Deployment used by the application. |
| **components.yaml** | Installs Kubernetes Metrics Server required for autoscaling. |
| **hpa-v1.yaml** | Horizontal Pod Autoscaler using autoscaling/v1 based on CPU utilization. |
| **hpa-v2.yaml** | Horizontal Pod Autoscaler using autoscaling/v2 supporting advanced scaling metrics. |
| **kind-create-cluster.yaml** | Kind cluster configuration for local Kubernetes development. |
| **k6-loadtest.js** | Load testing script used to generate traffic and validate autoscaling behavior. |

### Learning Topics

- Kubernetes Pod
- Deployment
- ReplicaSet
- Service
- Rolling Update
- Self-healing
- Horizontal Pod Autoscaler (HPA)
- Metrics Server
- Ingress
- Kind Cluster
- Load Testing with k6

---

## 2. demo-mongo

Deploy MongoDB with persistent storage following Kubernetes best practices.

### Kubernetes Manifests

| File | Description |
|------|-------------|
| **00-mongdb-namespace.yaml** | Creates an isolated Namespace for MongoDB resources. |
| **01-mongodb-secrets.yaml** | Stores MongoDB credentials securely using Kubernetes Secrets. |
| **02-mongodb-pv.yaml** | Creates a Persistent Volume (PV) for durable data storage. |
| **03-mongodb-pvc.yaml** | Creates a Persistent Volume Claim (PVC) to request storage from the PV. |
| **04-mongodb-deployment.yaml** | Deploys MongoDB using the configured Secret and Persistent Volume Claim. |
| **05-mongodb-nodeport-svc.yaml** | Exposes MongoDB externally using a NodePort Service. |
| **06-mongodb-client.yaml** | Deploys a MongoDB client Pod for database connectivity testing. |

### Learning Topics

- Namespace
- Secret
- Persistent Volume (PV)
- Persistent Volume Claim (PVC)
- Stateful storage
- MongoDB Deployment
- NodePort Service
- Database connectivity testing

---

## 3. workshop-mern-deployed

Deploy a complete MERN stack application on Kubernetes.

### Kubernetes Manifests

| File | Description |
|------|-------------|
| **00-mern-namespace.yaml** | Creates a dedicated Namespace for the MERN application. |
| **01-mern-mongo-deployed.yaml** | Deploys MongoDB database. |
| **02-mern-nodejs-deployed.yaml** | Deploys the Node.js backend API. |
| **03-mern-reactjs-deployed.yaml** | Deploys the React frontend application. |
| **04-mern-ingress.yaml** | Configures Ingress for external access to the MERN application. |

### Learning Topics

- Multi-tier architecture
- Frontend deployment
- Backend deployment
- Database deployment
- Service communication
- Ingress routing
- Full-stack Kubernetes deployment

---

# Kubernetes Resources Covered

| Resource | Purpose |
|----------|---------|
| Pod | Smallest deployable Kubernetes unit |
| Deployment | Manages application replicas and rolling updates |
| ReplicaSet | Ensures the desired number of Pods are running |
| Service | Provides stable networking for Pods |
| Namespace | Isolates Kubernetes resources |
| Secret | Securely stores sensitive information |
| Persistent Volume | Provides persistent storage |
| Persistent Volume Claim | Requests persistent storage |
| Ingress | Manages external HTTP/HTTPS access |
| Horizontal Pod Autoscaler | Automatically scales Pods based on resource utilization |

---

# Technologies

- Kubernetes
- Docker
- Kind
- MongoDB
- Node.js
- React
- Express.js
- Metrics Server
- k6
- YAML

---

# Learning Outcomes

This repository demonstrates practical experience with:

- Writing Kubernetes manifests from scratch
- Deploying containerized applications
- Managing application lifecycle with Deployments
- Configuring internal and external networking
- Implementing rolling updates with zero downtime
- Enabling automatic scaling using HPA
- Managing persistent storage
- Securing applications with Kubernetes Secrets
- Deploying a complete MERN stack application
- Performing load testing to validate autoscaling behavior
- Building a local Kubernetes development environment using Kind

---

# Target Audience

This repository is intended for:

- Kubernetes Beginners
- DevOps Engineers
- Platform Engineers
- Cloud Engineers
- Software Engineers learning Kubernetes
- Students preparing for Kubernetes certifications (CKA / CKAD)