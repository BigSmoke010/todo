const greetel = document.getElementById("greeter");
const xhr = new XMLHttpRequest();
let checkbox = document.getElementsByClassName("checkbox");
let deletebox = document.querySelectorAll('div[class="trash"]');
const dateel = document.querySelector('input[type="date"]');
const timeel = document.querySelector('input[type="time"]');
const inpt = document.querySelector('input[type="text"]');
const submitbutton = document.getElementById("sbmit");
const switcher = document.getElementById("themeswitch");
const todols = document.getElementById("todolist");
let divsToBeAdded = JSON.parse(localStorage.getItem("all_todos"));
let totaltodos = divsToBeAdded;
let preffered_theme = localStorage.getItem("theme");

document.documentElement.setAttribute("data-theme", preffered_theme);
if (totaltodos === null) {
  divsToBeAdded = [];
  totaltodos = [];
}

if (preffered_theme === "dark") {
  switcher.classList.add("towhite");
  switcher.classList.add("circle");
} else {
  switcher.classList.add("toblack");
  switcher.classList.add("crescent");
}
xhr.open("GET", "greetings.json", true);
xhr.onload = function () {
  if (this.status === 200) {
    var data = JSON.parse(this.responseText);
    greetel.textContent =
      data[Math.floor(Math.random() * (data.length - 0) + 0)];
  }
};
xhr.send();
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
    const wrapper = document.createElement("div");
    const dateEl = document.createElement("div");
    const paragraph = document.createElement("div");
    let todo = document.createElement("div");
    let line1 = document.createElement("div");
    let check = document.createElement("div");
    let line2 = document.createElement("div");
    const date1 = new Date();
    const date2 = new Date(x[i][1]);
    const diffInMs = date2 - date1;
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    dateEl.classList.add("date");
    paragraph.classList.add("paragraphwrapper");
    wrapper.classList.add("parwrapper");
    paragraph.textContent = x[i][0];
    dateEl.textContent = x[i][1].replace("T", " ");
    if (diffInDays === 0) {
      dateEl.style = "background-color: yellow;";
    }
    if (diffInDays === 2) {
      dateEl.style = "background-color: rgb(110, 190, 0);";
    }
    if (diffInHours === 0) {
      dateEl.style = "background-color: orange;";
    }
    if (diffInMinutes === 0) {
      dateEl.style = "background-color: red;";
    }
    if (diffInMs <= 0) {
      console.log("I MISS");
      dateEl.style = "background-color: grey;";
    }
    todo.classList.add("todo");
    line1.classList.add("line1");
    line2.classList.add("line2");
    check.classList.add("checkbox");
    check.id = "check";
    check.state = x[i][2];
    if (check.state === "checked") {
      const completedcheck = document.createElement("div");
      completedcheck.classList.add("checkline");
      paragraph.appendChild(completedcheck);
      check.classList.add("filledcheck");
      line1.classList.add("animationclass1");
      line2.classList.add("animationclass2");
    }
    check.appendChild(line1);
    check.appendChild(line2);
    todo.appendChild(check);

    wrapper.append(paragraph);
    todols.append(todo);
    todo.append(wrapper);
    wrapper.append(dateEl);
    todo.innerHTML += `
        <div class="trash" id="delete"> <img
        src="trash.png"
        alt=""
        width="50"
      /></div>
    `;
  }
  divsToBeAdded = [];
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
        divsToBeAdded = totaltodos;
        render(divsToBeAdded);
      });
    }
  }
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].getEventListeners("click") == undefined) {
      checkbox[i].addEventListener("click", function () {
        if (checkbox[i].classList.contains("filledcheck")) {
          checkbox[i].classList.remove("filledcheck");
          let checkparent = checkbox[i].parentNode.children[1].children[0];
          checkparent.removeChild(checkparent.lastChild);
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
          let checkparent = checkbox[i].parentNode.children[1].children[0];
          const completedcheck = document.createElement("div");
          completedcheck.classList.add("checkline");
          checkparent.appendChild(completedcheck);
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

render(divsToBeAdded);
submitbutton.addEventListener("click", function () {
  if (inpt.value) {
    totaltodos.push([
      inpt.value,
      dateel.value + " " + timeel.value,
      "unchecked",
    ]);
    divsToBeAdded.push([
      inpt.value,
      dateel.value + " " + timeel.value,
      "unchecked",
    ]);
    inpt.value = "";
    localStorage.setItem("all_todos", JSON.stringify(totaltodos));
    render(divsToBeAdded);
  }
});
switcher.addEventListener("click", switchTheme);
