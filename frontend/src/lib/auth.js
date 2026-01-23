import { clearLocal } from "./storage";

export function logout() {
  clearLocal("token");
  clearLocal("user");
}
