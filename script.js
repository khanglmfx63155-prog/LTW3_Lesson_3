let products = [
  { id: "P001", name: "Luffy ", image: "asset/mohinh1.jpeg", non: true },
  { id: "P002", name: "Zoro", image: "asset/mohinh2.jpg", price: 100 },
  { id: "P003", name: "Katakuri", image: "asset/mohinh3.jpeg", price: 125 },
  { id: "P004", name: "Sanji", image: "asset/mohinh4.jpg", price: 150 },
  { id: "P005", name: "Kizaru", image: "asset/mohinh5.avif", price: 180 },
  { id: "P006", name: "Marco", image: "asset/mohinh6.webp", price: 220 },
];

products[0].price = 200;

delete products[0].non;

let newObj = {
  id: "P009",
  name: "WhiteBeard",
  image: "asset/mohinh9.jpeg",
  price: 100,
};

products.push(newObj);

// Lấy dữ liệu từ localStorage, nếu không có thì lấy mảng rỗng
let carts = JSON.parse(localStorage.getItem("cart")) || [];

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
  btn.id = product.id;
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

function addToCart(productId) {
  // Lấy dữ liệu từ localStorage, nếu không có thì lấy mảng rỗng
  let carts = JSON.parse(localStorage.getItem("cart")) || [];

  // Tìm sản phẩm trong mảng products
  const product = products.find((p) => p.id === productId);

  // Tìm sản phẩm trong mảng carts
  const exist = carts.find((item) => item.id === productId);

  // Nếu sản phẩm đã có trong giỏ hàng thì tăng số lượng
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

  // Lưu dữ liệu vào localStorage
  localStorage.setItem("cart", JSON.stringify(carts));
  alert("Sản phẩm đã được đưa vào giỏ hàng!");
}

function changeTab() {}
