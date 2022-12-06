# Prometheus and Grafana for monitoring

## Install Prometheus

```
docker run \        
    -p 9090:9090 \
    -v ./prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus

```

Prometheus should be up and running on http://localhost:9090

## Install Graphana

```
docker run -d --name=grafana -p 3030:3000 grafana/grafana-enterprise
```

The default username:password is admin:admin.
Grafana should be available at http://localhost:3030

## Note:  
> The above two steps can be replace using `docker-compose up -d`.


### Adding Prometheus as data source

Find the IP address of the prometheus container.
Then go to add a data source, add the URL `http://<IP Address>:9090` (e.g., `http:170.30.0.0:9090`)


# Setup Server

Integrate prom-client in your nodejs project using the documentation
https://github.com/siimon/prom-client
