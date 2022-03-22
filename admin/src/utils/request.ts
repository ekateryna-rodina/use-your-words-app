type Method = "POST" | "GET" | "PUT" | "DELETE";
const request = async (url: string, params = {}, method: Method = "GET") => {
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
    if (["PUT"].includes(method)) {
      url +=
        "?" +
        new URLSearchParams({ id: (params as { id: string }).id }).toString();
    }
    options.body = JSON.stringify(params);
    console.log(options);
  }

  const response = await fetch(url, options);
  return await response.json();
};

export default request;
