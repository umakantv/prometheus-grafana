
# Monitor Nodejs App with Prometheus and Grafana

### Complete Dashboard
![dashboard](../assets/dashboard.png)


We make use of unofficial library `prom-client` in this nodejs app to record the `Count`, `Gauge` and `Histogram`.

The default label used here is `app` with value `fibonacci-api`.

In addition, we added the following labels to the metrics for each request:
* Route
* Method
* Status Code

References:
https://grafana.com/docs/grafana-cloud/data-configuration/integrations/integration-reference/integration-nodejs/  
`prom-client` Docs: https://github.com/siimon/prom-client  

<table>
    <tbody>
        <tr>
            <td>
                <img src="../assets/response_time_percentile.png"></image>
                Percentile of requests with Response Time
            </td>
            <td>
                <img src="../assets/response_time_request_count.png"></image>
                Number of requests with Response Time
            </td>
        </tr>
        <tr>
            <td>
                <img src="../assets/status_code_request_count.png"></image>
                Number of requests per second with Status Code
            </td>
        </tr>
    </tbody>
</table>


<!-- ### Percentile of requests with Response Time
![response_time_percentile](../assets/response_time_percentile.png)

### Number of requests with Response Time
![response_time_request_count](../assets/response_time_request_count.png)

### Number of requests per second with Status Code
![status_code_request_count](../assets/status_code_request_count.png) -->