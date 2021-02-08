import { config } from "./config";
import fetch from "isomorphic-fetch";

function callApi(endpoint, method, data) {
  const fullUrl =
    endpoint.indexOf(config.apiLink) === -1
      ? config.apiLink + endpoint
      : endpoint;

  return fetch(fullUrl, {
    method: method ? method : "GET",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json().then((json) => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return Object.assign({}, json);
    })
    .then(
      (response) => ({ response }),
      (error) => ({ error: error.message || "Something bad happened" })
    );
}

export const fetchStatus = () => callApi(``);
export const fetchScore = () => callApi(`score`);
export const resetScore = () => callApi(`score/reset`, "POST");
export const fetchGame = () => callApi(`game`);
export const fetchNextGame = () => callApi(`game/next`);
export const fetchResetGame = () => callApi(`game/reset`, "POST");
export const fetchGameMove = (data) =>
  callApi(`game/move`, "POST", { index: data.index });
