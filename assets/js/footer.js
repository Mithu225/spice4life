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
          <div>
            <a class="button button-login" href="/thank-subscribe.html">FOLLOW US</a>
          </div>

          <div class="social-icon">
            <ion-icon size="large" name="logo-facebook"></ion-icon>
            <ion-icon size="large" name="logo-google"></ion-icon>
            <ion-icon size="large" name="logo-twitter"></ion-icon>
            <ion-icon size="large" name="logo-instagram"></ion-icon>
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
