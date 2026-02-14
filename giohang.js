let carts = JSON.parse(localStorage.getItem("cart")) || [];

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

showCart(carts);

function deleteRow(btn) {
  const row = btn.closest(".tbl-row");
  const id = row.id;

  carts = carts.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(carts));
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
  localStorage.setItem("cart", JSON.stringify(carts));
  showCart(carts);
}

function minusOneInRow(btn) {
  const row = btn.closest(".tbl-row");
  const id = row.id;

  const item = carts.find((item) => item.id === id);

  if (item.quant <= 1) {
    carts = carts.filter((item) => item.id !== id);
  } else {
    item.quant -= 1;
  }
  localStorage.setItem("cart", JSON.stringify(carts));
  showCart(carts);
}
