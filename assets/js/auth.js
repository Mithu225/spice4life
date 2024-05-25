import { NOROFF_USER_INFO } from "./constants.js";
import { getValueFromStore, navigate } from "./core.js";

export function checkAuth() {
  const accessToken = getValueFromStore(NOROFF_USER_INFO)?.accessToken;
  if (!accessToken) {
    navigate("/account/login.html");
  } else {
    return true;
  }
}
