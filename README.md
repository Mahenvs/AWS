"# AWS" 
1. lambda-sqs-cdk -> IaC demo

# AWS IaC Demos

This repository contains AWS Infrastructure as Code (IaC) demos using AWS CDK with TypeScript.

## Project Structure

- **lambda-sqs-cdk/**: Main CDK project for deploying a Lambda + SQS + API Gateway stack.
  - `bin/`: CDK app entrypoint.
  - `lib/`: CDK stack definition ([lambda-sqs-cdk-stack.ts](lambda-sqs-cdk/lib/lambda-sqs-cdk-stack.ts)).
  - `lambda/`: Lambda function source code.
    - `api/`: Lambda for API Gateway integration.
    - `consumer/`: Lambda for SQS message consumption.
  - `layer/axios-node/`: Lambda layer for sharing the `axios` library.
  - `test/`: Jest unit tests.
  - `cdk.json`, `tsconfig.json`, `package.json`: Project configuration files.
- **.github/workflows/**: GitHub Actions CI/CD workflows for build and deploy.

## Getting Started

### Prerequisites

- Node.js 20+
- AWS CLI configured (`aws configure`)
- AWS CDK (`npm install -g aws-cdk`)

### Install Dependencies

```sh
cd lambda-sqs-cdk
npm install
```

### Build the Project

```sh
npm run build
```

### Deploy the Stack

```sh
npx cdk bootstrap
npx cdk deploy
```

### Run Tests

```sh
npm run test
```

## CI/CD

- Automated deployment is configured via [deploy.yml](.github/workflows/deploy.yml) on pushes to `main`.

## Lambda Functions

- **API Lambda** ([lambda/api/index.js](lambda-sqs-cdk/lambda/api/index.js)): Receives HTTP requests and sends messages to SQS.
- **Consumer Lambda** ([lambda/consumer/index.js](lambda-sqs-cdk/lambda/consumer/index.js)): Processes messages from SQS and makes HTTP requests using `axios` from a shared Lambda layer.

## Architecture

See [lambda-sqs-cdk/Architecture.png](lambda-sqs-cdk/Architecture.png) for a diagram of the deployed resources.

---