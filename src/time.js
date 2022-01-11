'use strict';

module.exports = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: Date.now(),
        input: event,
      },
      null,
      2
    ),
  };
};