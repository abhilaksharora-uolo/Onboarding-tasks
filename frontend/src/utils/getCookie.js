export const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const cookiePair = cookie.split("=");
    const cookieName = cookiePair[0].trim();
    if (cookieName === name) {
      return cookiePair[1];
    }
  }
  return null;
};
