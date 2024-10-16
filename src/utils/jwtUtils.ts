import { jwtDecode } from "jwt-decode";

const isValidToken = (token: string) => {
  if (!token) return false;
  const decoded = jwtDecode<{ exp: number }>(token);
  return decoded.exp ? decoded.exp > Date.now() / 1000 : false;
};

const setSession = (accessToken: string | null, refreshToken?: string) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export { setSession, isValidToken };
