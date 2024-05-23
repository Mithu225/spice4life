import { NOROFF_USER_INFO } from "./constants.js";
import { getValueFromStore, logout } from "./core.js";

export function renderHeader() {
  const userInfo = getValueFromStore(NOROFF_USER_INFO);
  const userName = userInfo?.name;

  const headerHTML = `
    <div class="header-container">
        <div class="header-bar">
          <div class="header-menu">
            <ul class="menu-bar">
              <a class="menu-bar-item" href="/index.html">Home</a>

              <a class="menu-bar-item" href="/about.html">About</a>

              <a class="menu-bar-item" href="/recipes/recipes.html">Recipes</a>

              ${
                userName
                  ? `<button id="logout" class="button menu-bar-item" type="button">
                    Logout
                  </button>`
                  : `<a class="menu-bar-item" href="/account/register.html">
                    Register
                  </a>`
              }
            </ul>
          </div>
          ${
            userName
              ? `<div class="button-index">
                <a class="button button-login" href="/post/index.html">
                  Hello ${userName} | Admin panel
                </a>
              </div>`
              : `<div class="button-index">
                <a class="button button-login" href="/account/login.html">
                  LOGIN
                </a>
              </div>`
          }
          
          <div class="social-icon">
            <ion-icon size="large" name="logo-facebook"></ion-icon>
            <ion-icon size="large" name="logo-google"></ion-icon>
            <ion-icon size="large" name="logo-twitter"></ion-icon>
            <ion-icon size="large" name="logo-instagram"></ion-icon>
          </div>
        </div>
        <div class="header-logo">
          <img src="../assets/footer-logo.png" alt="Header logo" />
        </div>
      </div>
 `;

  const headerElm = document.querySelector("header");
  headerElm.innerHTML = headerHTML;

  if (userName) {
    const logoutElm = document.querySelector("#logout");
    logoutElm.addEventListener("click", logout);
  }
}
