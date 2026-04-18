let cart = [];

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalDisplay = document.getElementById("total");

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`;
    cartItems.appendChild(li);

    total += item.price * item.quantity;
    count += item.quantity;
  });

  cartCount.innerText = count;
  totalDisplay.innerText = `Total: ₹${total}`;
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("Prototype only. Payment integration coming later.");
}