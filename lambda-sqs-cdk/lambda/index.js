exports.handler = async () => {
  console.log("Hello, this is serverless lambda function");
  return {
    status: 200,
    message:
      "Lambda function created f rom CDK successfully, added github workflow",
  };
};
