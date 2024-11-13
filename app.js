// Sample product data
const products = [
  {
      id: 1,
      name: "In Love With You",
      price: 140.00,
      description: "A romantic and floral fragrance.",
      image: "https://i.makeupstore.de/r/rd/rdppgfypx7b1.jpg",
  },
  {
      id: 2,
      name: "Because It's You",
      price: 79.00,
      description: "A sweet and fruity fragrance.",
      image: "https://m.media-amazon.com/images/I/61XAym-FT2L.jpg",
  },
  {
      id: 3,
      name: "Stronger With You",
      price: 99.00,
      description: "A spicy and woody fragrance.",
      image: "https://i1.perfumesclub.com/grande/108209-3.jpg",
  }
];

// Function to render products dynamically
function renderProducts(productArray) {
  const productList = document.getElementById("productList");
  
  // Clear any existing products to avoid duplicates
  productList.innerHTML = "";

  // Loop through each product and create HTML elements
  productArray.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("image-box");

      // Add product image, name, price, and button
      productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="300" height="250" />
          <p>${product.name}</p>
          <p class="product-price">€${product.price.toFixed(2)}</p> <!-- Display price with Euro sign -->
          <div class="item-selection">
              <input type="number" value="1" min="1" id="item${product.id}-quantity" />
              <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
      `;
      
      // Append the product element to the product list
      productList.appendChild(productElement);
  });
}

// Initial render of products when the page loads
document.addEventListener("DOMContentLoaded", function () {
  renderProducts(products); // Render all products initially

  // Event listener for sorting
  const sortDropdown = document.getElementById("sort");
  sortDropdown.addEventListener("change", function () {
      const sortBy = sortDropdown.value;

      let sortedProducts;
      
      // Sorting based on the selected value
      if (sortBy === "asc") {
          sortedProducts = [...products].sort((a, b) => a.price - b.price); // Low to high price
      } else if (sortBy === "desc") {
          sortedProducts = [...products].sort((a, b) => b.price - a.price); // High to low price
      } else if (sortBy === "name") {
          sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
      }

      renderProducts(sortedProducts); // Render the sorted products
  });
});

  // Cart to store added products
  const cartItems = [];
  
  // Function to generate and display the products dynamically
  document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList"); // Ensure you have an element with this id in HTML
  
    // Loop through each product and create HTML elements
    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("image-box");
  
      // Add product image, name, price, and quantity input dynamically
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="300" height="250" />
        <p>${product.name}</p>
        <p class="product-price">${product.price}</p>
        <div class="item-selection">
            <input type="number" value="1" min="1" id="item${product.id}-quantity" />
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `;
  
      // Append product to the product list
      productList.appendChild(productElement);
    });
  });
  
  // Function to add products to the cart
  function addToCart(productId) {
    // Find the product by ID
    const product = products.find(p => p.id === productId);
    const quantity = document.getElementById(`item${productId}-quantity`).value;
  
    // Add product to the cart with the selected quantity
    cartItems.push({
      name: product.name,
      price: product.price,
      quantity: quantity
    });
  
    // Display confirmation message
   // displayConfirmation(product.name, quantity);
   // updateCartDisplay();
  }
  
  // Function to display the confirmation message when an item is added to the cart
  function displayConfirmation(productName, quantity) {
    const confirmation = document.createElement("div");
    confirmation.className = "confirmation-message";
    confirmation.textContent = `${productName} (x${quantity}) has been added to the cart.`;
    document.body.appendChild(confirmation);
  
    // Remove confirmation message after 3 seconds
    setTimeout(() => {
      confirmation.remove();
    }, 3000);
  }
  
  // Function to update the cart display
  function updateCartDisplay() {
    const cartDisplay = document.querySelector(".modal-cart-content p");
    
    if (cartItems.length === 0) {
      cartDisplay.textContent = "Your cart is empty.";
    } else {
      let cartContent = "<ul>";
      cartItems.forEach(item => {
        cartContent += `<li>${item.name} - ${item.price} (x${item.quantity})</li>`;
      });
      cartContent += "</ul>";
      cartDisplay.innerHTML = cartContent;
    }
  }
  
  // Modal Cart Functionality
  const modal = document.getElementById("modalCart");
  const cartLink = document.getElementById("cartLink");
  const closeBtn = document.getElementsByClassName("modal-cart-close")[0];
  
  // Open cart modal
  cartLink.onclick = function () {
    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    updateCartDisplay(); // Refresh cart display every time it's opened
  };
  
  // Close cart modal
  closeBtn.onclick = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  };
  
  // Close cart modal if user clicks outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  };
  