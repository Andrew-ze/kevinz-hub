document.addEventListener("DOMContentLoaded", () => {
  const footer = document.createElement("footer");

  footer.innerHTML = `
    <div class="footer-container">

      <div class="footer-column">
        <a href="/" class="footer-logo">
          Kevinz Hub
        </a>

        <p>
          Stylish jewelry, beautiful bags and lifestyle accessories
          for everyone and modern customers.
        </p>

        <p class="footer-small">
          © ${new Date().getFullYear()} Kevinz Jewelry and Bags Hub. Your trusted plug
          All rights reserved.
        </p>
      </div>

      <div class="footer-column">
        <h3>Quick Navigation</h3>

        <ul class="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/products.html">Products</a></li>
          <li><a href="/cart.html">Shopping Cart</a></li>
          <li><a href="/checkout.html">Checkout</a></li>
          <li><a href="/contact.html">Contact Us</a></li>
          <li><a href="/login.html">Admin Login</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>Contact & Inquiries</h3>

        <p>
          <strong>Phone:</strong><br>
          <a href="tel:0755134204">0755134204</a><br>
          <a href="tel:0765824970">0765824970</a>
        </p>

        <p>
          <strong>Email:</strong><br>
          <a href="mailto:Kevinkabasiita@gmail.com">
            Kevinkabasiita@gmail.com
          </a>
        </p>

        <div class="social-links">

          <a
            href="https://wa.me/256755134204"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link whatsapp"
            aria-label="Contact Kevinz Hub on WhatsApp"
          >
            <span class="social-icon">◉</span>
            WhatsApp
          </a>

          <a
            href="https://www.tiktok.com/@kevinz.jewery.bag?_r=1&_t=ZS-99m8u3s3gMn"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link tiktok"
            aria-label="Visit Kevinz Hub on TikTok"
          >
            <span class="social-icon">♪</span>
            TikTok
          </a>

        </div>
      </div>

    </div>
  `;

  document.body.appendChild(footer);
});
