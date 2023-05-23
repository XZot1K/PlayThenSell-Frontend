import api from "../../api/axiosconfig";

export function getPublicContent() {
  return api.get("/api/users/all");
}

export function getUserBoard() {
  return api.get("/api/users/user", { headers: authHeader() });
}

export function getModeratorBoard() {
  return api.get("/api/users/mod", { headers: authHeader() });
}

export function getAdminBoard() {
  return api.get("/api/users/admin", { headers: authHeader() });
}

function UserService() {}

export default UserService;
