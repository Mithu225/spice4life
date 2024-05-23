import {
  fetchAPI,
  showMessage,
  hideMessage,
  setValueToStore,
  navigate,
} from "./core.js";
import { NOROFF_USER_INFO } from "./constants.js";

const loginSubmitBtnElm = document.querySelector("#login-submit-button");

loginSubmitBtnElm.addEventListener("click", async (e) => {
  e.preventDefault();
  hideMessage();

  const loginEmailValue = document.querySelector("#login-email").value;
  const loginPasswordValue = document.querySelector("#login-password").value;

  if (loginEmailValue == "" || loginPasswordValue == "") {
    showMessage("Email and password should be filled", "error");
  } else {
    try {
      const data = await fetchAPI("/auth/login", "POST", {
        body: JSON.stringify({
          email: loginEmailValue,
          password: loginPasswordValue,
        }),
      });
      showMessage("Login is success");
      setValueToStore(NOROFF_USER_INFO, data.data);
      navigate("/post");
    } catch (error) {
      showMessage(error.data.errors[0].message, "error");
    }
  }
});
