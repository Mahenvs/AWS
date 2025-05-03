const { SQS } = require("@aws-sdk/client-sqs");
const sqs = new SQS();

exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');

  await sqs.sendMessage({
    QueueUrl: process.env.QUEUE_URL,
    MessageBody: JSON.stringify(body),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message sent!' }),
  };
};