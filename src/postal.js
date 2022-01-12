
import axios from 'axios';

const url = 'http://zip.cgis.biz/xml/zip.php';
const parmeter = 'zn';

export async function postal(event) {
  // ローカル実行時は、パース済みオブジェクトが渡されるためそのまま使う
  const body = event.localdata != null ? event.body : JSON.parse(event.body);
  // body に zipcode というエントリが存在するか
  if (body == null || body.zipcode == null) {
    // そもそも必要なリクエストパラメータがない
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'bad request',
        request: event.body,
      }),
    };
  } else {
    // リクエストするエンドポイント
    const requestURL = `${url}?${parmeter}=${body.zipcode}`;
    // axios のコンフィグ
    const config = {
      url: requestURL,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    // axios のエラーをハンドリングするため try 構文を使う
    try {
      const xml = await axios(config);
      if (xml.status === 200) {
        // Lambda Function からコールした API のレスポンスが 200
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'success',
            response: xml.data,
          }),
        };
      } else {
        // Lambda Function からコールした API のレスポンスが 200 以外
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: `bad response (${xml.status})`,
            error: xml.data,
          }),
        };
      }
    } catch (err) {
      // axios がエラーを発行した
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'some error',
          error: err,
        }),
      };
    }
  }
};
