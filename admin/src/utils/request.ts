type Method = "POST" | "GET" | "PUT" | "DELETE";
const request = (url: string, params = {}, method: Method = "GET") => {
  let options: {
    method: Method;
    body: string | undefined;
    headers: { Accept: string; "Content-Type": string } | undefined;
    mode: RequestMode | undefined;
  } = {
    method,
    body: undefined,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
  };

  if (["GET", "DELETE"].includes(method)) {
    url += "?" + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  return fetch(url, options).then((response) => response.json());
};

export default request;
