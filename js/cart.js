// $(document).ready(function () {
//    $(alert("Cart.js is connected"))});

// get totals from storage
catalog = JSON.parse(localStorage.getItem('catalog'));
cart = JSON.parse(localStorage.getItem('cart'));
cartTotals = JSON.parse(localStorage.getItem('cartTotals'));


// Display items in cart from Catalog Drop Down

$('#cartPage').ready(function displayCatalog() {
  displayCart()
})

function displayCart() {
  //get data from local storage 
  cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart);

  $(cart).each(function (index, item) {
    var prodDetail = $("<h4></h4>").text(`${item.name} ~${item.cat}`);
    $("#product").append(prodDetail);

    var vatBase = parseInt(item.price);
    var vatAct = (`R ${vatBase * 0.15}`)
    var vat = $("<p></p>").text(vatAct);
    $("#vat").append(vat);

    var priceDetail = $("<p></p>").text(`R ${item.price}`);
    $("#price").append(priceDetail);

    allTotals();
  })
}


// Cart Total
function allTotals() {
  cart = JSON.parse(localStorage.getItem("cart"));
  cartTotal = JSON.parse(localStorage.getItem("cartTotal"));

  // Sum of totals
  let sum = cartTotal.reduce(function (a, b) {
    return a + b;
  }, 0);
  // console.log(sum);
  $('#subTot').html(sum);
  alert(`Your new Total is ${sum}`);

  if (cartTotal.length > 0) {
    $('#totIncl').html(sum);
  }
  // Total Vat
  calcVat();

  function calcVat() {
    let vatTot = document.getElementById("vatTot");
    let integerTot = parseInt(sum)
    vatCalc = (`R ${integerTot * 0.15}`);
    vatTot.innerHTML = vatCalc
  };
};


// Empty Cart
function clearCart() {
  if (confirm("Empty cart?")) {
    cart = [];
    localStorage.removeItem("cart");

    reloadPage();
  }
}

// Coupon Form

var input = document.getElementById("coupon");
var inputVal = " ";
if (input) {
  inputVal = input.value;
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("myBtn").click();
      clearField();
    }

    //} 
    setTimeout(function clearField() {
      // clearing the input field
      input.value = " "
    }, 2000);
  })
}

// Apply Coupon
$('#applyCoup').on('click', function () {
  calcCoupon()
})

function calcCoupon() {
  //get base 
  cartTotal = JSON.parse(localStorage.getItem("cartTotal"));
  // Sum of totals
  let sum = cartTotal.reduce(function (a, b) {
    return a + b;
  }, 0);
  console.log(sum);

  let coupBase = parseInt(sum);
  let coupValue = (coupBase * 0.05);

  alert(`Your Cart Has Been Updated. R ${coupValue} has been deducted from your Total`)

  // display new total - reaplce innerText
  if (coupValue > 0) {
    disTotal = parseInt(coupBase - coupValue);
    $('#totIncl').html(disTotal)
  }
}


//  Dropdown - Courier Options
// function show_list() {
//   var shipOpts = document.getElementById("couriertype");
//   shipOpts.classList.toggle("show");
// }

// on Radio Select show dropdown
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
$('#courier').on('click', function () {
  $('.shipTypes').show()
})

// function favTutorial() {  
//   var mylist = document.getElementById("myList");  
//   document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;  
//   } 




//Set Fee for Courier Options
class Courier {
  constructor(type, fee, time) {
    this.type = type;
    this.fee = fee;
    this.time = time;
  }
}

var ship1 = new Courier("Locker", 50, "10 Business Days");
var ship2 = new Courier("Standard", 65, "7 Business Days");
var ship3 = new Courier("Express", 99, "7 Business Days");

shipTypes = [ship1, ship2, ship3];
localStorage.setItem('shipTypes', JSON.stringify(shipTypes));


let shipFee = $('.shipTypes');
shipTypes = JSON.parse(localStorage.getItem('shipTypes'));

// Dislpay Shipping Option with jQuery DropDown in Catalog
$('#cartPage').ready(function () {
  $('.calcShip').change(function () {
    var shipCost = $(this).find("option:selected").text();
    if (shipCost == 'Locker') {
      $('.shipCost').html(`${shipCost}<br>Cost: R ${ship1.fee}<br>Shipping Time: ${ship1.time}`);
    } else if (shipCost == 'Standard') {
      $('.shipCost').html(`${shipCost} <br>Cost: R ${ship2.fee}<br>Shipping Time: ${ship2.time}`)
    } else {
      $('.shipCost').html(`${shipCost} <br>Cost: R ${ship3.fee}<br>Shipping Time: ${ship3.time}`);
    }
  });
});

// Choose Shipping Method in Cart & Add fee to Final Total
let couriertype = $('#couriertype')

$(couriertype).on('change', function () {
  shipTypes = JSON.parse(localStorage.getItem('shipTypes'))

  var shipOption = $(this).find("option:selected").text();
  if (shipOption == 'Locker') {
    let a = parseInt(document.getElementById('totIncl').innerHTML)
    let b = parseInt(ship1.fee)
    document.getElementById('totIncl').innerHTML = (a + b);
  } else if (shipOption == 'Standard') {
    let c = parseInt(document.getElementById('totIncl').innerHTML)
    let d = parseInt(ship2.fee);
    document.getElementById('totIncl').innerHTML = (c + d)
  } else if (shipOption == 'Express') {
    let e = parseInt(document.getElementById('totIncl').innerHTML);
    let f = parseInt(ship3.fee);
    document.getElementById('totIncl').innerHTML = (e + f)
  }

});

// Confirm Order with reference Number
// let submit = document.getElementById('submitBtn')
$('#submitBtn').on('click', submitOrder);

// function* generateSequence(start, end) {
//   for (let i = start; i <= end; i++) yield i;
// }
function submitOrder() {
  function* generateRef() {

    //Charcode Alphabet & numbers
    for (let i = 65; i <= 67; i++) yield i;
    for (let i = 48; i <= 52; i++) yield i;
  }
  let str = '';

  for (let code of generateRef()) {
    str += String.fromCharCode(code);
  }
  alert(`Order Sucessful! Order Number ${str}`)
}

// // Cart Animation
$('#submitBtn').on('click', function () {
  $('#cartOrder').show().animate({
    left: '650px',
    height: '1.15em',
  }, 'slow').fadeOut("slow")
});

// 
function reloadPage() {
  window.location.reload(true);
}