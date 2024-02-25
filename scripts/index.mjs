import * as https from "node:https";

/**
 * Get request.
 *
 * @param {string} uri       request uri
 * @return {Promise<string>} promise of request
 */
function get(uri) {
  return new Promise((resolve, reject) => {
    https
      .get(uri, (response) => {
        // レスポンスのパラメータ
        const { statusCode, headers } = response;
        console.debug("Status Code : " + statusCode);
        console.debug(
          "Header : " +
            Object.keys(headers)
              .map((key) => key + ":" + headers[key])
              .join("\n"),
        );

        response.setEncoding("utf8");
        let responseBody = "";

        // レスポンスデータの
        response.on("data", (chunk) => {
          responseBody += chunk;
        });

        response.on("end", () => {
          resolve(responseBody);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

export const handler = async (event) => {
  // 環境変数
  /** @type string url */
  const url = process.env.URL;

  console.log("URL : " + url);
  if (url === undefined) {
    throw new Error("URL is undefined.");
  }

  const now = new Date();
  console.log("Now : " + now.toString());

  // リクエストをするクエリ
  const queryHash = {
    // data: event.data,
    // time: now.toISOString(),
    zipcode: "1000001",
  };
  // URIを使うためにクエリ文字列に
  const queryString = Object.keys(queryHash)
    .map((key) => {
      return key + "=" + encodeURIComponent(queryHash[key]);
    })
    .join("&");
  console.log("Requset QueryStrings : " + queryString);

  // クエリ文字列を元にリクエストするURIを作成する
  const uri = url + "?" + queryString;
  console.log("Requset URI : " + uri);

  let response = "";
  try {
    response = await get(uri).catch(() => {
      // GETがrejectされた場合
      response = "";
    });
  } catch (e) {
    // GETでErrorがthrowされた場合
    response = "";
  }
  console.log("Response Data : " + response);
};
