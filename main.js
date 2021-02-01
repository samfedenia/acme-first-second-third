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

function moveIt(targetId) {
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
}

for (let i = 0, len = slots.length; i < len; i++) {
  btnLeft = document.createElement("button");
  btnRight = document.createElement("button");
  label = document.createElement("h2");
  btnRight.innerText = ">";
  btnLeft.innerText = "<";

  switch (slots[i]) {
    case "first":
      btnRight.classList.add("selected");
      btnRight.addEventListener("click", function () {
        moveIt.call(this, "#second");
      });
      break;
    case "second":
      btnRight.classList.add("selected");
      btnRight.addEventListener("click", function () {
        moveIt.call(this, "#third");
      });
      btnLeft.classList.add("selected");
      btnLeft.addEventListener("click", function () {
        moveIt.call(this, "#first");
      });
      break;
    case "third":
      btnLeft.classList.add("selected");
      btnLeft.addEventListener("click", function () {
        moveIt.call(this, "#second");
      });
      break;
  }

  ul = document.createElement("ul");
  div = document.querySelector("#" + slots[i]);
  div.appendChild(btnRight);
  div.appendChild(btnLeft);
  label.innerText = slots[i];
  div.appendChild(label);
  div.appendChild(ul);

  for (user of users) {
    if (div.id === user.slot) {
      li = document.createElement("li");
      li.addEventListener("click", (elem) => {
        elem = elem.target;
        elemClasses = elem.classList;

        if ([...elemClasses].includes("selected")) {
          elemClasses.remove("selected");
        } else {
          elemClasses.add("selected");
        }
      });

      li.innerText = user.name;
      if (user.selected) {
        li.classList.add("selected");
      }
      ul.appendChild(li);
    }
  }
}
