let cart = [];
let discount = 0;
let appliedCoupon = "";

// =======================
// ADD TO CART
// =======================
function addToCart(name, price) {
  const item = cart.find(p => p.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
}

// =======================
// UPDATE CART UI
// =======================
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <li>
        ${item.name} - ₹${item.price}
        <div>
          <button onclick="changeQty(${index}, -1)">-</button>
          <input type="number" value="${item.qty}" min="1" onchange="setQty(${index}, this.value)">
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">❌</button>
        </div>
      </li>
    `;
  });

  cartCount.innerText = count;

  // Apply discount
  let finalTotal = total;

  if (appliedCoupon) {
    if (appliedCoupon === "SAVE10") {
      discount = total * 0.10;
    } else if (appliedCoupon.endsWith("20")) {
      discount = total * 0.20;
    } else {
      discount = 0;
    }
    finalTotal = total - discount;
  }

  document.getElementById("discount").innerText = `Discount: ₹${Math.round(discount)}`;
  document.getElementById("total").innerText = `Total: ₹${Math.round(finalTotal)}`;
}

// =======================
// CHANGE QTY (+ / -)
// =======================
function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

// =======================
// SET QTY (INPUT)
// =======================
function setQty(index, value) {
  const qty = parseInt(value);

  if (qty <= 0 || isNaN(qty)) {
    cart.splice(index, 1);
  } else {
    cart[index].qty = qty;
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
  appliedCoupon = "";

  document.getElementById("applied-coupon").innerText = "";
  document.getElementById("coupon").value = "";

  updateCart();
}

// =======================
// COUPON SYSTEM
// =======================
function applyCoupon() {
  const code = document.getElementById("coupon").value.trim().toUpperCase();

  if (!code) return;

  if (code === "SAVE10" || code.endsWith("20")) {
    appliedCoupon = code;
    document.getElementById("applied-coupon").innerText = `Applied: ${code}`;
  } else {
    appliedCoupon = "";
    discount = 0;
    document.getElementById("applied-coupon").innerText = "Invalid Coupon";
  }

  updateCart();
}

// =======================
// IMAGE SWAP
// =======================
function swapImg(id, src) {
  document.getElementById(id).src = src;
}

// =======================
// CHECKOUT (TEMP)
// =======================
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("Proceeding to payment (integration pending)");
}