// =======================
// DANH SÁCH SẢN PHẨM
// =======================

let products = [
  { id: "P001", name: "Luffy", image: "asset/mohinh1.jpeg", non: true },
  { id: "P002", name: "Zoro", image: "asset/mohinh2.jpg", price: 100 },
  { id: "P003", name: "Katakuri", image: "asset/mohinh3.jpeg", price: 125 },
  { id: "P004", name: "Sanji", image: "asset/mohinh4.jpg", price: 150 },
  { id: "P005", name: "Kizaru", image: "asset/mohinh5.avif", price: 180 },
  { id: "P006", name: "Marco", image: "asset/mohinh6.webp", price: 220 },
];

// TH1
products[0].price = 200;
delete products[0].non;

let newObj = {
  id: "P009",
  name: "WhiteBeard",
  image: "asset/mohinh9.jpeg",
  price: 100,
};

products.push(newObj);

// =======================
// GIỎ HÀNG
// =======================

let carts = [];

// =======================
// HIỂN THỊ SẢN PHẨM
// =======================

function createItem(product) {
  let newDiv = document.createElement("div");
  newDiv.className = "item";

  let img = document.createElement("img");
  img.src = product.image;

  let name = document.createElement("h4");
  name.innerText = product.name;

  let price = document.createElement("p");
  price.innerText = "Giá: $" + product.price;

  let btn = document.createElement("button");
  btn.innerText = "Mua";

  btn.onclick = function () {
    addToCart(product.id);
  };

  newDiv.appendChild(img);
  newDiv.appendChild(name);
  newDiv.appendChild(price);
  newDiv.appendChild(btn);

  return newDiv;
}

function showProduct(arr) {
  let productList = document.getElementById("product-ls");
  productList.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    let item = createItem(arr[i]);
    productList.appendChild(item);
  }
}

showProduct(products);

// =======================
// THÊM VÀO GIỎ HÀNG
// =======================

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  const exist = carts.find((item) => item.id === productId);

  if (exist) {
    exist.quant += 1;
  } else {
    carts.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quant: 1,
    });
  }

  showCart(carts);
}

// =======================
// HIỂN THỊ GIỎ HÀNG
// =======================

function showCart(products) {
  const cartList = document.getElementById("cart-ls");
  cartList.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const tr = document.createElement("tr");
    tr.classList.add("tbl-row");
    tr.id = product.id;

    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center;">
          <img src="${product.image}" style="width: 50px; margin-right: 10px;">
          <span>${product.name}</span>
        </div>
      </td>
      <td style="text-align: center; font-weight: bold;">$${product.price}</td>
      <td>
        <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
          <button onclick="minusOneInRow(this)">-</button>
          <span class="countBox">${product.quant}</span>
          <button onclick="addOneInRow(this)">+</button>
          <button onclick="deleteRow(this)">Xóa</button>
        </div>
      </td>
    `;

    cartList.appendChild(tr);
  }
}

// =======================
// XÓA
// =======================

function deleteRow(btn) {
  const row = btn.closest(".tbl-row");
  const id = row.id;

  carts = carts.filter((item) => item.id !== id);

  showCart(carts);
}

// =======================
// TĂNG
// =======================

function addOneInRow(btn) {
  const row = btn.closest(".tbl-row");
  const id = row.id;

  carts = carts.map((item) => {
    if (item.id === id) {
      item.quant += 1;
    }
    return item;
  });

  showCart(carts);
}

// =======================
// GIẢM
// =======================

function minusOneInRow(btn) {
  const row = btn.closest(".tbl-row");
  const id = row.id;

  const item = carts.find((item) => item.id === id);

  if (item.quant <= 1) {
    carts = carts.filter((item) => item.id !== id);
  } else {
    item.quant -= 1;
  }

  showCart(carts);
}
