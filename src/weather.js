
import axios from 'axios';

const url = 'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m';

export async function weather(event) {
  const body = event.localdata != null ? event.body : event.queryStringParameters;
  if (body == null || body.longitude == null || body.latitude == null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'bad request',
        request: event,
      }),
    };
  } else {
    const lon = body.longitude;
    const lat = body.latitude;
    const requestURL = `${url}&longitude=${lon}&latitude=${lat}`;
    const config = {
      url: requestURL,
      method: 'GET',
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'success',
            response: response.data,
          }),
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: `bad response (${response.status})`,
            error: response.data,
          }),
        };
      }
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'some error',
          error: err,
          event: event,
        }),
      };
    }
  }
};
