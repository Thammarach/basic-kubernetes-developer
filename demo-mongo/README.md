kubectl apply -f 01-mongodb-secrets.yaml 
secret/mongodb-secrets created

kubectl get secret -n demomongo
NAME              TYPE     DATA   AGE
mongodb-secrets   Opaque   2      46m

kubectl apply -f 02-mongodb-pv.yaml 
persistentvolume/mongo-data-pv created

kubectl apply -f 03-mongodb-pvc.yaml
persistentvolumeclaim/mongo-data-pvc created

kubectl get pv -n demomongo
NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                      STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
mongo-data-pv   1Gi        RWO            Retain           Bound    demomongo/mongo-data-pvc                  <unset>                          7m44s

kubectl describe pv -n demomongo
Name:            mongo-data-pv
Labels:          <none>
Annotations:     pv.kubernetes.io/bound-by-controller: yes
Finalizers:      [kubernetes.io/pv-protection]
StorageClass:    
Status:          Bound
Claim:           demomongo/mongo-data-pvc
Reclaim Policy:  Retain
Access Modes:    RWO
VolumeMode:      Filesystem
Capacity:        1Gi
Node Affinity:   <none>
Message:         
Source:
    Type:          HostPath (bare host directory volume)
    Path:          /data/mongo
    HostPathType:  
Events:            <none>

kubectl get pvc -n demomongo
NAME             STATUS   VOLUME          CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
mongo-data-pvc   Bound    mongo-data-pv   1Gi        RWO                           <unset>                 2m34s

kubectl describe pvc mongo-data-pvc -n demomongo
Name:          mongo-data-pvc
Namespace:     demomongo
StorageClass:  
Status:        Bound
Volume:        mongo-data-pv
Labels:        <none>
Annotations:   pv.kubernetes.io/bind-completed: yes
Finalizers:    [kubernetes.io/pvc-protection]
Capacity:      1Gi
Access Modes:  RWO
VolumeMode:    Filesystem
Used By:       <none>
Events:        <none>

kubectl apply -f 04-mongodb-deployment.yaml 
deployment.apps/mongo created

kubectl get deployment -n demomongo
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
mongo   1/1     1            1           13m

kubectl apply -f 05-mongodb-nodeport-svc.yaml 
service/mongo-nodeport-svc created

kubectl get svc -n demomongo
NAME                 TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)           AGE
mongo-nodeport-svc   NodePort   10.96.195.58   <none>        27017:32000/TCP   4m4s

kubectl apply -f 06-mongodb-client.yaml 
deployment.apps/mongo-client created

kubectl get deployment mongo-client -n demomongo
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
mongo-client   1/1     1            1           48s

kubectl get all -n demomongo
NAME                                READY   STATUS    RESTARTS   AGE
pod/mongo-5dc9997d55-7zqdf          1/1     Running   0          27m
pod/mongo-client-6cf9c5f8f5-lnrhs   1/1     Running   0          6m27s

NAME                         TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)           AGE
service/mongo-nodeport-svc   NodePort   10.96.195.58   <none>        27017:32000/TCP   17m

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/mongo          1/1     1            1           27m
deployment.apps/mongo-client   1/1     1            1           6m27s

NAME                                      DESIRED   CURRENT   READY   AGE
replicaset.apps/mongo-5dc9997d55          1         1         1       27m
replicaset.apps/mongo-client-6cf9c5f8f5   1         1         1       6m27s

kubectl get pods -n demomongo
NAME                            READY   STATUS    RESTARTS   AGE
mongo-5dc9997d55-7zqdf          1/1     Running   0          30m
mongo-client-6cf9c5f8f5-lnrhs   1/1     Running   0          9m17s

# Exec into the client
kubectl exec -it mongo-client-6cf9c5f8f5-lnrhs -n demomongo -- /bin/bash

# Check version mongo client
root@mongo-client-6cf9c5f8f5-lnrhs:/# mongo --version
MongoDB shell version v4.4.6
Build Info: {
    "version": "4.4.6",
    "gitVersion": "72e66213c2c3eab37d9358d5e78ad7f5c1d0d0d7",
    "openSSLVersion": "OpenSSL 1.1.1  11 Sep 2018",
    "modules": [],
    "allocator": "tcmalloc",
    "environment": {
        "distmod": "ubuntu1804",
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}

# Login into the MongoDB shell
root@mongo-client-6cf9c5f8f5-lnrhs:/# mongo --host mongo-nodeport-svc --port 27017 -u adminuser -p password123
MongoDB shell version v4.4.6
connecting to: mongodb://mongo-nodeport-svc:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("2a55f49e-988d-4f7a-af09-a59019eace9c") }
MongoDB server version: 8.2.12
WARNING: shell and server versions do not match
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
        https://docs.mongodb.com/
Questions? Try the MongoDB Developer Community Forums
        https://community.mongodb.com
---
The server generated these startup warnings when booting: 
        2026-08-01T19:06:34.980+00:00: For customers running the current memory allocator, we suggest changing the contents of the following sysfsFile
        2026-08-01T19:06:34.980+00:00:         allocator: tcmalloc-google
        2026-08-01T19:06:34.980+00:00:         sysfsFile: /sys/kernel/mm/transparent_hugepage/defrag
        2026-08-01T19:06:34.980+00:00:         currentValue: madvise
        2026-08-01T19:06:34.980+00:00:         desiredValue: defer+madvise
        2026-08-01T19:06:34.980+00:00: We suggest setting the contents of sysfsFile to 0.
        2026-08-01T19:06:34.980+00:00:         sysfsFile: /sys/kernel/mm/transparent_hugepage/khugepaged/max_ptes_none
        2026-08-01T19:06:34.980+00:00:         currentValue: 511
        2026-08-01T19:06:34.988+00:00: We suggest setting swappiness to 0 or 1, as swapping can cause performance problems.
        2026-08-01T19:06:34.988+00:00:         sysfsFile: /proc/sys/vm/swappiness
        2026-08-01T19:06:34.988+00:00:         currentValue: 60
---

# Display list of DBs
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

# Get inside a particular DB
> use db1
switched to db db1

# Insert data into the db1 database
> db.blogs.insert({name: "devopscube" })
WriteResult({ "nInserted" : 1 })

# Display data from db1 database
> db.blogs.find()
{ "_id" : ObjectId("6a6e4c40e5e10eb2e354132d"), "name" : "devopscube" }

# Display a list of collections inside the ‘db1’ database
> show collections
blogs