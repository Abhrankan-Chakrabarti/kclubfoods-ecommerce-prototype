let cart = [];
let discount = 0;

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) item.quantity++;
  else cart.push({name, price, quantity:1});
  updateCart();
}

function clearCart() {
  cart = [];
  discount = 0;
  updateCart();
}

function applyCoupon() {
  const code = document.getElementById("coupon").value.toUpperCase();
  if (code === "SAVE10") discount = 0.1;
  else discount = 0;
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerText = `${item.name} x${item.quantity}`;
    list.appendChild(li);
  });

  let final = total - (total * discount);

  document.getElementById("discount").innerText = `Discount: ₹${Math.round(total-final)}`;
  document.getElementById("total").innerText = `Total: ₹${Math.round(final)}`;
}

function checkout() {
  window.location.href = "https://rzp.io/l/YOUR_PAYMENT_LINK";
}