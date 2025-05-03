const axios = require('axios');

exports.handler = async (event) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.body);
    console.log("SQS message:", message);
  }

  const response = await axios.get('https://api.github.com');
  console.log('GitHub API status:', response.status);

  return {
    statusCode: 200,
    body: "Processed SQS message.",
  };
};
