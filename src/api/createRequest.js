const createRequest = async (options = {
  url, sendMethod, method, data, callback,
}) => {
  const strRequest = options.url + options.method;

  if (options.sendMethod === 'GET') {
    fetch(strRequest)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        options.callback(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }
};

export default createRequest;
