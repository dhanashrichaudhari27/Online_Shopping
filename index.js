const cartIcon=document.querySelector("#cart-icon");
const cart=document.querySelector(".cart");
const cartClose=document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButton = document.querySelectorAll('.add-cart');
addCartButton.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        if (productBox) {
            addToCart(productBox);
        }
    });
});

const cartContent = document.querySelector(".cart-content");

const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItem=cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItem) {
        if(item.textContent === productTitle) {
            alert("Item is already in the cart");   
            return;
        }
    }


    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <div>
            <img src="${productImgSrc}" class="cart-img">
            <div class="cart-detail">
                <h2 class="cart-product-title">${productTitle}</h2>
                <span class="cart-price">${productPrice}</span>
                <div class="cart-quantity">
                    <button id="decrement">-</button>
                    <span class="number">1</span>
                    <button id="increment">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i>
        </div>
    `;

    cartContent.appendChild(cartBox);


    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateCartItemCount(-1);
        updateTotalPrice();
    });

    // Quantity increment/decrement logic
    const numberElement = cartBox.querySelector(".number");
    const decrementButton = cartBox.querySelector("#decrement");
    const incrementButton = cartBox.querySelector("#increment");

    decrementButton.addEventListener("click", () => {
        let quantity = parseInt(numberElement.textContent, 10);
        if (quantity > 1) {
            quantity--;
            numberElement.textContent = quantity;
        }
    });

    incrementButton.addEventListener("click", () => {
        let quantity = parseInt(numberElement.textContent, 10);
        quantity++;
        numberElement.textContent = quantity;
        updateTotalPrice();
    });
    updateCartItemCount(1);
    updateTotalPrice();
};

const updateTotalPrice=()=>{
    const totlPriceElement=document.querySelector(".total-price");
    const cartBoxes=cartContent.querySelectorAll(".cart-box");
    let total=0;
    cartBoxes.forEach(cartBox => {
        const totlPriceElement=cartBox.querySelector(".cart-price");
        const quantityElement=cartBox.querySelector(".number");
        const price=totlPriceElement.textContent.replace("₹", "");
        const quantity=quantityElement.textContent;
        total+=price*quantity;
    });
    totlPriceElement.textContent = `₹${total}`;
}
let cartItemCount=0;
const updateCartItemCount = change => {
    const cartItemCountBadge=document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    }
    else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
}

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes= cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty.Please add items to your cart before buying.");
        return;
    }
    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount=0;
    updateCartItemCount(0);
    updateTotalPrice();
    alert("Thank you for your purchase!");

});