let cart = [];
let discount = 0;
let appliedCode = "";

function swapImg(id, src) {
  document.getElementById(id).src = src;
}

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
  if (item && item.quantity > 1) item.quantity--;
  else removeFromCart(name);
  updateCart();
}

function applyCoupon() {
  const code = document.getElementById("coupon").value.trim().toUpperCase();
  if (code === "SAVE10") { discount = 0.10; appliedCode = code; }
  else if (code.match(/[A-Z]+\d+$/)) {
    discount = parseInt(code.match(/\d+$/)) / 100;
    appliedCode = code;
  } else { alert("Invalid Coupon"); return; }
  updateCart();
}

function clearCart() { cart = []; discount = 0; appliedCode = ""; updateCart(); }

function updateCart() {
  const list = document.getElementById("cart-items");
  let subtotal = 0;
  let count = 0;

  list.innerHTML = "";
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    count += item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <div>
        <button onclick="decreaseQuantity('${item.name}')">-</button>
        <button onclick="addToCart('${item.name}', ${item.price})">+</button>
        <button onclick="removeFromCart('${item.name}')">❌</button>
      </div>
      <span>₹${item.price * item.quantity}</span>
    `;
    list.appendChild(li);
  });

  const savings = subtotal * discount;
  document.getElementById("total").innerText = `Total: ₹${Math.round(subtotal - savings)}`;
  document.getElementById("discount").innerText = `Discount: ₹${Math.round(savings)}`;
  document.getElementById("cart-count").innerText = count;
  document.getElementById("applied-coupon").innerText = appliedCode ? `Code: ${appliedCode}` : "";
}

function checkout() { alert("Ready to order? Integration coming soon!"); }
