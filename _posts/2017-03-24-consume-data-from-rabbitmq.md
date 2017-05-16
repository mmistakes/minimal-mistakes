---
title: "Consume data from RabbitMQ"
related: true
header:
  overlay_image: /assets/images/ray-hennessy-118035.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/ray-hennessy-118035.jpg
categories:
  - Computer
tags:
  - Raspberry PI
  - RabbitMQ
  - Docker
  - Java
  - Maven
  - Spring
  - Swagger
  - Python
  - Git
  - μService
  - REST
  - Internet of Things
---
The objective of this tutorial is to develop a reactive server which consuming data from a rabbitmq message broker and
publishing data to client via websocket.

- [Prerequisites](#prerequisites)
- [Architecture overview](#architecture-overview)
- [Setup environment](#setup-environment)
- [Consume data from Rabbitmq](#consume-data-from-rabbitmq)
- [Store data into InfluxDB](#store-data-into-influxdb)
- [Create Rest API with Swagger](#create-rest-api-with-swagger)
- [Publish data to client via Websocket](#publish-data-to-client-via-websocket)
- [Final Result](#final-result)


###  Prerequisites

You must be aware of these posts to understand the environment.

- [Set up a Raspberry PI 3 ]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
- [Interacting with DHT22 Sensor]({{ site.url }}{{ site.baseurl }}/raspberry/dht22-raspberry)
- [Push data to RabbitMQ]({{ site.url }}{{ site.baseurl }}/computer/push-data-on-rabbitmq)
- [Setup InfluxDB]({{ site.url }}{{ site.baseurl }}/computer/install-influxdb)

### Architecture overview

{% include figure image_path="/assets/images/consume-data-from-rabbitmq.png" alt="Reactive Server Overview" caption="Reactive Server Overview" %}


### Setup environment

##### Prerequisites

- [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)
- [Maven](https://maven.apache.org/download.cgi)
- [Docker]({{ site.url }}{{ site.baseurl }}/linux/install-docker)
- [Git](https://git-scm.com/download/linux)

##### Clone the project

[Get source here](https://github.com/jluccisano/reactive-server)

```bash
git clone git@github.com:jluccisano/reactive-server.git
```

##### Run

```bash
mv application.tpl.yml application.yml
``` 
- Set your value into application.yml

- Start server

```bash
mvn spring-boot:run -Drun.profiles=dev
```

### Consume data from Rabbitmq

```bash
git checkout -b step1-consumeDataFromRabbitMQ origin/step1-consumeDataFromRabbitMQ
```
#### Configuration properties

```java
@Data
@ConfigurationProperties("spring.rabbitmq")
public class RabbitMQProperties {

    @NotEmpty
    private String endpoint;
    @NotEmpty
    private String exchange;
    @NotEmpty
    private String queue;
    @NotEmpty
    private String gatewayId;
}
```
#### Setup configuration

```java
@Configuration
@EnableRabbit
@EnableConfigurationProperties(RabbitMQProperties.class)
public class RabbitMQConfig {

    @Autowired
    RabbitMQProperties rabbitMQProperties;

    @Bean
    public Jackson2JsonMessageConverter jackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory(URI.create(rabbitMQProperties.getEndpoint()));
        return connectionFactory;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory simpleRabbitListenerContainerFactory(ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(jackson2MessageConverter());
        factory.setConcurrentConsumers(3);
        factory.setMaxConcurrentConsumers(10);
        return factory;
    }


    @Bean
    public ReceiveHandlerImpl receiveHandler() {
        return new ReceiveHandlerImpl();
    }

}
```
#### Create consumer


```java
@Service
public class ReceiveHandlerImpl implements ReceiveHandler {

    private static final Logger logger = LoggerFactory.getLogger(ReceiveHandlerImpl.class);

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "${spring.rabbitmq.queue}", durable = "true"),
            exchange = @Exchange(value = "${spring.rabbitmq.exchange}", type = ExchangeTypes.HEADERS, durable = "true"),
            arguments = {
                    @Argument(name = "x-match", value = "all"),
                    @Argument(name = "gatewayId", value = "${spring.rabbitmq.gatewayId}")
            })
    )
    public void handleMessage(@Payload Message message, @Header("gatewayId") String gatewayId) {
        logger.info(new String(message.toString()));
    }
    
}
```


#### Result

```bash
2017-05-11 13:48:51.283  INFO 16434 --- [cTaskExecutor-1] com.jls.service.impl.ReceiveHandlerImpl  : Message(expire=43869000, created=1494503330, data=DHT22Sensor{temperature='23.799999237060547', humidity=47.29999923706055})
```

### Store data into InfluxDB

```bash
git checkout -b step2-store-data-into-influxDB origin/step2-store-data-into-influxDB
```

#### Maven dependencies

```xml
<dependency>
    <groupId>com.github.miwurster</groupId>
    <artifactId>spring-data-influxdb</artifactId>
    <version>1.5</version>
</dependency>
<dependency>
    <groupId>org.influxdb</groupId>
    <artifactId>influxdb-java</artifactId>
    <version>2.5</version>
</dependency>
```
#### Configuration

```java
@Configuration
@EnableConfigurationProperties(InfluxDBProperties.class)
public class InfluxDBConfig {

    @Bean
    public InfluxDBConnectionFactory influxDBConnectionFactory(final InfluxDBProperties properties) {
        return new InfluxDBConnectionFactory(properties);
    }

    @Bean
    public InfluxDBTemplate<Point> influxDBTemplate(final InfluxDBConnectionFactory connectionFactory) {
        return new InfluxDBTemplate<>(connectionFactory, new PointConverter());
    }
}
```

#### Service

```java
@Service
public class InfluxDBServiceImpl implements InfluxDBService, InitializingBean {

    @Autowired
    InfluxDBTemplate<Point> influxDBTemplate;


    public void write(Point point) {
        influxDBTemplate.write(point);
    }

    public QueryResult query(String queryString) {
        Query query = new Query(queryString, influxDBTemplate.getDatabase());
        return influxDBTemplate.query(query);
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        influxDBTemplate.createDatabase();
    }
}
```

#### Store

```java
@Service
public class ReceiveHandlerImpl implements ReceiveHandler {

    @Autowired
    InfluxDBService influxDBService;


    private static final Logger logger = LoggerFactory.getLogger(ReceiveHandlerImpl.class);

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "${spring.rabbitmq.queue}", durable = "true"),
            exchange = @Exchange(value = "${spring.rabbitmq.exchange}", type = ExchangeTypes.HEADERS, durable = "true"),
            arguments = {
                    @Argument(name = "x-match", value = "all"),
                    @Argument(name = "gatewayId", value = "${spring.rabbitmq.gatewayId}")
            })
    )
    public void handleMessage(@Payload Message message, @Header("gatewayId") String gatewayId) {
        logger.info(new String(message.toString()));

        Point point = Point.measurement("dht22")
                .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
                .tag("gatewayId",gatewayId)
                .addField("temperature",message.getData().getTemperature())
                .addField("humidity", message.getData().getHumidity())
                .build();

        influxDBService.write(point);
    }


}
```

#### Result

```text
bash-4.3# influx
Connected to http://localhost:8086 version 1.2.0
InfluxDB shell version: 1.2.0
> use influx_db_name
Using database influx_db_name
> SELECT * FROM dht22
1494503402044000000 your_gateway_id 47.20000076293945    23.899999618530273
```


### Create Rest API with Swagger

```bash
git checkout -b origin/step3-create-rest-api-with-swagger step3-create-rest-api-with-swagger
```

#### Maven dependencies

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>${springfox.version}</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>${springfox.version}</version>
</dependency>
```

#### Swagger Config

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }
}

```

```java
@SpringBootApplication
@Import({WebConfig.class,
		JacksonConfig.class,
		InfluxDBConfig.class,
		RabbitMQConfig.class,
		SwaggerConfig.class})
public class ReactiveServerApplication extends WebMvcConfigurerAdapter {

	public static void main(String[] args) {
		SpringApplication.run(ReactiveServerApplication.class, args);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
		registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
	}
}
```

#### Controller

```java
@RestController
@RequestMapping("/api/v1/sensor/dht22")
@Api(value = "dht22", description = "DHT22 Sensor data")
public class DHT22Controller {

    @Autowired
    InfluxDBService influxDBService;

    private ListResource<Map> toListResource(QueryResult queryResult) {
        ListResource<Map> listResource = new ListResource<>();
        if(queryResult.getResults() != null && queryResult.getResults().size() > 0) {
            QueryResult.Result result = queryResult.getResults().get(0);
            if(result != null && result.getSeries() != null && result.getSeries().size() > 0) {
                QueryResult.Series series = result.getSeries().get(0);
                series.getValues().forEach(value -> {
                    Map<String,Object> mappedValues = new HashMap<>();
                    IntStream.range(0,  value.size())
                            .forEach(index -> {
                                mappedValues.put(series.getColumns().get(index), value.get(index));
                            });
                    listResource.getItems().add(mappedValues);
                });
            }
        }
        return listResource;
    }

    @SneakyThrows
    private DHT22Sensor toTransferObject(QueryResult queryResult) {
        DHT22Sensor dht22Sensor = new DHT22Sensor();
        QueryResult.Series series = queryResult.getResults().get(0).getSeries().get(0);
        dht22Sensor.setTime(ZonedDateTime.parse((String) series.getValues().get(0).get(0)));
        dht22Sensor.setGatewayId((String) series.getValues().get(0).get(1));
        dht22Sensor.setHumidity((Double) series.getValues().get(0).get(2));
        dht22Sensor.setTemperature((Double) series.getValues().get(0).get(3));
        return dht22Sensor;
    }

    //http://localhost:8084//api/v1/sensor/dht22/fresh/raspberry_1
    @RequestMapping(value = "/fresh/{gatewayId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Get latest fresh data", notes = "Get latest fresh data")
    public ResponseEntity<DHT22Sensor> getFreshSensorData(@PathVariable("gatewayId") String gatewayId) {

        String getLastValueQuery =
                new SelectBuilder()
                        .column("*")
                        .from("dht22")
                        .where("gatewayId = '" + gatewayId + "'")
                        .orderBy("time", false)
                        .toString();
        getLastValueQuery = getLastValueQuery.concat(" LIMIT 1");

        return new ResponseEntity<>(toTransferObject(influxDBService.query(getLastValueQuery)),  HttpStatus.OK);
    }
    //http://localhost:8084/api/v1/sensor/dht22/continuous/raspberry_1?sample=1h&range=12h
    @RequestMapping(value = "/continuous/{gatewayId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Get Continuous Data", notes = "Get Continuous Data")
    public ResponseEntity<ListResource<Map>> getContinuousData(@PathVariable("gatewayId") String gatewayId,
                                                               @RequestParam(value = "sample", required = true) String sample,
                                                               @RequestParam(value = "range", required = true) String range) {
        String getContinuousQuey =
            new SelectBuilder()
                    .column("*")
                    .from("cq_dht22_" + sample)
                    .where("gatewayId = '" + gatewayId + "' AND time >= now() - " + range)
                    .orderBy("time", false)
                    .toString();

        return new ResponseEntity<>(toListResource(influxDBService.query(getContinuousQuey)), HttpStatus.OK);
    }

}
```
#### Result

[http://localhost:8084/swagger-ui.html](http://localhost:8084/swagger-ui.html)

{% include figure image_path="/assets/images/step3-swagger1.png" alt="Swagger Overview" caption="Swagger Overview" %}


{% include figure image_path="/assets/images/step3-swagger2.png" alt="Get fresh data" caption="Get fresh data" %}


### Publish data to client via Websocket

```bash
git checkout -b step4-publish-to-websocket origin/step4-publish-to-websocket
```

#### Maven dependency

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-websocket</artifactId>
    <version>4.3.3.RELEASE</version>
</dependency>
```

#### Configuration

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue/");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stomp").setAllowedOrigins("*").withSockJS();
    }

}
```

#### Service

```java
@Service
public class PublishServiceImpl implements PublishService {

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    public void publish(String destination, Object payload) {
        messagingTemplate.convertAndSend(destination, payload.toString());
    }

}
```

##### Forward

```java
@Service
public class ReceiveHandlerImpl implements ReceiveHandler {

    @Autowired
    PublishServiceImpl publishService;

    @Autowired
    InfluxDBService influxDBService;


    private static final Logger logger = LoggerFactory.getLogger(ReceiveHandlerImpl.class);

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "${spring.rabbitmq.queue}", durable = "true"),
            exchange = @Exchange(value = "${spring.rabbitmq.exchange}", type = ExchangeTypes.HEADERS, durable = "true"),
            arguments = {
                    @Argument(name = "x-match", value = "all"),
                    @Argument(name = "gatewayId", value = "${spring.rabbitmq.gatewayId}")
            })
    )
    public void handleMessage(@Payload Message message, @Header("gatewayId") String gatewayId) {
        logger.info(new String(message.toString()));

        Point point = Point.measurement("dht22")
                .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
                .tag("gatewayId",gatewayId)
                .addField("temperature",message.getData().getTemperature())
                .addField("humidity", message.getData().getHumidity())
                .build();

        influxDBService.write(point);
        publishService.publish("/queue/DHT22",message.toString());
    }
}
```

#### Result

```text
2017-05-12 09:11:03.826  INFO 1729 --- [cTaskExecutor-1] com.jls.service.impl.PublishServiceImpl  : [>] Publish: Message(expire=60537000, created=1494573062, data=DHT22Sensor{temperature='23.200000762939453', humidity=52.5}) ;destination: /queue/DHT22
```

### Final Result


```yaml
version: '2'
services:
  reactive-server:
    image: "jluccisano/reactive-server:latest"
    environment:
      - PORT=8084
      - RABBITMQ_ENDPOINT=amqp://rabbit_user:rabbit_password@rabbitmq:5672/myvhost
      - RABBITMQ_EXCHANGE=your_exchange_name
      - RABBITMQ_QUEUE=your_queue_name
      - RABBITMQ_GATEWAYID=your_gateway_id
      - INFLUXDB_URL=http://influxdb:8086
      - INFLUXDB_USERNAME=influx_username
      - INFLUXDB_PASSWORD=influx_password
      - INFLUXDB_DATABASE=influx_db_name
      - INFLUXDB_RETENTION_POLICY=influx_rp_name
    ports:
      - "8084:8084"
    links:
      - "rabbitmq:rabbitmq"
      - "influxdb:influxdb"
    depends_on:
      - "rabbitmq"
      - "influxdb"
  rabbitmq:
    image:  "rabbitmq:3-management"
    environment:
      - RABBITMQ_DEFAULT_USER=rabbit_user
      - RABBITMQ_DEFAULT_PASS=rabbit_password
      - RABBITMQ_DEFAULT_VHOST=myvhost
    ports:
     - "5672:5672"
     - "8092:15672"
  influxdb:
    image: "appcelerator/influxdb"
    volumes:
      - './resources/init_script.influxql:/etc/extra-config/influxdb/init_script.influxql:ro'
    ports:
      - "8083:8083"
      - "8086:8086"
  grafana:
    image: 'grafana/grafana'
    links:
      - "influxdb:influxdb"
    depends_on:
      - "influxdb"
    ports:
      - '3600:3000'
  device-mock:
    build:
      context: ./resources
      dockerfile: stub.dockerfile
    environment:
      - RABBITMQ_ENDPOINT=amqp://rabbit_user:rabbit_password@rabbitmq:5672/myvhost
      - RABBITMQ_EXCHANGE=your_exchange_name
      - RABBITMQ_GATEWAYID=your_gateway_id
      - PUBLISH_INTERVAL=60
```

```yaml
docker-compose up -d
```

#### Go Further

- [Consume data from a reactive client](#{{ site.url }}{{ site.baseurl }}/computer/consume-data-from-reactive-client)