function createProduct(item) {
    return `
        <div class="product-container">
            <h2 class="product-title">${item.title}</h2>
            <img class="product-img" src="${item.image}" alt="product image">
            <div class="center-container">
                <button class="product-btn">View Product</button>
            </div>
            <p>Codigo: <strong>${item.id}</strong></p>
            <p class="product-desc">${item.description}</p>
            <p class="p-rate">Rating:<strong>${item.rating.rate}</strong></p>
            <p class="p-rate">Amount bought:<strong>${item.rating.count}</strong></p>
            <p class="p-rate">Price:<strong class="product-price">$${item.price}</strong></p>
        </div>`;
}

function listenBuyButtonClick(data, index) {
    document.querySelector(".btn-buy").addEventListener("click", () => {
        data[index].rating.count++;
        document.querySelector(".product-amount").innerHTML =
            `Amount bought:<strong>${data[index].rating.count}</strong>`;
    });
}

function viewSingleProductPage(data, index) {
    document.getElementById("shop-container").classList.remove(
        "shop-container",
    );
    document.getElementById("shop-container").classList.add(
        "single-product-view",
    );

    document.getElementById("shop-container").innerHTML = `
        <div class="product-container">
            <h2 class="product-title">${data[index].title}</h2>
            <img class="product-img" src="${data[index].image
        }" alt="product image">
            <div class="center-container">
                <button class="btn-buy">Buy</button>
            </div>
            <p>Codigo: <strong>${data[index].id}</strong></p>
            <p class="product-desc">${data[index].description}</p>
            <p class="p-rate">Rating:<strong>${data[index].rating.rate
        }</strong></p>
            <p class="product-amount p-rate">Amount bought:<strong>${data[index].rating.count
        }</strong></p>
            <p class="p-rate">Price<strong class="product-price">$${data[index].price
        }</strong></p>
            
            <div class="center-container">
                <button class="return-btn" onclick="fetchItems()">Return</button>
            </div>
        </div>
    `;

    listenBuyButtonClick(data, index);
}

function listenViewProductButton(data) {
    const buttons = document.querySelectorAll(".product-btn");
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            viewSingleProductPage(data, index);
        });
    });
}

function renderProducts(data) {
    let element = "";
    data.map((item) => element += createProduct(item));
    document.getElementById("shop-container").innerHTML = element;
    listenViewProductButton(data);
}

let cachedData = null;
async function fetchItems() {
    document.getElementById("shop-container").classList.remove(
        "single-product-view",
    );
    document.getElementById("shop-container").classList.add("shop-container");
    if (cachedData) {
        renderProducts(cachedData);
        return;
    }

    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    cachedData = data;

    renderProducts(data);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchItems();
});
