let cart = [];
let discount = 0;
let appliedCode = "";

function swapImg(id, src) {
  const img = document.getElementById(id);
  if (img) img.src = src;
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) item.quantity++;
  else cart.push({ name, price, quantity: 1 });
  updateCart();
}

function clearCart() {
  cart = [];
  discount = 0;
  appliedCode = "";
  updateCart();
}

function applyCoupon() {
  const input = document.getElementById("coupon");
  if (!input) return;

  const code = input.value.trim().toUpperCase();

  const fixedCoupons = {
    "SAVE10": 0.10,
    "FLAT50": 50
  };

  const influencerMatch = code.match(/^([A-Z]+)(\d{1,2})$/);

  if (fixedCoupons[code]) {
    discount = fixedCoupons[code];
    appliedCode = code;
  } 
  else if (influencerMatch) {
    const percent = parseInt(influencerMatch[2]);

    if (percent > 50) {
      alert("Invalid coupon");
      discount = 0;
      appliedCode = "";
      updateCart();
      return;
    }

    discount = percent / 100;
    appliedCode = code;
  } 
  else {
    alert("Invalid coupon");
    discount = 0;
    appliedCode = "";
  }

  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const discountEl = document.getElementById("discount");
  const appliedEl = document.getElementById("applied-coupon");
  const countEl = document.getElementById("cart-count");

  if (!list || !totalEl || !discountEl) return;

  list.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const li = document.createElement("li");
    li.innerText = `${item.name} x${item.quantity}`;
    list.appendChild(li);
  });

  let final = total - (discount < 1 ? total * discount : discount);
  if (final < 0) final = 0;

  discountEl.innerText = `Discount: ₹${Math.round(total - final)}`;
  totalEl.innerText = `Total: ₹${Math.round(final)}`;

  if (appliedEl) {
    appliedEl.innerText = appliedCode ? `Applied: ${appliedCode}` : "";
  }

  if (countEl) {
    countEl.innerText = count;
  }
}

function checkout() {
  alert("Payment integration coming soon.");
}