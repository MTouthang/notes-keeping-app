export const setCookie = (userToken) => {
  document.cookie = `token=${userToken};expires=${new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000
  )}`;
};

export const clearCookie = () => {
  document.cookie = `token="";expires=${new Date(0).toUTCString()}`;
};

export const getToken = () => {
  let cookieArray = document.cookie.split(";");

  const token = cookieArray.filter((item) => {
    return item.includes("token");
  });
  return token[0].trim().slice(6);
};
