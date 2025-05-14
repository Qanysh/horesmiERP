export const setAuthData = (data) => {
  localStorage.setItem("authenticated", "true");
  localStorage.setItem("user", JSON.stringify(data));
};

export const clearAuthData = () => {
  localStorage.removeItem("authenticated");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return localStorage.getItem("authenticated") === "true";
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
