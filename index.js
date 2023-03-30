const greetel = document.getElementById("greeter");
var xhr = new XMLHttpRequest();
xhr.open("GET", "greetings.json", true);
xhr.onload = function () {
  if (this.status === 200) {
    var data = JSON.parse(this.responseText);
    greetel.textContent =
      data[Math.floor(Math.random() * (data.length - 0) + 0)];
  }
};
xhr.send();
let checkbox = document.getElementsByClassName("checkbox");
const dateel = document.querySelector('input[type="datetime-local"]');
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const inpt = document.querySelector('input[type="text"]');
const submitbutton = document.getElementById("sbmit");
const switcher = document.getElementById("themeswitch");
const todols = document.getElementById("todolist");
let alltodos = JSON.parse(localStorage.getItem("all_todos"));
let totaltodos = JSON.parse(localStorage.getItem("all_todos"));
let preffered_theme = localStorage.getItem("theme");
document.documentElement.setAttribute("data-theme", preffered_theme);
if (totaltodos === null) {
  alltodos = [];
  totaltodos = [];
}

if (preffered_theme === "dark") {
  switcher.classList.add("towhite");
  switcher.classList.add("circle");
} else {
  switcher.classList.add("toblack");
  switcher.classList.add("crescent");
}

function switchTheme(e) {
  if (e.target.classList.contains("toblack")) {
    switcher.classList.remove("toblack");
    switcher.classList.add("towhite");
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    switcher.classList.remove("towhite");
    switcher.classList.add("toblack");
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

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
    check.state = x[i][2];
    if (check.state === "checked") {
      check.classList.add("filledcheck");
      line1.classList.add("animationclass1");
      line2.classList.add("animationclass2");
    }
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
        src="trash.png"
        alt=""
        width="50"
      /></div>
    `;
  }
  alltodos = [];
  checklistener();
}
function checklistener() {
  checkbox = document.getElementsByClassName("checkbox");
  deletebox = document.querySelectorAll('div[class="trash"]');
  for (let i = 0; i < deletebox.length; i++) {
    if (deletebox[i].getEventListeners("click") == undefined) {
      deletebox[i].addEventListener("click", function () {
        let divsToDelete = document.querySelectorAll("div[class='todo']");
        for (let x = 0; x < divsToDelete.length; x++) {
          divsToDelete[x].remove();
        }
        totaltodos.splice(i, 1);
        localStorage.setItem("all_todos", JSON.stringify(totaltodos));
        alltodos = totaltodos;
        render(alltodos);
      });
    }
  }
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].getEventListeners("click") == undefined) {
      checkbox[i].addEventListener("click", function () {
        if (checkbox[i].classList.contains("filledcheck")) {
          checkbox[i].classList.remove("filledcheck");
          checkbox[i].state = "unchecked";
          totaltodos[i] = [
            totaltodos[i][0],
            totaltodos[i][1],
            checkbox[i].state,
          ];
          localStorage.setItem("all_todos", JSON.stringify(totaltodos));
          checkbox[i].children[0].classList.remove("animationclass1");
          checkbox[i].children[1].classList.remove("animationclass2");
          checkbox[i].children[0].classList.add("animationclass1r");
          checkbox[i].children[1].classList.add("animationclass2r");
        } else {
          checkbox[i].classList.add("filledcheck");
          checkbox[i].state = "checked";
          totaltodos[i] = [
            totaltodos[i][0],
            totaltodos[i][1],
            checkbox[i].state,
          ];
          localStorage.setItem("all_todos", JSON.stringify(totaltodos));
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
  totaltodos.push([inpt.value, dateel.value, "unchecked"]);
  alltodos.push([inpt.value, dateel.value, "unchecked"]);
  console.log(totaltodos);
  localStorage.setItem("all_todos", JSON.stringify(totaltodos));
  render(alltodos);
});
switcher.addEventListener("click", switchTheme);
