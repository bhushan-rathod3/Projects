document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartCount();
});

// Fetch product details and display in cart
async function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartContainer.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
        cartTotal.textContent = "0.00";
        return;
    }

    for (let productId of cart) {
        const product = await fetchProduct(productId);
        totalPrice += product.price;

        const cartItemHTML = `
            <div class="list-group-item d-flex align-items-center justify-content-between">
                <img src="${product.image}" class="me-3" style="width: 50px; height: 50px; object-fit: contain;">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${product.title}</h6>
                    <p class="mb-0 text-success">$${product.price}</p>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">Remove</button>
            </div>`;
        cartContainer.innerHTML += cartItemHTML;
    }

    cartTotal.textContent = totalPrice.toFixed(2);
}

// Fetch product data from API
function fetchProduct(productId) {
    return fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json());
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Checkout function
function checkout() {
    alert("Checkout feature coming soon!");
    localStorage.removeItem("cart");
    displayCart();
    updateCartCount();
}
