//prod
const products = [
  {id:1, name:"Laptop", price:800, category:"Electronics", image:"images/laptop.jpg"},
  {id:2, name:"Phone", price:500, category:"Electronics", image:"images/phone.jpg"},
  {id:3, name:"Shoes", price:70, category:"Fashion", image:"images/shoes.jpg"},
  {id:4, name:"T-shirt", price:30, category:"Fashion", image:"images/tshirt.jpg"},
  {id:5, name:"Book", price:20, category:"Books", image:"images/book.jpg"},
  {id:6, name:"Headphones", price:100, category:"Electronics", image:"images/headphones.jpg"}
];






//load cart
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
} catch(e) {
  cart = [];
}






//update cat
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) {
    count.innerText = "Cart (" + cart.length + ")";
  }
}





//disply prod
function displayProducts(items) {
  const list = document.getElementById("product-list");
  if (!list) return;

  list.innerHTML = "";

  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    list.appendChild(div);
  });
}




//Add cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push({...product, quantity:1});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}



//filter cart
function filterCategory(cat) {
  if (cat === "All") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === cat);
    displayProducts(filtered);
  }
}




//serching
function setupSearch() {
  const search = document.getElementById("search");
  if (!search) return;

  search.addEventListener("keyup", function() {
    const value = this.value.toLowerCase();

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
  });
}




//disply cart
function displayCart() {
  const container = document.getElementById("cart-items");
  const totalText = document.getElementById("total");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>${item.price} x ${item.quantity}</p>
      <button onclick="increase(${index})">+</button>
      <button onclick="decrease(${index})">-</button>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    container.appendChild(div);
  });

  if (totalText) {
    totalText.innerText = "Total: $" + total;
  }
}





// cart func
function increase(i) {
  cart[i].quantity++;
  saveCart();
}

function decrease(i) {
  try {
    if (cart[i].quantity <= 1) {
      throw "Cannot go below 1";
    }
    cart[i].quantity--;
    saveCart();
  } catch(err) {
    alert(err);
  }
}

function removeItem(i) {
  cart.splice(i,1);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}




// checkout
function setupCheckout() {
  const form = document.getElementById("form");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    try {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;

      if (!name || !email || !phone || !address) {
        throw "Fill all fields";
      }

      if (!email.includes("@")) {
        throw "Invalid email";
      }

      if (phone.length < 10) {
        throw "Invalid phone";
      }

      if (cart.length === 0) {
        throw "Cart empty";
      }

      alert("Order placed");

      localStorage.removeItem("cart");

    } catch(error) {
      alert(error);
    }
  });
}




// run func
displayProducts(products);
updateCartCount();
setupSearch();
displayCart();
setupCheckout();