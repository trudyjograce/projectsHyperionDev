catalog = JSON.parse(localStorage.getItem('catalog'));
cart = JSON.parse(localStorage.getItem('cart'));
cartTotals = JSON.parse(localStorage.getItem('cartTotals'));


// Product Additional Info Hide/Show 
$(document).ready(function () {
  $(".close").click(function () {
    $('.moreData').hide();
  });
  $(".showMore").click(function () {
    $('.moreData').show();
  });
});


// Add product from  product page
catalog = JSON.parse(localStorage.getItem('catalog'));
cart = JSON.parse(localStorage.getItem('cart'));
cartTotal = JSON.parse(localStorage.getItem('cartTotal'));
localStorage


//Add Products From Individual Product Pages
/////////////////////
$(() => {
  $('.pageAdd').on('click', function () {
    var prodAdd = $(this).attr('data-info');
    // let itemIndex = $(quickAdd)
    alert(`You added ${catalog[prodAdd].name} to your cart`);

    // add items to cart
    cart.push(catalog[prodAdd]);
    localStorage.setItem("cart", JSON.stringify(cart));

    // update totals to cartTotal & Storage
    cartTotal.push(catalog[prodAdd].price);
    localStorage.setItem('cartTotal', JSON.stringify(cartTotal));

    getTotals();
  });
})

function getTotals() {
  cartTotal = JSON.parse(localStorage.getItem("cartTotal"));
  // Sum of totals
  let sum = cartTotal.reduce(function (a, b) {
    return a + b;
  }, 0);
  alert(`Your Cart Has Been Updated. Your new Total is R ${sum}`);
}