const USER = "USER";
const LIKE = "LIKE";
export const localServ = {
  user: {
    set: (data) => {
      let jsonData = JSON.stringify(data);
      localStorage.setItem(USER, jsonData);
    },
    get: () => {
      let jsonData = localStorage.getItem(USER);
      if (jsonData) {
        return JSON.parse(jsonData);
      } else {
        return null;
      }
    },
    remove: () => {
      localStorage.removeItem(USER);
    },
  },
};
export const localLike = {
  like: {
    set: (data) => {
      let jsonData = JSON.stringify(data);

      localStorage.setItem(LIKE, jsonData);
    },
    get: () => {
      let jsonData = localStorage.getItem(LIKE);
      if (jsonData) {
        return JSON.parse(jsonData);
      } else {
        return [];
      }
    },
    remove: () => {
      localStorage.removeItem(LIKE);
    },
  },
};
