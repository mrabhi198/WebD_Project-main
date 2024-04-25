// Script for navigation bar
// image slinging
var MainImg=document.getElementById("MainImg");
var smalling=document.getElementsByClassName("small-img");

smalling[0].onclick=function(){
    MainImg.src=smalling[0].src;
}

smalling[1].onclick=function(){
    MainImg.src=smalling[1].src;
}

smalling[2].onclick=function(){
    MainImg.src=smalling[2].src;
}

smalling[3].onclick=function(){
    MainImg.src=smalling[3].src;
}

// slider

// cart open close
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

// open cart
cartIcon.onclick = () => {
    cart.classList.add("cart-active");
};

// close cart
closeCart.onclick = () => {
    cart.classList.remove("cart-active");
};

//making add to cart
//cart working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
    } else {
    ready();
    }

// Making Function
function ready(){
    //Remove item from cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for(var i = 0 ; i <removeCartButtons.length; i++){
        var button=removeCartButtons[i];
        button.addEventListener("click",removeCartItem);
    }
    //Quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i = 0 ; i <quantityInputs.length; i++){
        var input=quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    //Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for(var i = 0 ; i <addCart.length; i++){
        var button=addCart[i];
        button.addEventListener("click",addCartClicked);
    }
    loadCartItems();
}

//Remove cart Item
function removeCartItem(event){
    var buttonClicked =event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveCartItems();
    updateCartIcon();
}
//Quantity Changed
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
    saveCartItems();
    updateCartIcon();
}

//Add Cart Function
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
    saveCartItems();
    updateCartIcon();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }
    }
    var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" name="" id="" value="1" class="cart-quantity">
    </div>
    <i class='bx bx-trash-alt cart-remove' ></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
    saveCartItems();
    updateCartIcon();
}

//Update Total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('₹',''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    //if price contain some paisa(in points)
    total = Math.round(total *100)/100;
    document.getElementsByClassName('total-price')[0].innerText = '₹' + total;

    //save total to localstorage
    localStorage.setItem('cartTotal', total)
}



//local storage (keep item in cart when page refresh with localstorage)
function saveCartItems () {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cart.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

//load in cart
function loadCartItems () {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for(var i = 0; i < cartItems.length; i++){
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = item.quantity;
        }
    }

    var cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        document.getElementsByClassName('total-price')[0].innerText = "₹" + cartTotal;
    }
    updateCartIcon();
}

//quantity count in cart icon
function updateCartIcon () {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;
    // var cartIcon = document.getElementById('cart-icon');

    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity += parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute("data-quantity", quantity);
}


//slider
document.addEventListener('DOMContentLoaded', function () {
    const shopContent = document.querySelector('.shop-content');
    const productSection = document.querySelector('.shop');
    const productBoxes = document.querySelectorAll('.product-box');
    const scrollDistance = shopContent.clientWidth / 3; // Scroll distance equals the width of three product boxes

    // Scroll left
    document.querySelector('.scroll-left').addEventListener('click', function () {
        shopContent.scrollBy({
            left: -scrollDistance,
            behavior: 'smooth'
        });
    });

    // Scroll right
    document.querySelector('.scroll-right').addEventListener('click', function () {
        shopContent.scrollBy({
            left: scrollDistance,
            behavior: 'smooth'
        });
    });

    // Show/hide navigation buttons based on scroll position
    shopContent.addEventListener('scroll', function () {
        const scrollLeft = shopContent.scrollLeft;
        const scrollWidth = shopContent.scrollWidth;
        const clientWidth = shopContent.clientWidth;

        const atStart = scrollLeft === 0;
        const atEnd = scrollLeft + clientWidth === scrollWidth;

        document.querySelector('.scroll-left').style.display = atStart ? 'none' : 'block';
        document.querySelector('.scroll-right').style.display = atEnd ? 'none' : 'block';
    });
});
