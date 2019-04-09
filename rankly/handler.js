'use strict';

const emojis = ['😄','😃','😀','😊','😉','😍','🔶','🔷', '🚀'];

module.exports.rank = async (event) => {
  const rank = event.queryStringParameters.rank;
  const rankEmoji = emojis[rank >= emojis.length ? emojis.length - 1 : rank];
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: rankEmoji,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


// 'use strict';

// const emojis = [
//   '😄','😃','😀','😊','😉','😍','🔶','🔷', '🚀'
// ];
// module.exports.hello = (event, context, callback) => {
//   const rank = event.queryStringParameters.rank;
//   const rankEmoji = emojis[rank > emojis.length ? emojis.length - 1 : rank];
//   const response = {
//     statusCode: 200,
//     headers: {
//       "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
//     },
//     body: JSON.stringify({
//       message: 'Rank generated!',
//       input: rankEmoji,
//     }),
//   };

//   callback(null, response);

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
// };