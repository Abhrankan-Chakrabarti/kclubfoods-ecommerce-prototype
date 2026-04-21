let cart = [];
let discount = 0;
let appliedCode = "";

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
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
  if (item.quantity <= 0) {
    removeFromCart(name);
  } else {
    updateCart();
  }
}

function updateQuantity(name, value) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  const qty = parseInt(value);
  if (isNaN(qty) || qty <= 0) {
    removeFromCart(name);
  } else {
    item.quantity = qty;
    updateCart();
  }
}

function clearCart() {
  cart = [];
  discount = 0;
  appliedCode = "";
  updateCart();
}

function applyCoupon() {
  const code = document.getElementById("coupon").value.trim().toUpperCase();

  if (code === "SAVE10") {
    discount = 0.10;
    appliedCode = code;
    alert("10% discount applied!");
  } 
  else if (code === "FLAT50") {
    discount = 50;
    appliedCode = code;
    alert("₹50 discount applied!");
  } 
  else {
    // Regex to handle influencer codes like STEFAN20 or PRIYA15
    const match = code.match(/([A-Z]+)(\d+)$/);

    if (match) {
      const percent = parseInt(match[2]);
      if (percent > 0 && percent <= 90) {
        discount = percent / 100;
        appliedCode = code;
        alert(`${percent}% influencer discount applied!`);
      } else {
        resetCoupon();
      }
    } else {
      resetCoupon();
    }
  }
  updateCart();
}

function resetCoupon() {
  discount = 0;
  appliedCode = "";
  alert("Invalid coupon code");
}

function updateCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const discountEl = document.getElementById("discount");
  const countEl = document.getElementById("cart-count");
  const appliedEl = document.getElementById("applied-coupon");

  list.innerHTML = "";
  let subtotal = 0;
  let count = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    count += item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <div style="flex:1"><strong>${item.name}</strong><br><small>₹${item.price} each</small></div>
      <div style="display:flex; align-items:center;">
        <button onclick="decreaseQuantity('${item.name}')">➖</button>
        <input type="number" value="${item.quantity}" onchange="updateQuantity('${item.name}', this.value)">
        <button onclick="addToCart('${item.name}', ${item.price})">➕</button>
      </div>
      <div style="width:100px; text-align:right;">₹${item.price * item.quantity}</div>
      <button onclick="removeFromCart('${item.name}')" style="background:transparent; color:red; margin-left:10px;">✕</button>
    `;
    list.appendChild(li);
  });

  let savings = 0;
  if (discount > 0 && discount < 1) {
    savings = subtotal * discount;
  } else if (discount >= 1) {
    savings = discount;
  }

  const finalTotal = Math.max(0, subtotal - savings);

  discountEl.innerText = `Discount: -₹${Math.round(savings)}`;
  totalEl.innerText = `Total: ₹${Math.round(finalTotal)}`;
  countEl.innerText = count;
  appliedEl.innerText = appliedCode ? `Applied Coupon: ${appliedCode}` : "";
}

function checkout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  alert("Order received! This is a prototype; payment gateway integration coming soon.");
}
