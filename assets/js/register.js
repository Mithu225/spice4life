import { fetchAPI, showMessage, hideMessage } from "./core.js";

const registerSubmitBtnElm = document.querySelector("#register-submit-button");

registerSubmitBtnElm.addEventListener("click", async (e) => {
  e.preventDefault();
  hideMessage();
  const registerNameValue = document.querySelector("#register-name").value;
  const registerEmailValue = document.querySelector("#register-email").value;
  const registerPasswordValue =
    document.querySelector("#register-password").value;

  if (
    registerEmailValue == "" ||
    registerPasswordValue == "" ||
    registerNameValue == ""
  ) {
    showMessage("Name, email and password should be filled", "error");
  } else {
    try {
      const data = await fetchAPI("/auth/register", "POST", {
        body: JSON.stringify({
          name: registerNameValue,
          email: registerEmailValue,
          password: registerPasswordValue,
        }),
      });
      
      showMessage("Your info is created");
    } catch (error) {
      showMessage(error.data.errors[0].message, "error");
    }
  }
});
