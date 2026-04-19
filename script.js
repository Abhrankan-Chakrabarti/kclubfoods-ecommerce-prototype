let cart = [];
let discount = 0;

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });

  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  updateCart();
}

function decreaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  item.quantity--;
  if (item.quantity <= 0) removeFromCart(name);
  else updateCart();
}

function updateQuantity(name, value) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  const qty = parseInt(value);
  if (isNaN(qty) || qty <= 0) removeFromCart(name);
  else {
    item.quantity = qty;
    updateCart();
  }
}

function clearCart() {
  cart = [];
  updateCart();
}

function applyCoupon() {
  const code = document.getElementById("coupon").value.toUpperCase();

  if (code === "SAVE10") discount = 0.1;
  else if (code === "FLAT50") discount = 50;
  else {
    discount = 0;
    alert("Invalid coupon");
  }

  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const discountEl = document.getElementById("discount");
  const countEl = document.getElementById("cart-count");

  list.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name}
      <button onclick="decreaseQuantity('${item.name}')">➖</button>
      <input type="number" value="${item.quantity}" min="1"
        onchange="updateQuantity('${item.name}', this.value)">
      <button onclick="addToCart('${item.name}', ${item.price})">➕</button>
      = ₹${item.price * item.quantity}
      <button onclick="removeFromCart('${item.name}')">❌</button>
    `;
    list.appendChild(li);
  });

  let finalTotal = total;

  if (discount < 1) finalTotal -= total * discount;
  else finalTotal -= discount;

  if (finalTotal < 0) finalTotal = 0;

  discountEl.innerText = `Discount: ₹${Math.round(total - finalTotal)}`;
  totalEl.innerText = `Total: ₹${Math.round(finalTotal)}`;
  countEl.innerText = count;
}

function checkout() {
  alert("Prototype only. Payment integration coming later.");
}