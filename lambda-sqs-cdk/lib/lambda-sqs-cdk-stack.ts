import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as eventSources from "aws-cdk-lib/aws-lambda-event-sources";
import * as path from "path";
import * as apigw from "aws-cdk-lib/aws-apigateway";
export class LambdaSqsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create axios layer
    const axiosLayer = new lambda.LayerVersion(this, "AxiosLayer", {
      code: lambda.Code.fromAsset(path.join(__dirname, "../layer/axios-node")),
      compatibleRuntimes: [lambda.Runtime.NODEJS_22_X],
      description: "Reusable layer with axios",
    });
    // example resource
    const queue = new sqs.Queue(this, "LambdaSqsCdkQueue", {
      visibilityTimeout: cdk.Duration.seconds(300),
    });
    // The code that defines your stack goes here
    const apiHandler = new lambda.Function(this, "LambdaFunctionFromCDK", {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda/api"),
      layers: [axiosLayer],
      environment: {
        QUEUE_URL: queue.queueUrl,
      },
    });

    // 🔹 Lambda B: SQS Consumer
    const queueConsumer = new lambda.Function(this, "QueueConsumer", {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda/consumer"),
      layers: [axiosLayer],
    });

    queueConsumer.addEventSource(new eventSources.SqsEventSource(queue));

    // 🔹 1. Create an API Gateway REST API
    const api = new apigw.RestApi(this, "SqsPostAPI", {
      restApiName: "SQS Post API",
    });
    // Add a send post endpoint that calls existing lambda
    const send = api.root.addResource("send");
    send.addMethod("POST", new apigw.LambdaIntegration(apiHandler));

    // Output API URL
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
    });
  }
}
