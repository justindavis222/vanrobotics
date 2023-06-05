let apiUrl = process.env.REACT_APP_API_URL;

const usingHTTPS = window.location.protocol === "https:";
if (!usingHTTPS) {
  apiUrl = apiUrl.replace("https", "http");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  apiUrl: apiUrl,
};
