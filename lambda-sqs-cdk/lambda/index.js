const axios = require('axios');

exports.handler = async (event) => {
  console.log("Hello, this is serverless lambda function");
  for(const {messageId,body} of event.Records){
    console.log(messageId,body)
    console.log("I am in message quwu");
    
  }
  console.log('Received SQS event:', JSON.stringify(event, null, 2));

  const response = await axios.get('https://api.github.com');
  console.log('GitHub API status:', response.status);
  return {
    status: 200,
    message:
      "Lambda function created f rom CDK successfully, added github workflow",
  };
};
