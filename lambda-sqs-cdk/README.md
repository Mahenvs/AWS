# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

To create this setup, followed the below
1. npm install -g aws-cdk
2. mkdir <project_name>
3. cd <project_name>
4. cdk init app --language=typescript

To deploy the services into aws follow the below
1. Download the AWS Installer 
2. Then Configure the aws using the below cmd:
    aws configure
3. Provide the aws access key, secret, region and output format 
4. then run the below commands to deploy the app into aws 
     npx cdk bootstrap 
     npx cdk deploy