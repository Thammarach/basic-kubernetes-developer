kubectl create namespace monitoring
namespace/monitoring created

kubectl apply -f 01-prometheus-config.yaml 
configmap/prometheus-config created