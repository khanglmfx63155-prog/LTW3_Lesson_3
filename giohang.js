// Lấy dữ liệu từ localStorage, nếu không có thì lấy mảng rỗng
let carts = JSON.parse(localStorage.getItem("cart")) || [];

// Hiển thị giỏ hàng
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
          <button onclick="deleteRow(this)" class="specialbutton">Xóa</button>
        </div>
      </td>
    `;

    cartList.appendChild(tr);
  }
}

showCart(carts);

// Xóa sản phẩm khỏi giỏ hàng
function deleteRow(btn) {
  const row = btn.closest(".tbl-row");
  const id = row.id;

  // Xóa sản phẩm khỏi mảng carts
  carts = carts.filter((item) => item.id !== id);

  // Lưu dữ liệu vào localStorage
  localStorage.setItem("cart", JSON.stringify(carts));

  // Hiển thị lại giỏ hàng
  showCart(carts);
}

function addOneInRow(btn) {
  const row = btn.closest(".tbl-row");
  const id = row.id;

  carts = carts.map((item) => {
    if (item.id === id) {
      item.quant += 1;
    }
    return item;
  });
  // Lưu dữ liệu vào localStorage
  localStorage.setItem("cart", JSON.stringify(carts));
  // Hiển thị lại giỏ hàng
  showCart(carts);
}

function minusOneInRow(btn) {
  // Lấy id của sản phẩm
  const row = btn.closest(".tbl-row");
  const id = row.id;

  // Tìm sản phẩm trong mảng carts
  const item = carts.find((item) => item.id === id);

  // Nếu số lượng <= 1 thì xóa sản phẩm khỏi giỏ hàng
  if (item.quant <= 1) {
    carts = carts.filter((item) => item.id !== id);
  } else {
    item.quant -= 1;
  }

  // Lưu dữ liệu vào localStorage
  localStorage.setItem("cart", JSON.stringify(carts));
  // Hiển thị lại giỏ hàng
  showCart(carts);
}
