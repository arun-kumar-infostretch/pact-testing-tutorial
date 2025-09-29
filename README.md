# Pact Contract Testing Tutorial

This repository contains a sample project demonstrating Consumer-Driven Contract Testing using Pact. It includes two services:

-   **`product-web-app`**: A frontend application (the Consumer).
-   **`product-api`**: A backend API (the Provider).

## Pact Workflow

This project uses a Pact Broker to manage contracts and verification results.

-   **Consumer CI (`.github/workflows/consumer-ci.yml`)**: When changes are pushed to `product-web-app`, this workflow runs the consumer tests and publishes the resulting contract to the Pact Broker.
-   **Provider CI (`.github/workflows/provider-ci.yml`)**: When changes are pushed to `product-api`, this workflow fetches the latest contracts for this provider from the Pact Broker, runs the verification tests, and publishes the results.

## Running Locally

### Prerequisites

-   Node.js (v20+)
-   Docker

### 1. Start the Pact Broker

```bash
docker run --rm -p 9292:9292 pactfoundation/pact-broker
```
The broker will be available at [http://localhost:9292](http://localhost:9292).

### 2. Run the Consumer Tests

```bash
cd product-web-app
npm install
npm test
```

### 3. Run the Provider Tests

```bash
cd product-api
npm install
npm test
```

## Pact Broker

The source of truth for all contracts and verification results.
[Link to your Pact Broker here]