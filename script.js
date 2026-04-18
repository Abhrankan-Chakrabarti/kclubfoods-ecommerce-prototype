let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  document.getElementById("cart-count").innerText = cart.length;

  const li = document.createElement("li");
  li.innerText = `${name} - ₹${price}`;
  document.getElementById("cart-items").appendChild(li);

  document.getElementById("total").innerText = `Total: ₹${total}`;
}

function checkout() {
  alert("Prototype only. Payment integration coming later.");
}