/**
 * Created by chalosalvador on 17/2/21
 */

import { api } from "./api";

async function login(data) {
  const response = await api.post("/login", data);

  console.log("response", response);
  // api.defaults.headers.common[
  //   "Authorization"
  // ] = `Bearer ${response.data.token}`;
  // localStorage.setItem("token", response.data.token);
  return response;
}

export const Auth = {
  login,
};
