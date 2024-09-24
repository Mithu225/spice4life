import { NOROFF_USER_INFO } from "./constants.js";
import { getValueFromStore, logout } from "./core.js";

export function renderHeader() {
  const userInfo = getValueFromStore(NOROFF_USER_INFO);
  const userName = userInfo?.name;

  const headerHTML = `
    <div class="header-container">
        <div class="header-logo">
          <img src="../assets/footer-logo.png" alt="Header logo" />
        </div>
        <div class="header-bar">
          <div class="social-icon">
            <ion-icon size="large" name="logo-facebook" color="favorite"></ion-icon>
            <ion-icon size="large" name="logo-google" color="favorite"></ion-icon>
            <ion-icon size="large" name="logo-twitter" color="favorite"></ion-icon>
            <ion-icon size="large" name="logo-instagram" color="favorite" ></ion-icon>
          </div>
          <div class="header-menu">
            <ul class="menu-bar">
              <a class="menu-bar-item" href="/index.html">Home</a>

              <a class="menu-bar-item" href="/about.html">About</a>

              <a class="menu-bar-item" href="/recipes/recipes.html">Recipes</a>

              ${
                userName
                  ? `<a id="logout" class="menu-bar-item">
                    Logout
                  </button>`
                  : `<a class="menu-bar-item" href="/account/register.html">
                    Register
                  </a>`
              }

              ${
                userName
                  ? `<a href="/post/index.html" class="menu-bar-item">
                    Hello ${userName} | Admin
                  </button>`
                  : `<a class="menu-bar-item" href="/account/login.html">
                    Login
                  </a>`
              }
            </ul>
          </div>
          
          
         
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
