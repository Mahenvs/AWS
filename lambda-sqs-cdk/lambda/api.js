const aws = require('aws-cdk')
const axios = require('axios')
const sqs = new AWS.SQS()

exports.handler = async(event)=>{
  const body = JSON.parse(event.body || '{}')

  await sqs.sendMessage({
    QueueUrl: process.env.QUEUE_URL,
    MessageBody: JSON.stringify(body)
  }).promise()
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Sent to queue' }),
  };
}