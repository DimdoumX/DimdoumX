let cart = [];

// تحميل السلة من localStorage إذا كانت موجودة
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  updateCart();
}

// عناصر DOM
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("total");
const toggleCartBtn = document.getElementById("toggleCartBtn");
const cartContainer = document.getElementById("cartContainer");

// تبديل إظهار وإخفاء السلة عند الضغط على الزر
toggleCartBtn.addEventListener("click", () => {
  if (cartContainer.style.display === "none" || cartContainer.style.display === "") {
    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
});

// إضافة منتج للسلة
function addToCart(name, price) {
  // ابحث إذا المنتج موجود مسبقاً
  const existingIndex = cart.findIndex(item => item.name === name);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  updateCart();
}

// حذف منتج من السلة
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

// تحديث عرض السلة
function updateCart() {
  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach((item, index) => {
    sum += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} × ${item.quantity} - ${item.price * item.quantity} د.ج
      <button onclick="removeFromCart(${index})">حذف</button>
    `;
    cartItems.appendChild(li);
  });

  total.textContent = sum;
}

// حفظ السلة في localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
