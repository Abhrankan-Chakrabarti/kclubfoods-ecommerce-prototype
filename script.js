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

function clearCart() {
  cart = [];
  discount = 0;
  appliedCode = "";
  updateCart();
}

function applyCoupon() {
  const code = document.getElementById("coupon").value.toUpperCase();

  if (code === "SAVE10") discount = 0.1;
  else {
    const match = code.match(/(\d+)$/);
    discount = match ? parseInt(match[1]) / 100 : 0;
  }

  appliedCode = code;
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const discountEl = document.getElementById("discount");

  list.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerText = `${item.name} x${item.quantity}`;
    list.appendChild(li);
  });

  let final = total - (discount < 1 ? total * discount : discount);
  if (final < 0) final = 0;

  discountEl.innerText = `Discount: ₹${Math.round(total-final)}`;
  totalEl.innerText = `Total: ₹${Math.round(final)}`;
}

function checkout() {
  alert("Payment integration coming soon.");
}