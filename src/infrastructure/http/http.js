const url = process.env.REACT_APP_API_URL;

const headers = {
    'Content-Type': 'application/json'
  }

// Interceptor.
const fetcher = (url, options) => {
  return fetch(url, updateOptions(options));
}

const getCookie = (cookie_name) =>{
  const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
  try{
    return document.cookie.match(re)[0];  // Will raise TypeError if cookie is not found
  }catch{
    return "this-cookie-doesn't-exist";
  }
}

const updateOptions = (options) => {
    const update = { ...options };
    if (getCookie("id_token")) {
      update.headers = {
        ...update.headers,
        Authorization: `Bearer ${getCookie("id_token")}`,
      };
    }
    return update;
}

const get = async (endpoint) => {
    console.log(url+endpoint)
    const response = await fetcher(url+endpoint, {
      method: 'GET',
      headers
    })
  return await response.json()
}

const post = async (endpoint,body) => {
  console.log(url+endpoint)
  const response = await fetcher(url+endpoint, {
    method: 'POST',
    body:body,
    headers
  })
return await response.json()
}

export const http = {
  get,post
}