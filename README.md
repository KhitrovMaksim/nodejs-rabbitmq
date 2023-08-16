<p align="center">
<a href="https://github.com/KhitrovMaksim/nodejs-rabbitmq#readme" target="_blank"><img src="https://img.shields.io/npm/v/nodejs-rabbitmq" alt="NPM Version" /></a>
<a href="https://github.com/KhitrovMaksim/nodejs-rabbitmq#readme" target="_blank"><img src="https://img.shields.io/npm/l/nodejs-rabbitmq" alt="Package License" /></a>
</p>


## Description

The mechanism for asynchronous processing of HTTP requests.

##  Requirements:

1. It is required to develop a mechanism for asynchronous processing of HTTP requests
2. Required stack: NodeJS, RabbitMQ
3. Required as a repository on GitHub
4. Need to attach instructions for local deployment of the project
5. Required to implement logging for debugging and monitoring purposes
6. It is required to develop an M1 microservice for processing incoming HTTP requests
7. It is required to develop an M2 microservice for processing jobs from RabbitMQ

## Algorithm:

- We receive an HTTP request at the M1 microservice level.
- We broadcast the HTTP request to the RabbitMQ queue. The request is transformed into a task.
- We process the task with the M2 microservice from the RabbitMQ queue.
- We place the result of processing the job in RabbitMQ.
- We return the result of the HTTP request as the result of the job from RabbitMQ.

## Scheme

![scheme.png](scheme.png)

## Local deployment

```bash
$ git clone https://github.com/KhitrovMaksim/nodejs-rabbitmq.git
$ cd nodejs-rabbitmq
$ docker-compose up -d --build -V
```

## Stay in touch

- Author - Maksim Khitrov
- LinkedIn - [https://www.linkedin.com/in/maksim-khitrov/](https://www.linkedin.com/in/maksim-khitrov/)
