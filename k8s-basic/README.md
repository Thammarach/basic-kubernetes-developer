# Basic Kubernetes (K8s) for Web Developer

kubectl config get-contexts

```
CURRENT   NAME             CLUSTER          AUTHINFO         NAMESPACE
          docker-desktop   docker-desktop   docker-desktop   
*         kind-mycluster   kind-mycluster   kind-mycluster
```

kubectl config use-context docker-desktop

kubectl version

kubectl config view (ดูข้อมูลไฟล์ config ของ k8s)
code ~/.kube/config 

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://kubernetes.docker.internal:6443
  name: docker-desktop
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://127.0.0.1:51492
  name: kind-mycluster
contexts:
- context:
    cluster: docker-desktop
    user: docker-desktop
  name: docker-desktop
- context:
    cluster: kind-mycluster
    user: kind-mycluster
  name: kind-mycluster
current-context: kind-mycluster
kind: Config
users:
- name: docker-desktop
  user:
    client-certificate-data: DATA+OMITTED
    client-key-data: DATA+OMITTED
- name: kind-mycluster
  user:
    client-certificate-data: DATA
```
kubectl config get-contexts (ดูรายชื่อ cluster ทั้งหมด)

```shell
CURRENT   NAME             CLUSTER          AUTHINFO         NAMESPACE
          docker-desktop   docker-desktop   docker-desktop   
*         kind-mycluster   kind-mycluster   kind-mycluster
```

kubectl config current-context (ดูว่าปัจจุบันทำงานกับ cluster ไหน)

```shell
kind-mycluster
```

kubectl config use-context docker-desktop (สลับ cluster)

```shell
Switched to context "docker-desktop".

$ kubectl config current-context
docker-desktop
```

kubectl cluster-info
kubectl cluster-info --context kind-mycluster

```
Kubernetes control plane is running at https://127.0.0.1:55399
CoreDNS is running at https://127.0.0.1:55399/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

kubectl get nodes

```shell
NAME                      STATUS   ROLES           AGE     VERSION
mycluster-control-plane   Ready    control-plane   2m30s   v1.31.0
mycluster-worker          Ready    <none>          2m15s   v1.31.0
mycluster-worker2         Ready    <none>          2m15s   v1.31.0
mycluster-worker3         Ready    <none>          2m15s   v1.31.0
```

kubectl get all --all-namespaces

```shell
NAMESPACE            NAME                                                  READY   STATUS    RESTARTS   AGE
default              pod/linux                                             2/2     Running   0          17m
kube-system          pod/coredns-6f6b679f8f-5dn9f                          1/1     Running   0          64m
kube-system          pod/coredns-6f6b679f8f-dk5tf                          1/1     Running   0          64m
kube-system          pod/etcd-mycluster-control-plane                      1/1     Running   0          64m
kube-system          pod/kindnet-8pxhm                                     1/1     Running   0          64m
kube-system          pod/kindnet-gt696                                     1/1     Running   0          64m
kube-system          pod/kindnet-wq9jd                                     1/1     Running   0          64m
kube-system          pod/kindnet-zxrm4                                     1/1     Running   0          64m
kube-system          pod/kube-apiserver-mycluster-control-plane            1/1     Running   0          64m
kube-system          pod/kube-controller-manager-mycluster-control-plane   1/1     Running   0          64m
kube-system          pod/kube-proxy-dhdmk                                  1/1     Running   0          64m
kube-system          pod/kube-proxy-glz4v                                  1/1     Running   0          64m
kube-system          pod/kube-proxy-n869s                                  1/1     Running   0          64m
kube-system          pod/kube-proxy-nr8jw                                  1/1     Running   0          64m
kube-system          pod/kube-scheduler-mycluster-control-plane            1/1     Running   0          64m
local-path-storage   pod/local-path-provisioner-57c5987fd4-6fzmv           1/1     Running   0          64m

NAMESPACE     NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)                  AGE
default       service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP                  64m
kube-system   service/kube-dns     ClusterIP   10.96.0.10   <none>        53/UDP,53/TCP,9153/TCP   64m

NAMESPACE     NAME                        DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
kube-system   daemonset.apps/kindnet      4         4         4       4            4           kubernetes.io/os=linux   64m
kube-system   daemonset.apps/kube-proxy   4         4         4       4            4           kubernetes.io/os=linux   64m

NAMESPACE            NAME                                     READY   UP-TO-DATE   AVAILABLE   AGE
kube-system          deployment.apps/coredns                  2/2     2            2           64m
local-path-storage   deployment.apps/local-path-provisioner   1/1     1            1           64m

NAMESPACE            NAME                                                DESIRED   CURRENT   READY   AGE
kube-system          replicaset.apps/coredns-6f6b679f8f                  2         2         2       64m
local-path-storage   replicaset.apps/local-path-provisioner-57c5987fd4   1         1         1       64m
```

kubectl get pods --all-namespaces

```shell
NAMESPACE            NAME                                              READY   STATUS    RESTARTS   AGE
kube-system          coredns-6f6b679f8f-5dn9f                          1/1     Running   0          3m54s
kube-system          coredns-6f6b679f8f-dk5tf                          1/1     Running   0          3m54s
kube-system          etcd-mycluster-control-plane                      1/1     Running   0          3m59s
kube-system          kindnet-8pxhm                                     1/1     Running   0          3m54s
kube-system          kindnet-gt696                                     1/1     Running   0          3m47s
kube-system          kindnet-wq9jd                                     1/1     Running   0          3m47s
kube-system          kindnet-zxrm4                                     1/1     Running   0          3m47s
kube-system          kube-apiserver-mycluster-control-plane            1/1     Running   0          3m59s
kube-system          kube-controller-manager-mycluster-control-plane   1/1     Running   0          4m
kube-system          kube-proxy-dhdmk                                  1/1     Running   0          3m47s
kube-system          kube-proxy-glz4v                                  1/1     Running   0          3m47s
kube-system          kube-proxy-n869s                                  1/1     Running   0          3m47s
kube-system          kube-proxy-nr8jw                                  1/1     Running   0          3m54s
kube-system          kube-scheduler-mycluster-control-plane            1/1     Running   0          3m59s
local-path-storage   local-path-provisioner-57c5987fd4-6fzmv           1/1     Running   0          3m54s
```

kubectl get namespaces

```
NAME                 STATUS   AGE
default              Active   4m44s
kube-node-lease      Active   4m44s
kube-public          Active   4m44s
kube-system          Active   4m44s
local-path-storage   Active   4m38s
```

คำสั่งสร้าง Cluster ใหม่ด้วย kind

kind create cluster --config=kind-create-cluster.yaml
kind create cluster --config=kind-create-cluster.yaml  --name mycluster

```shell
Creating cluster "mycluster" ...
 ✓ Ensuring node image (kindest/node:v1.31.0) 🖼 
 ✓ Preparing nodes 📦 📦 📦 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
 ✓ Joining worker nodes 🚜 
Set kubectl context to "kind-mycluster"
You can now use your cluster with:

kubectl cluster-info --context kind-mycluster

Have a question, bug, or feature request? Let us know! https://kind.sigs.k8s.io/#community 🙂
```

คำสั่งเช็ครายการ cluster ทั้งหมด

kubectl config get-contexts

```shell
CURRENT   NAME             CLUSTER          AUTHINFO         NAMESPACE
          docker-desktop   docker-desktop   docker-desktop   
*         kind-mycluster   kind-mycluster   kind-mycluster
```

คำสั่งสลับใช้งาน Cluster ปัจจุบัน

kubectl config use-context docker-desktop

```shell
Switched to context "docker-desktop".

$ kubectl config current-context
docker-desktop
```

คำสั่งเช็ครายการ nodes ทั้งหมดใน clusters ปัจจุบัน

kubectl get nodes

```shell
NAME                      STATUS   ROLES           AGE     VERSION
mycluster-control-plane   Ready    control-plane   2m30s   v1.31.0
mycluster-worker          Ready    <none>          2m15s   v1.31.0
mycluster-worker2         Ready    <none>          2m15s   v1.31.0
mycluster-worker3         Ready    <none>          2m15s   v1.31.0
```

ดูรายชื่อ cluster ด้วย kind

kind get clusters

```shell
kind
mycluster
```

คำสั่งเช็ครายการ nodes ด้วย kind

kind get nodes

```shell
kind-control-plane
kind-worker
kind-worker3
kind-worker2
```

การลบ Cluster ด้วย kind

kind delete cluster --name kind

```shell
Deleting cluster "mycluster" ...
Deleted nodes: ["mycluster-control-plane" "mycluster-worker2" "mycluster-worker" "mycluster-worker3"]
```

# Create Pod Demo

```shell
kubectl apply -f 01-pod.yaml
```

```shell
pod/linux created

$ kubectl get pods -A
NAMESPACE            NAME                                              READY   STATUS    RESTARTS   AGE
default              linux                                             2/2     Running   0          2m35s
```

# =========

คำสั่งเช็คว่าเปิด Metrics Server ของ Cluster ไว้หรือยัง

kubectl top node
kubectl top pods -A

```shell
error: Metrics API not available
```

ขึ้นแบบนี้แสดงว่ายังไม่ได้เปิดใช้งานคุณสมบัติ Metrics Server

Dowload file จาก https://github.com/kubernetes-sigs/metrics-server/releases
สำหรับ Kubernetes บน Docker Desktop ให้ทำการเพิ่ม --kubelet-insecure-tls

kubectl apply -f components.yaml

```shell
serviceaccount/metrics-server created
clusterrole.rbac.authorization.k8s.io/system:aggregated-metrics-reader created
clusterrole.rbac.authorization.k8s.io/system:metrics-server created
rolebinding.rbac.authorization.k8s.io/metrics-server-auth-reader created
clusterrolebinding.rbac.authorization.k8s.io/metrics-server:system:auth-delegator created
clusterrolebinding.rbac.authorization.k8s.io/system:metrics-server created
service/metrics-server created
deployment.apps/metrics-server created
apiservice.apiregistration.k8s.io/v1beta1.metrics.k8s.io created
```

Reference
https://dev.to/docker/enable-kubernetes-metrics-server-on-docker-desktop-5434

kubectl top nodes

```shell
NAME                      CPU(cores)   CPU(%)   MEMORY(bytes)   MEMORY(%)   
mycluster-control-plane   188m         2%       745Mi           4%          
mycluster-worker          33m          0%       208Mi           1%          
mycluster-worker2         32m          0%       213Mi           1%          
mycluster-worker3         36m          0%       230Mi           1% 
```

kubectl apply -f 05-autoscaling-deployment.yml

```shell
deployment.apps/php-apache created
service/php-apache created
```

kubectl get pods -n demok8s

```shell
NAME                          READY   STATUS    RESTARTS   AGE
php-apache-6c4c4b955c-ljdtn   1/1     Running   0          3s
php-apache-6c4c4b955c-nq9hk   1/1     Running   0          3s
```

kubectl apply -f hpa-v1.yaml

```shell
horizontalpodautoscaler.autoscaling/hpa-v1 created
```

kubectl get HorizontalPodAutoscaler -n demok8s

```shell
NAME     REFERENCE               TARGETS      MINPODS   MAXPODS   REPLICAS   AGE
hpa-v1   Deployment/php-apache   cpu: 1%/5%   3         10        3          3m29s
```

pods ถูก scail เพิ่มขึ้นมาเป็น 3 pods ตามที่ระบุใน config 'hpa-v1.yaml' และจะเพิ่มขึ้นถ้าผลรวม cpu ของทุก pods เกิน 5% จะทำการ scail เพิ่ม

Load Testing ด้วย K6 Loadtest

k6 run k6-loadtest.js

```shell

         /\      Grafana   /‾‾/  
    /\  /  \     |\  __   /  /   
   /  \/    \    | |/ /  /   ‾‾\ 
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/ 


     execution: local
        script: k6-loadtest.js
        output: -

     scenarios: (100.00%) 1 scenario, 400 max VUs, 2m20s max duration (incl. graceful stop):
              * default: Up to 400 looping VUs for 1m50s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)

 █ TOTAL RESULTS 

    HTTP
    http_req_duration....: avg=1.45s min=0s med=6.97ms max=1m0s p(90)=273.28ms p(95)=794.92ms
    http_req_failed......: 100.00% 12740 out of 12740
    http_reqs............: 12740   110.430878/s

    EXECUTION
    iteration_duration...: avg=2.43s min=1s med=1s     max=1m1s p(90)=1.27s    p(95)=1.79s   
    iterations...........: 12736   110.396206/s
    vus..................: 12      min=12             max=400
    vus_max..............: 400     min=400            max=400

    NETWORK
    data_received........: 5.9 MB  51 kB/s
    data_sent............: 898 kB  7.8 kB/s

running (1m55.4s), 000/400 VUs, 12736 complete and 63 interrupted iterations
default ✓ [======================================] 000/400 VUs  1m50s
```

kubectl get hpa -n demok8s

```shell
NAME     REFERENCE               TARGETS      MINPODS   MAXPODS   REPLICAS   AGE
hpa-v1   Deployment/php-apache   cpu: 6%/5%   3         10        10         31m
```

kubectl get deployments -n demok8s

```shell
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
php-apache   10/10   10           10          36m
```

kubectl get pods -n demok8s

```shell
NAME                          READY   STATUS    RESTARTS   AGE
php-apache-6c4c4b955c-7m67s   1/1     Running   0          51s
php-apache-6c4c4b955c-cslhx   1/1     Running   0          66s
php-apache-6c4c4b955c-fj56b   1/1     Running   0          66s
php-apache-6c4c4b955c-hgr28   1/1     Running   0          51s
php-apache-6c4c4b955c-jwldv   1/1     Running   0          51s
php-apache-6c4c4b955c-ljdtn   1/1     Running   0          36m
php-apache-6c4c4b955c-nq9hk   1/1     Running   0          36m
php-apache-6c4c4b955c-nzh2m   1/1     Running   0          66s
php-apache-6c4c4b955c-xsmfl   1/1     Running   0          51s
php-apache-6c4c4b955c-xxhkz   1/1     Running   0          26m
```

kubectl get pods -n demok8s

```shell
NAME                          READY   STATUS        RESTARTS   AGE
php-apache-6c4c4b955c-fj56b   1/1     Terminating   0          12m
php-apache-6c4c4b955c-jwldv   1/1     Terminating   0          12m
php-apache-6c4c4b955c-nq9hk   1/1     Running       0          47m
php-apache-6c4c4b955c-xsmfl   1/1     Running       0          12m
```

ในการทำงานจริงเราต้องดู Memory ควบคุ่ด้วย

kubectl apply -f hpa-v2.yaml

```shell
horizontalpodautoscaler.autoscaling/hpa-v2 created
```

kubectl get hpa -n demok8s

```shell
NAME     REFERENCE               TARGETS                        MINPODS   MAXPODS   REPLICAS   AGE
hpa-v2   Deployment/php-apache   cpu: 1%/10%, memory: 13%/20%   3         10        3          8m14s
```

kubectl get hpa -n demok8s

```shell
NAME     REFERENCE               TARGETS                         MINPODS   MAXPODS   REPLICAS   AGE
hpa-v2   Deployment/php-apache   cpu: 15%/10%, memory: 23%/20%   3         10        7          13m
```

kubectl apply -f mongo-deployment.yaml 

```shell
deployment.apps/mongo-deployment created
service/mongo-service created
```

kubectl apply -f server-deployment.yaml 
deployment.apps/server-deployment created
service/server-service created

kubectl apply -f client-deployment.yaml
deployment.apps/client-deployment created
service/client-service created

kubectl get deployment -n demok8s
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
client-deployment   3/3     3            3           46s
mongo-deployment    1/1     1            1           8m32s
server-deployment   3/3     3            3           3m47s

kubectl get services -n demok8s
NAME             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
client-service   ClusterIP   10.96.65.9      <none>        80/TCP      2m39s
mongo-service    ClusterIP   10.96.129.178   <none>        27017/TCP   10m
server-service   ClusterIP   10.96.172.120   <none>        80/TCP      5m40s

kubectl apply -f 06-ingress.yaml 

```shell
ingress.networking.k8s.io/ingress-service created
```

kubectl get ingress -A

```shell
NAMESPACE   NAME              CLASS    HOSTS                        ADDRESS   PORTS   AGE
demok8s     ingress-service   <none>   kubernetes.docker.internal             80      2m32s
```

http://kubernetes.docker.internal:80