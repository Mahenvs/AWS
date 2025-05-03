const axios = require('axios');

exports.handler = async (event) => {
  console.log("Hello, this is serverless lambda function");
  for(const record of event.Records){
    const message = JSON.parse(record.body);
    console.log("I am in message consumer : ",message);
    
  }
  console.log('Received SQS event:', JSON.stringify(event, null, 2));

  const response = await axios.get('https://api.github.com');
  console.log('GitHub API status:', response.status,response.statusText);
  return {
    status: 200,
    message:
      "Lambda function created from CDK successfully, added git_hub workflow with layer41",
  };
};
