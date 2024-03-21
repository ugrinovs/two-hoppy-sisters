type Options = {
  headers: {
    "Content-Type": string;
  };
};
export const get = async <T>(url: string, data?: any, options?: Options) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      return data as T;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const post = async (url: string, data?: any, options?: Options) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

export const put = async (url: string, data?: any, options?: Options) =>
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

export const del = async (url: string, data?: any, options?: Options) =>
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
