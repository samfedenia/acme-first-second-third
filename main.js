// data
const slots = ["first", "second", "third"];

const users = [
  {
    id: 1,
    name: "moe",
    slot: "first",
  },
  {
    id: 2,
    name: "larry",
    slot: "second",
  },
  {
    id: 3,
    name: "curly",
    slot: "third",
  },
  {
    id: 4,
    name: "lucy",
    slot: "third",
    selected: true,
  },
];

// callback function to move li divs from one ul to target ul
/* very smart use of closure! */
function moveIt(targetId) {
  return function () {
    // this context is button div that was clicked due to closure
    const parent = this.parentElement;
    const selector = targetId + " > ul";
    const targetDiv = document.querySelector(selector);

    if (parent.querySelectorAll("li.selected").length > 0) {
      selectedNames = [...parent.querySelectorAll("li.selected")];
      selectedNames.forEach((name) => {
        name.parentElement.removeChild(name);
        targetDiv.appendChild(name);
      });
    }
  };
}

// callback function for selecting/deselecting li divs
function selectName(elem) {
  elem = elem.target;
  elemClasses = elem.classList;
  /*could also use elem.classList.toggle('selected')
  which encompasses all the logic in the 4 lines below 
  */
  if ([...elemClasses].includes("selected")) {
    elemClasses.remove("selected");
  } else {
    elemClasses.add("selected");
  }
}

// loop over each slot in slots array and create buttons and divs
for (let i = 0, len = slots.length; i < len; i++) {
  // set up elements and properties
  btnLeft = document.createElement("button");
  btnRight = document.createElement("button");
  label = document.createElement("h2");
  ul = document.createElement("ul");
  btnRight.innerText = ">";
  btnLeft.innerText = "<";
  label.innerText = slots[i];

  // select corresponding column div and append elements
  div = document.querySelector("#" + slots[i]);
  div.appendChild(btnRight);
  div.appendChild(btnLeft);
  div.appendChild(label);
  div.appendChild(ul);

  // set button properties/event listeners in each column
  switch (slots[i]) {
    case "first":
      btnRight.classList.add("selected");
      btnRight.addEventListener("click", moveIt("#second"));
      break;
    case "second":
      btnRight.classList.add("selected");
      btnRight.addEventListener("click", moveIt("#third"));
      btnLeft.classList.add("selected");
      btnLeft.addEventListener("click", moveIt("#first"));
      break;
    case "third":
      btnLeft.classList.add("selected");
      btnLeft.addEventListener("click", moveIt("#second"));
      break;
  }

  // loop over each user in users to create li divs
  for (user of users) {
    if (div.id === user.slot) {
      li = document.createElement("li");
      li.addEventListener("click", selectName);
      li.innerText = user.name;

      if (user.selected) {
        li.classList.add("selected");
      }
      ul.appendChild(li);
    }
  }
}
