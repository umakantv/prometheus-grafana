# Prometheus and Grafana for monitoring

## Install Prometheus

```
docker run \        
    -p 9090:9090 \
    -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus

```

Prometheus should be up and running on http://localhost:9090

## Install Graphana

```
docker run -d --name=grafana -p 3030:3000 grafana/grafana-enterprise
```

The default username:password is admin:admin.
Grafana should be available at http://localhost:3030


# Setup Server

Integrate prom-client in your nodejs project using the documentation
https://github.com/siimon/prom-client
