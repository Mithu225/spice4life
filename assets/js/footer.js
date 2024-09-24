export function renderFooter() {
  const footerHTML = `
    <div class="footer-bar">
        <div>
          <img
            class="footer-logo"
            src="../assets/footer-logo.png"
            alt="Footer blog logo "
          />
        </div>
        <div class="footer-right">
          <div class="social-icon">
            <ion-icon size="large" name="logo-facebook" color="favorite"></ion-icon>
            <ion-icon size="large" name="logo-google" color="favorite"></ion-icon>
            <ion-icon size="large" name="logo-twitter" color="favorite"></ion-icon>
            <ion-icon size="large" name="logo-instagram" color="favorite"></ion-icon>
          </div>
          <div>
            <p class="copyright">
              Copyright © 2024 spice4life, developed by Thu Huynh.
            </p>
          </div>
        </div>
      </div>
 `;

  const footerElm = document.querySelector("footer");
  footerElm.innerHTML = footerHTML;
}
