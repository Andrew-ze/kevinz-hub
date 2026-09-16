const money = value => `UGX ${Number(value).toLocaleString()}`;

async function getJSON(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}
function productCard(product) {
  const message = encodeURIComponent(
    `Hello Kevinz Hub, I am interested in ${product.name}. Please provide more details.`
  );

  return `
    <article class="card">
      <img
        src="${product.image_url || 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=700&q=80'}"
        alt="${product.name}"
      >

      <div class="card-body">
        <p class="muted">${product.category}</p>

        <h3>${product.name}</h3>

        <p>${product.description || ""}</p>

        <div class="price">${money(product.price)}</div>

        <button
          class="btn"
          onclick='addToCart(${JSON.stringify(product)})'
        >
          Add to Cart
        </button>

        <a
          class="btn secondary"
          href="https://wa.me/256755134204?text=${message}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ask on WhatsApp
        </a>
      </div>
    </article>
  `;
}


function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("kevinz_cart") || "[]");
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  localStorage.setItem("kevinz_cart", JSON.stringify(cart));
  alert("Product added to cart.");
}

function getCart() {
  return JSON.parse(localStorage.getItem("kevinz_cart") || "[]");
}

function clearCart() {
  localStorage.removeItem("kevinz_cart");
}
