const keyCodeCheck = function () {
  if (event.keyCode === 13) {
    const input = document.querySelector("#todoInput");
    const inputValue = input.value;

    const todoList = document.querySelector("#todoList");
    const newLi = document.createElement("li");
    newLi.id = Math.floor(Math.random(new Date().getMilliseconds()) * 100000);

    const liCheckbox = document.createElement("input");
    liCheckbox.type = "checkbox";
    liCheckbox.id = `check${newLi.id}`;
    // liCheckbox.name = `check${inputValue}`;

    const checkLabel = document.createElement("label");
    checkLabel.htmlFor = `check${newLi.id}`;
    // checkLabel.appendChild(liCheckbox);

    // checkLabel.append(liCheckbox);
    // checkLabel.append(inputValue);

    newLi.append(liCheckbox);
    // newLi.append(inputValue);
    // newLi.appendChild(liCheckbox).nextSibling = checkLabel;
    newLi.append(checkLabel);
    checkLabel.append(inputValue);
    todoList.appendChild(newLi);
    input.value = "";
  }
};
