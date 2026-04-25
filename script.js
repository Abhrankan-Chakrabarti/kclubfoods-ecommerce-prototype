let cart = [];
let discount = 0;
let appliedCode = "";

// =======================
// IMAGE SWAP
// =======================
function swapImg(id, src) {
  document.getElementById(id).src = src;
}

// =======================
// ADD TO CART
// =======================
function addToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });

  updateCart();
}

// =======================
// UPDATE CART
// =======================
function updateCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const discountEl = document.getElementById("discount");
  const countEl = document.getElementById("cart-count");

  list.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <div>
        <button onclick="changeQty(${index}, -1)">-</button>
        <input type="number" value="${item.quantity}" min="1" onchange="setQty(${index}, this.value)">
        <button onclick="changeQty(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });

  // Apply discount
  let final = total;

  if (appliedCode) {
    final = total - (total * discount);
  }

  if (final < 0) final = 0;

  discountEl.innerText = `Discount: ₹${Math.round(total - final)}`;
  totalEl.innerText = `Total: ₹${Math.round(final)}`;
  countEl.innerText = count;
}

// =======================
// QUANTITY CONTROL
// =======================
function changeQty(index, delta) {
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

function setQty(index, value) {
  const qty = parseInt(value);

  if (isNaN(qty) || qty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = qty;
  }

  updateCart();
}

// =======================
// REMOVE ITEM
// =======================
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// =======================
// CLEAR CART
// =======================
function clearCart() {
  cart = [];
  discount = 0;
  appliedCode = "";

  document.getElementById("coupon").value = "";
  document.getElementById("applied-coupon").innerText = "";

  updateCart();
}

// =======================
// COUPON SYSTEM
// =======================
function applyCoupon() {
  const code = document.getElementById("coupon").value.trim().toUpperCase();
  const appliedText = document.getElementById("applied-coupon");

  if (!code) return;

  // Fixed coupon
  if (code === "SAVE10") {
    discount = 0.10;
    appliedCode = code;
    appliedText.innerText = "SAVE10 applied (10% off)";
  }

  // Influencer coupons like XYZ20
  else if (/^[A-Z]+20$/.test(code)) {
    discount = 0.20;
    appliedCode = code;
    appliedText.innerText = `${code} applied (20% off)`;
  }

  else {
    discount = 0;
    appliedCode = "";
    appliedText.innerText = "Invalid coupon";
  }

  updateCart();
}

// =======================
// CHECKOUT
// =======================
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("Proceeding to payment (integration pending)");
}