document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    fetchProductDetails(productId);
    updateCartCount();
});

// Fetch and display product details
function fetchProductDetails(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            document.getElementById("product-details").innerHTML = `
                <div class="card mx-auto p-4" style="max-width: 600px;">
                    <img src="${product.image}" class="card-img-top p-3" style="height: 400px; object-fit: contain;">
                    <div class="card-body">
                        <h2 class="card-title">${product.title}</h2>
                        <p class="card-text">${product.description}</p>
                        <h4 class="text-success">$${product.price}</h4>
                        <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>`;
        });
}

// Add product to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}
