const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');

  await sqs.sendMessage({
    QueueUrl: process.env.QUEUE_URL,
    MessageBody: JSON.stringify(body),
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message sent!' }),
  };
};
