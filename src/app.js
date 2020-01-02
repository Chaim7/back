import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:9090'
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
