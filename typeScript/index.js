"use strict";
const taskName = document.getElementById("taskname");
const taskDate = document.getElementById("duedate");
const btnSubmit = document.getElementById("submitbtn");
const taskList = document.getElementById("tasklist");
let tasks = [];
window.addEventListener("DOMContentLoaded", () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
});
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.isCompleted;
        checkBox.addEventListener("change", () => toggle(task.id));
        const span = document.createElement("span");
        span.textContent = `${task.name} is due on ${task.dueDate}`;
        if (task.isCompleted) {
            span.classList.add("completed");
        }
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));
        taskInfo.appendChild(checkBox);
        taskInfo.appendChild(span);
        li.appendChild(taskInfo);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
function toggle(id) {
    tasks = tasks.map((task) => {
        if (task.id == id) {
            return Object.assign(Object.assign({}, task), { isCompleted: !task.isCompleted });
        }
        else {
            return task;
        }
    });
    saveTasks();
    renderTasks();
}
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
btnSubmit.addEventListener("click", addTask);
function addTask() {
    const name = taskName.value.trim();
    const dueDate = taskDate.value;
    tasks.push({
        id: Date.now(),
        name,
        dueDate,
        isCompleted: false
    });
    saveTasks();
    renderTasks();
    taskName.value = "";
    taskDate.value = "";
}
