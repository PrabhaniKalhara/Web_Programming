function addTask() {
  var input = document.getElementById("newTask");
  var text = input.value.trim();
  var errorBox = document.getElementById("errors");

  if (text === "") {
    errorBox.classList.remove("hidden");
    input.classList.add("invalid");
    return;
  }

  errorBox.classList.add("hidden");
  input.classList.remove("invalid");

  var li = document.createElement("li");
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Tick / untick toggles the "done" style
  checkbox.onchange = function () {
    li.classList.toggle("done", checkbox.checked);
  };

  var label = document.createElement("span");
  label.textContent = text;

  li.appendChild(checkbox);
  li.appendChild(label);
  document.getElementById("taskList").appendChild(li);

  input.value = "";
  input.focus();
}

document.getElementById("addTask").onclick = addTask;

// Press Enter to add a task
document.getElementById("newTask").onkeydown = function (e) {
  if (e.key === "Enter") {
    addTask();
  }
};
