import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as eventSources from "aws-cdk-lib/aws-lambda-event-sources";

export class LambdaSqsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const fn = new lambda.Function(this, "LambdaFunctionFromCDK", {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
    });
    // example resource
    const queue = new sqs.Queue(this, "LambdaSqsCdkQueue", {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    fn.addEventSource(new eventSources.SqsEventSource(queue));
  }
}
