kubectl apply -f 00-mern-namespace.yaml 
namespace/mernstack created

kubectl get namespace mernstack
NAME        STATUS   AGE
mernstack   Active   27s

kubectl apply -f 01-mern-mongo-deployed.yaml 
deployment.apps/mongodb-deployment created
secret/mongodb-secrets created
persistentvolumeclaim/mongodb-pvc created
persistentvolume/mongodb-pv created
service/mongodb-service created

kubectl apply -f 02-mern-nodejs-deployed.yaml 
deployment.apps/nodejs-deployment created
service/nodejs-service created

kubectl apply -f 03-mern-reactjs-deployed.yaml 
deployment.apps/reactjs-deployment created
service/reactjs-service created

kubectl apply -f 04-mern-ingress.yaml 
ingress.networking.k8s.io/ingress-service created

kubectl get all -n mernstack
NAME                                      READY   STATUS    RESTARTS   AGE
pod/mongodb-deployment-796f5447f6-zq54h   1/1     Running   0          25m
pod/nodejs-deployment-ddc7564f6-5vww5     1/1     Running   0          4m47s
pod/nodejs-deployment-ddc7564f6-7fgbc     1/1     Running   0          4m47s
pod/nodejs-deployment-ddc7564f6-jmxk5     1/1     Running   0          4m47s
pod/reactjs-deployment-675895dfbb-rg9s7   1/1     Running   0          50s
pod/reactjs-deployment-675895dfbb-v92jb   1/1     Running   0          50s
pod/reactjs-deployment-675895dfbb-zhslk   1/1     Running   0          50s

NAME                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
service/mongodb-service   ClusterIP   10.96.248.36    <none>        27017/TCP   25m
service/nodejs-service    ClusterIP   10.96.81.77     <none>        3000/TCP    4m47s
service/reactjs-service   ClusterIP   10.96.183.104   <none>        80/TCP      50s

NAME                                 READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/mongodb-deployment   1/1     1            1           25m
deployment.apps/nodejs-deployment    3/3     3            3           4m47s
deployment.apps/reactjs-deployment   3/3     3            3           50s

NAME                                            DESIRED   CURRENT   READY   AGE
replicaset.apps/mongodb-deployment-796f5447f6   1         1         1       25m
replicaset.apps/nodejs-deployment-ddc7564f6     3         3         3       4m47s
replicaset.apps/reactjs-deployment-675895dfbb   3         3         3       50s