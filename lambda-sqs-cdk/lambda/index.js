exports.handler = async (event) => {
  console.log("Hello, this is serverless lambda function");
  for(const {messageId,body} of event.Records){
    console.log(messageId,body)
    console.log("I am in message quwu");
    
  }
  return {
    status: 200,
    message:
      "Lambda function created f rom CDK successfully, added github workflow",
  };
};
