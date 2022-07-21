import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

instance.defaults.headers.common["Authorizaion"] = "AUTH TOKEN FORM INSTANCE";

instance.interceptors.request.use((request) => {
  console.log("Custom interceptor", request);
  return request;
});

export default instance;
