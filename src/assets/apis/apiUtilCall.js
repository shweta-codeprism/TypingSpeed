import axios from 'axios';

export const getText = (api: string) => {
  return axios.get("http://www.mocky.io/v2/5c371b6230000093001f61e6",).then((response) => {
    if (response.data.text !== undefined) {
      return { text: response.data.text, status: response.status }
    }
    else {
      return { text: "", status: "200"}
    }
  })
    .catch((error: Object) => {
      if (error !== undefined && error !== "" && error.response !== undefined) {
        console.log(error.response.data.status, error.response.data.message);
        return { data: null, status: error.response.data.status, message: error.response.data.message }
      }
      else {
        return { data: null, status: "500", message: "" }
      }
    });
};
