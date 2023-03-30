const dateel = document.querySelector('input[type="datetime-local"]');
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();
let hours = String(today.getHours());
let minutes = String(today.getMinutes());
if (minutes.length === 1) {
  minutes = "0" + minutes;
}
if (hours.length === 1) {
  hours = "0" + hours;
}
dateel.value = yyyy + "-" + mm + "-" + dd + "T" + hours + ":" + minutes;

let checkbox = document.querySelectorAll('div[class="checkbox"]');
const submitbutton = document.getElementById("sbmit");
const todols = document.getElementById("todolist");
const inpt = document.querySelector('input[type="text"]');
let alltodos = JSON.parse(localStorage.getItem("all_todos"));
let totaltodos = JSON.parse(localStorage.getItem("all_todos"));
if (alltodos === null) {
  alltodos = [];
}

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

function render(x) {
  for (let i = 0; i < x.length; i++) {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let check = document.createElement("div");
    let line1 = document.createElement("div");
    line1.classList.add("line1");
    let line2 = document.createElement("div");
    line2.classList.add("line2");
    check.classList.add("checkbox");
    check.id = "check";
    check.state = "unchecked";
    check.appendChild(line1);
    check.appendChild(line2);
    todo.appendChild(check);
    todols.append(todo);
    todo.innerHTML += `
        <div class="todopar">
        ${x[i][0]}
          <div class="date">${x[i][1].replace("T", " ")}</div>
        </div>
        <div class="trash" id="delete"> <img
        src="https://pic.onlinewebfonts.com/svg/img_512185.png"
        alt=""
        width="50"
      /></div>
    `;
  }
  alltodos = [];
  checklistener();
}
function checklistener() {
  checkbox = document.querySelectorAll('div[class="checkbox"]');
  deletebox = document.querySelectorAll('div[class="trash"]');
  for (let i = 0; i < deletebox.length; i++) {
    if (deletebox[i].getEventListeners("click") == undefined) {
      deletebox[i].addEventListener("click", function () {
        let divsToDelete = document.querySelectorAll("div[class='todo']"); // Select all divs that contain the paragraph
        console.log(divsToDelete);
        for (let x = 0; x < divsToDelete.length; x++) {
          divsToDelete[x].remove(); // Remove the div if it contains the paragraph
        }
        totaltodos.splice(i, 1);
        console.log(totaltodos);
        localStorage.setItem("all_todos", JSON.stringify(totaltodos));
        alltodos = totaltodos;
        render(alltodos);
      });
    }
  }
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].getEventListeners("click") == undefined) {
      checkbox[i].addEventListener("click", function () {
        if (checkbox[i].state === "checked") {
          checkbox[i].classList.remove("filledcheck");
          checkbox[i].state = "unchecked";
          checkbox[i].children[0].classList.remove("animationclass1");
          checkbox[i].children[1].classList.remove("animationclass2");
          checkbox[i].children[0].classList.add("animationclass1r");
          checkbox[i].children[1].classList.add("animationclass2r");
        } else {
          checkbox[i].classList.add("filledcheck");
          checkbox[i].state = "checked";
          checkbox[i].children[0].classList.remove("animationclass1r");
          checkbox[i].children[1].classList.remove("animationclass2r");
          checkbox[i].children[0].classList.add("animationclass1");
          checkbox[i].children[1].classList.add("animationclass2");
        }
      });
    }
  }
}

render(alltodos);
submitbutton.addEventListener("click", function () {
  totaltodos.push([inpt.value, dateel.value]);
  alltodos.push([inpt.value, dateel.value]);
  console.log(totaltodos);
  localStorage.setItem("all_todos", JSON.stringify(totaltodos));
  render(alltodos);
});
