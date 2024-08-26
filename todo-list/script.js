const input = document.querySelector("#todoInput");
const allDelBtn = document.querySelector("#allDelBtn");
const todoList = document.querySelector("#todoList");

const loadTodo = function () {
  let storageKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    storageKeys[i] = localStorage.key(i);
  }
  console.log(storageKeys);
  for (const key of storageKeys) {
    const storageValue = JSON.parse(localStorage.getItem(key));
    console.log(storageValue);
    todoList.append(storageValue.content);
  }
};
loadTodo();

const createTodo = function () {
  const inputValue = input.value;

  const newLi = document.createElement("li");
  newLi.id = Math.floor(Math.random(new Date().getMilliseconds()) * 100000);

  const liCheckbox = document.createElement("input");
  liCheckbox.type = "checkbox";
  liCheckbox.id = `check${newLi.id}`;

  const checkLabel = document.createElement("label");
  checkLabel.htmlFor = `check${newLi.id}`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.addEventListener("click", () => {
    localStorage.removeItem(`${removeBtn.parentElement.id}`);
    removeBtn.parentElement.remove();
  });

  newLi.append(liCheckbox);
  newLi.append(checkLabel);
  newLi.append(removeBtn);
  checkLabel.append(inputValue);
  todoList.append(newLi);

  const todoObj = {
    content: inputValue,
    complete: liCheckbox.checked,
  };

  localStorage.setItem(`todo${newLi.id}`, JSON.stringify(todoObj));

  input.value = "";
};

input.addEventListener("keydown", () => {
  if (event.keyCode === 13 && input.value) {
    createTodo();
  }
});

allDelBtn.addEventListener("click", () => {
  let todoArr = [];
  for (let i = 0; i < todoList.childElementCount; i++) {
    todoArr[i] = todoList.childNodes[i];
  }
  for (const li of todoArr) {
    li.remove();
  }
  localStorage.clear();
});
