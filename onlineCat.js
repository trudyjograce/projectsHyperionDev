/* ******************************************************** */
// My javascript
// constructor function for product items
class Product {
  constructor(brand, category, name, specifications, material, color, price, image) {
    this.brand = brand;
    this.cat = category;
    this.name = name;
    this.specs = specifications;
    this.material = material;
    this.color = color;
    this.price = price;
    this.picSRC = image;

  }
};

// Create Products
var product1 = new Product("Jojo", "Dress", "Sofia Dress", "Princess cut - tutu dress. Hand Beaded.", "Brocade and Tulle", "Blush", 1500, "images/product(5).jpg");
var product2 = new Product("Jojo", "Intimates", "Aurora Slip", "A-Line, non-stretch. Adjustable straps.", "Versace Satin", "Milk", 350, "images/product(8).jpg");
var product3 = new Product("Jojo", "Intimates", "Aurora Short", "Mid thigh, elasticated waist. Non-stretch.", "Versace Satin", "Milk", 350, "images/product(10).jpg");
var product4 = new Product("Jojo", "Dress", "Whimsy Dress", "Boho style. Lined Bodice with lace up back.", "Chiffon & Satin", "Snow", 2500, "images/product(3).jpg");
var product5 = new Product("Jojo", "Design", "Elegant Design", "Custom Design created from your sketches. Pattern and mock-up created to detail", "Any", "Any", 1800, "images/onlineCat(2).jpg");

// Create Catalog, Cart & CartTotal to Store Items
var catalog = [product1, product2, product3, product4, product5];
var cart = [];
var cartTotal = [];


//Store data to localStorage
localStorage.setItem('catalog', JSON.stringify(catalog));
localStorage.setItem("cart", JSON.stringify(cart));
localStorage.setItem("cartTotal", JSON.stringify(cartTotal));


/////////////////////
// CATALOGUE PAGE
/////////////////////

$('.catalogPage').ready(function displayCatalog() {
  // catalog.forEach(function (it) {
  var productList = $('#productList');
  for (var i = 0; i < catalog.length; i++) {
    productList.append(
      $('<option></option>').val(i).html(catalog[i].name))
  };
});


// Add items from Catalog DropDown to Cart
$('#addFromCat').on('click', function () {
  catToCart()
})

catalog = JSON.parse(localStorage.getItem('catalog'))

function catToCart() {
  // find out the index of the item selected
  let e = document.getElementById('productList');
  let itemIndex = e.selectedIndex;

  // // update item to cart & storage
  let newCartItem = (catalog[itemIndex]);
  console.log(newCartItem);
  let itemPrice = parseInt(newCartItem.price)

  // Add items to Cart[] & storage
  cart.push(newCartItem);
  localStorage.setItem("cart", JSON.stringify(cart));

  // add prices to cartTotal & Storage
  cartTotal.push(itemPrice);
  localStorage.setItem('cartTotal', JSON.stringify(cartTotal))
  console.log(itemPrice);

  alert(`You added ${newCartItem.name} to your cart.`);

  // alert with updated total
  getTotals();

};

// Quick Add Products From Catalog
/////////////////////
$(function () {
  $('.productCat').on('click', function () {
    var quickAdd = $(this).attr('data-id');
    // add items to cart
    cart.push(catalog[quickAdd]);
    localStorage.setItem("cart", JSON.stringify(cart));

    // update totals to cartTotal & Storage
    cartTotal.push(catalog[quickAdd].price);
    localStorage.setItem('cartTotal', JSON.stringify(cartTotal));

    // get totals
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

//jQuery ///////////
$(document).ready(function () {
  colorChange();

  function colorChange() {
    $("catalogBod").css({
      backgroundColor: "#F2C4DE"
    }, "slow").queue(() => {
      $("catalogBod").delay(3000).css({
        backgroundColor: "#F2DEA2"
      }, "slow", colorChange);
    })
  }
});