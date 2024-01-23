// This is the modified code to implement shopping cart functionality
// You can modify this code

// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Event listener for adding items to the cart
productList.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Event listener for clearing the cart
clearCartBtn.addEventListener("click", clearCart);

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
  cartData.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id === productId);

  if (selectedProduct) {
    const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
    cartData.push(selectedProduct);
    sessionStorage.setItem("cart", JSON.stringify(cartData));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
  const updatedCart = cartData.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  cartList.innerHTML = "";
}

// Initial render
renderProducts();
renderCart();
