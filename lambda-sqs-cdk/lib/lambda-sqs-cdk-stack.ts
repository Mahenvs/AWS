import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as eventSources from "aws-cdk-lib/aws-lambda-event-sources";
import * as path from "path";

export class LambdaSqsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create axios layer
    const axiosLayer = new lambda.LayerVersion(this, "AxiosLayer", {
      code: lambda.Code.fromAsset(path.join(__dirname, "../layers")),
      compatibleRuntimes: [lambda.Runtime.NODEJS_22_X],
      description: "Reusable layer with axios",
    });
    // The code that defines your stack goes here
    const fn = new lambda.Function(this, "LambdaFunctionFromCDK", {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
      layers: [axiosLayer],
    });
    // example resource
    const queue = new sqs.Queue(this, "LambdaSqsCdkQueue", {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    fn.addEventSource(new eventSources.SqsEventSource(queue));
  }
}
