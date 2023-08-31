var formatter = new Intl.NumberFormat("en-US", {
  // Formats the numbers to currency
  style: "currency",
  currency: "USD",
});
// Variables
var itemTotals = [0, 0, 0]; // Array that holds the total for each item
var itemCounter = document.querySelector(".cart-counter");
var cartItems = 0; // How many items are currently in the cart
var resetButton = document // stores the reset button to a variable that adds a event listener and runs the resetForm function
  .querySelector("#reset-design")
  .addEventListener("click", resetForm);
var colorSelect = document.querySelector("#color-select"); // Color select form input
var tShirtIMG = document.querySelector(".tshirt-design").getAttribute("src"); // Stores the contents of the src attribute of the shirt image and stores it
var totalDisplay = document.querySelector(".total-display"); // Total Display
var sizeArray = document.querySelectorAll(".size"); // Array that stores the size radio inputs
var addButton = document // Add To cart button variable with event listner
  .querySelector("#add-to-cart")
  .addEventListener("click", addToCart);
var popUp = document.querySelector(".cart-popup"); // stores the cart popUp in popUp
var cartList = document.querySelector(".cart-list"); // cart list
var closeCartBtn = document.getElementById("close"); // Close Cart button with event listener
closeCartBtn.addEventListener("click", closeCart);
var itemIndex = 0; // Item Index
var createdItemsArray = []; // Array
var cartTotalDisplay = document.querySelector(".cart-total-display"); // Total Display for the Cart
var removeItem = false; // Boolean
// Event Listeners
document.querySelector("#tshirt-form").addEventListener("change", changeForm); // Change event for the form
document.querySelector("#color-select").addEventListener("change", changeImage); // Change event for the color selector
document.querySelector(".cart-button").addEventListener("click", openCart); // Click event to open the cart

// Opens the Cart popup when the cart icon is clicked
function openCart(event) {
  event.preventDefault;
  popUp.style.visibility = "visible";
}

// This function checks if the form has been changed and calculates the total
function changeForm(event) {
  // Activates when the form changes
  event.preventDefault();
  let total = 10; // a let variable is used to limit the scope of the total variable to this specific function
  let quantity = document.querySelector("#quantity");
  // Checks if the selected quantity is less than or equal to 5
  if (quantity.value <= 5) {
    total += checkBoxSelected(); // Runs the checkBoxSelected method and adds the returned value to the total
    total += checkSelectedColor(); // Runs the checkSelectedColor method and adds the returned value to the total
    totalDisplay.innerHTML = // Changes the inner html of the totalDisplay to the formatted total Variable
      "Total: " + formatter.format(total * quantity.value);
  } else {
    alert("Entered Quantity is Too High. Max is 5");
  }
}

// Function that Changes designer image to the selected Color
function changeImage(event) {
  event.preventDefault();
  // Let
  let colorSelected = colorSelect.value; // Stores the color selected into this let variable
  // uses the lastindex method to find the last index of the char - and stores everything before into the new IMG let
  let newImg = tShirtIMG.substring(tShirtIMG.lastIndexOf("-"), -1); // String Method
  let loadIMG = newImg + "-" + colorSelected + ".png"; // changes the newIMG string and adds the color selected to it
  document.querySelector(".tshirt-design").setAttribute("src", loadIMG); // sets the src attribute for the tshirt designer image to a tshirt of the selected color
}

// This function runs when the add to cart button is pressed.
function addToCart(event) {
  event.preventDefault();
  let quantity = document.querySelector("#quantity"); // Let variable stores the quantity input

  // If/Else
  if (quantity.value <= 5 && cartItems < 3) {
    // If statement
    let total = 10;
    let addons = 0;
    let size = "";

    total += checkBoxSelected(); // Adds the value returned to the total
    total += checkSelectedColor();
    total *= quantity.value; // multiplies the total by the quantity selected

    addons = numOfAddons(); // Gets # of addons from the method and stores it
    size = returnSelectedSize(); // Gets and stores the returned size from the method
    addTshirtToCart(total, addons, quantity.value, size); // Runs the addTshirtToCart method

    calcCartTotal(); // Runs the following methods
    AddToCartClear();

    removeItem = false; // Sets remove Item to false
    ChangeCartCounter(removeItem); // Runs the ChangeCartCounter method to increase it
  } else if (quantity.value > 5) {
    // If entered quantity is higher than 5
    alert("Entered Quantity is Too High. Max is 5"); // Error message
  } else {
    alert("Too Many Items in Cart. 3 Items Max"); // Error Message
  }
}

// Resets the form when the Reset Design Button is clicked
function resetForm(event) {
  event.preventDefault();
  let total = 10;
  let quantity = 1;
  document.querySelector("#tshirt-form").reset(); // Resets tshirt form
  document
    .querySelector(".tshirt-design")
    .setAttribute("src", "Images/Tshirts/tshirt-white.png"); // Resets designer image
  totalDisplay.innerHTML = "Total: " + formatter.format(total * quantity); // Resets the calulated total
}

// Checks for selected add-ons and adds to the total
function checkBoxSelected() {
  let total = 0.0;
  let dryFit = document.querySelector("#add-on1"); // Stores the addons into variables
  let stainResist = document.querySelector("#add-on2");
  let padded = document.querySelector("#add-on3");
  // These if statement check to see what addons are selected to increase the price
  if (dryFit.checked == true) {
    total += 5;
  }
  if (stainResist.checked == true) {
    total += 7;
  }
  if (padded.checked == true) {
    total += 10;
  }
  if (total > 0) {
    totalDisplay.innerHTML = "Total: " + total;
  }

  return total; // Returns the total
}

function checkSelectedColor() {
  // Checks selected Color and returns the added price
  let total = 0;
  let colorSelected = colorSelect.value;
  // White, Black, and default dont add to the total
  if (
    colorSelected === "White" ||
    colorSelected === "Black" ||
    colorSelected === "Default"
  ) {
    total += 0;
  } else {
    // Every other color adds 3 to the total
    total += 3;
  }
  return total; // Sends the calculated total back to where it was called
}

// Returns the number of addons selected by the user
function numOfAddons() {
  let addons = 0; // stores addons into variables
  let dryFit = document.querySelector("#add-on1");
  let stainResist = document.querySelector("#add-on2");
  let padded = document.querySelector("#add-on3");

  if (dryFit.checked == true) {
    // Checks to see whether they are selected or not
    addons++;
  }
  if (stainResist.checked == true) {
    addons++;
  }
  if (padded.checked == true) {
    addons++;
  }

  return addons; // Returns the number that are selected
}

// Returns the size selected by the user
function returnSelectedSize() {
  let selectedSize = "";
  // Loop
  for (var i = 0; i < sizeArray.length; i++) {
    // Runs for the length of the sizeArray
    if (sizeArray[i].checked) {
      selectedSize = sizeArray[i].value; // Stores the selected size into the variable
    }
  }
  return selectedSize; // Returns the user selected size
}

// Function that gets the info chosen by the user and puts it into a li element in the cart list
function addTshirtToCart(total, addons, quantity, size) {
  // Try/Catch
  try {
    if (itemIndex <= 2) {
      // Runs while the item index is less than or equal to 2
      let defaultIMG = "Images/TshirtsSmall/tshirt-White.png"; // stores the default img

      let colorSelected = colorSelect.value; // stores selected color
      // String Method
      let newImg = defaultIMG.substring(defaultIMG.lastIndexOf("-"), -1); // cuts off the portion after the -
      let loadIMG = newImg + "-" + colorSelected + ".png"; // Adds the selected color to the new img string

      // Creaes 4 elements an li,img,p, and button
      let li = document.createElement("li");
      let img = document.createElement("img");
      let p = document.createElement("p");
      let button = document.createElement("button");

      // Stores info passed to this funciton into the p element
      p.innerHTML =
        "Total: " +
        formatter.format(total) +
        " Add-Ons: " +
        addons +
        " Quantity: " +
        quantity +
        " Size: " +
        size;

      // sets the img src to the selected color
      img.src = loadIMG;
      img.className = "itemIMG"; // gives the img a class name
      li.className = "item"; // gives the li a class name
      button.innerHTML = "X"; // inserts x into button
      button.type = "click"; // sets the button type to click
      button.id = "removeItem" + itemIndex; // gives the button an id
      button.className = "removeItem"; // gives the button a class name

      // Appends the img,p, and button elements to the created li element
      li.appendChild(img);
      li.appendChild(p);
      li.appendChild(button);
      // Appends the created li element to the cartList ul element
      cartList.appendChild(li);

      // An array that stores the created li elements
      var item1Delete = [
        document.getElementById("removeItem0"),
        document.getElementById("removeItem1"),
        document.getElementById("removeItem2"),
      ];

      // Switch statemnt based on itemIndex  All switches do the same thing.
      // Switch
      switch (itemIndex) {
        case 0:
          // Stores the created li into createdItems array based on the item index
          createdItemsArray[0] = li;
          item1Delete[0].addEventListener("click", removeItem0); // creates an event listner for an array item
          item1Delete[0].style.marginLeft = "10px"; // gives the item style
          itemTotals[0] = total; // stores the item calculated total in the selected itemTotals array
          break;
        case 1:
          createdItemsArray[1] = li;
          item1Delete[1].addEventListener("click", removeItem1);
          item1Delete[1].style.marginLeft = "10px";
          itemTotals[1] = total;
          break;
        case 2:
          createdItemsArray[2] = li;
          item1Delete[2].addEventListener("click", removeItem2);
          item1Delete[2].style.marginLeft = "10px";
          itemTotals[2] = total;
          break;
      }
      itemIndex++; // Increases item index
    } else {
      alert("Too Many items"); // error message
    }
  } catch {
    console.log("error in the addTshirtToCart");
  }
}

// Calculates the cart total by adding all of the item totals together
function calcCartTotal() {
  let cartTotal = 0;
  cartTotal = itemTotals[0] + itemTotals[1] + itemTotals[2]; // Adds itemTotals together from the array
  if (cartTotal != 0) {
    cartTotalDisplay.innerHTML = "Total: " + formatter.format(cartTotal); // changes the cartTotalDisplay if the total is != 0;
  } else {
    cartTotalDisplay.innerHTML = "Cart Is Empty";
  }
}
// Resets the form after the user adds item to cart to allow them to create a new shirt
function AddToCartClear() {
  let total = 10;
  let quantity = 1;
  document.querySelector("#tshirt-form").reset(); // Resets the tshirt form
  document // Sets the image to the default image
    .querySelector(".tshirt-design")
    .setAttribute("src", "Images//Tshirts/tshirt-white.png");
  totalDisplay.innerHTML = "Total: " + formatter.format(total * quantity); // Resets the total
}

// Changes the Counter by the cart in the upper right
function ChangeCartCounter(removeItem) {
  if (cartItems < 3 && removeItem == false) {
    // Runs if the cart has 3 itmes or less and removeItem is false
    cartItems++; // Increases cartItmes
    itemCounter.innerHTML = cartItems; // Changes the cartCounter number
    itemCounter.style.visibility = "visible"; // Sets the itemCounter visibilty to visible
  } else if (removeItem == true) {
    // If this method is called and removeItem is equal to true
    cartItems--; // Decreaeses cartItem counter
    itemCounter.innerHTML = cartItems; // sets the itemCounter.inner html to cartItems current count
    if (cartItems == 0) {
      // If cartItems is equal to zero it hides the cartCounter
      itemCounter.style.visibility = "hidden";
    }
  } else {
    cartItems--;
  }
}

// Clears the Item 0 from the cart
function removeItem0(event) {
  event.preventDefault();
  itemIndex--; // decreases itemIndex

  removeItem = true;
  ChangeCartCounter(removeItem); // runs the ChangeCartCounter method and passes it the removeItem bool

  let drop = createdItemsArray[0]; // sets drop to the second item in the createdItemsArray
  cartList.removeChild(drop); // removes the drop item from the cartList
  itemTotals[0] = 0; // Sets item 1 in the itemTotals to zero
  calcCartTotal(); // runs the calcCartTotal method
}

// Clears item 1 from the cart
function removeItem1(event) {
  event.preventDefault();
  itemIndex--; // decreases itemIndex

  removeItem = true;
  ChangeCartCounter(removeItem); // runs the ChangeCartCounter method and passes it the removeItem bool

  let drop = createdItemsArray[1]; // sets drop to the second item in the createdItemsArray
  cartList.removeChild(drop); // removes the drop item from the cartList
  itemTotals[1] = 0; // Sets item 2 in the itemTotals to zero
  calcCartTotal(); // runs the calcCartTotal method
}

// Clears item 2 from the cart
function removeItem2(event) {
  event.preventDefault();
  itemIndex--; // decreases itemIndex

  removeItem = true;
  ChangeCartCounter(removeItem); // runs the ChangeCartCounter method and passes it the removeItem bool

  let drop = createdItemsArray[2]; // sets drop to the third item in the createdItemsArray
  cartList.removeChild(drop); // removes the drop item from the cartList
  itemTotals[2] = 0; //Sets item 3 in the itemTotals to zero
  calcCartTotal(); // runs the calcCartTotal method
}

// Closes the cart when the x in the upper right of the cart is pressed
function closeCart(event) {
  event.preventDefault();
  popUp.style.visibility = "hidden"; // sets the cart popup visibility style to hidden
}
