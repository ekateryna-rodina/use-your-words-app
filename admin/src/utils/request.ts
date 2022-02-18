type Method = "POST" | "GET" | "UPDATE" | "DELETE";
const request = (url: string, params = {}, method: Method = "GET") => {
  let options: {
    method: Method;
    body: string | undefined;
    headers: { Accept: string; "Content-Type": string } | undefined;
  } = {
    method,
    body: undefined,
    headers: undefined,
  };
  if ("GET" === method) {
    url += "?" + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  return fetch(url, options).then((response) => response.json());
};

export default request;
