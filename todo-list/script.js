const input = document.querySelector("#todoInput");
const allDelBtn = document.querySelector("#allDelBtn");
const todoList = document.querySelector("#todoList");

let itemOrder = JSON.parse(localStorage.getItem("itemOrder"));
itemOrder ? itemOrder : 0;

// 리스트 아이템 (li 태그) 아이디 생성
const generateId = function () {
  return Math.floor(Math.random(new Date().getMilliseconds()) * 100000);
};

// todo 생성
const createTodo = function (keyId, value) {
  const listPiece = {
    inputValue: value.content ? value.content : value,
    newLi: document.createElement("li"),
    liCheckbox: document.createElement("input"),
    checkLabel: document.createElement("label"),
    removeBtn: document.createElement("button"),
    order: itemOrder ? itemOrder : 0,
  };

  listPiece.newLi.id = keyId ? keyId : 0;

  listPiece.liCheckbox.type = "checkbox";
  listPiece.liCheckbox.id = `check${keyId}`;
  listPiece.liCheckbox.checked = value.complete;
  listPiece.liCheckbox.addEventListener("change", function () {
    saveStorage(listPiece);
  });

  listPiece.checkLabel.htmlFor = `check${keyId}`;

  listPiece.removeBtn.textContent = "X";
  listPiece.removeBtn.addEventListener("click", function () {
    removeStorageItem(this);
    this.parentElement.remove();
    if (localStorage.length === 1) {
      clearStorage();
    }
  });

  return listPiece;
};

// 투두리스트 조립하여 화면에 출력
const appendTodo = function (listPiece) {
  listPiece.newLi.append(listPiece.liCheckbox);
  listPiece.newLi.append(listPiece.checkLabel);
  listPiece.newLi.append(listPiece.removeBtn);
  listPiece.checkLabel.append(listPiece.inputValue);
  todoList.append(listPiece.newLi);
};

// 아이템 정렬
const sortItems = function (storageItems) {
  let tmp = null;
  for (let i = 0; i < storageItems.length; i++) {
    for (let j = i + 1; j < storageItems.length; j++) {
      if (storageItems[i].value.order > storageItems[j].value.order) {
        tmp = storageItems[i];
        storageItems[i] = storageItems[j];
        storageItems[j] = tmp;
      }
    }
  }
  return storageItems;
};

// 로컬스토리지에서 투두리스트 불러와 화면에 출력
const loadTodo = function () {
  let storageItems = [];
  let passed = false;
  let passedIndex = 0;

  // localStorage에서 itemOrder를 건너뛰고 할일 아이템만 담기
  for (let i = 0; i < localStorage.length; i++) {
    const storageItem = {};
    storageItem.key = localStorage.key(i);
    if (storageItem.key === "itemOrder") {
      if (passed === false) {
        passed = true;
        passedIndex = i;
      }
      continue;
    }
    storageItem.value = JSON.parse(localStorage.getItem(storageItem.key));
    storageItems[passedIndex++] = storageItem;
  }

  // 정렬
  const sortedItems = sortItems(storageItems);

  for (const item of sortedItems) {
    appendTodo(createTodo(item.key, item.value));
  }
};
loadTodo();

// 로컬스토리지에 아이템 저장
const saveStorage = function (listPiece) {
  const todoObj = {
    content: listPiece.inputValue,
    complete: listPiece.liCheckbox.checked,
    order: listPiece.order,
  };
  localStorage.setItem("itemOrder", itemOrder++);
  localStorage.setItem(listPiece.newLi.id, JSON.stringify(todoObj));
};

// 로컬스토리지에서 아이템 삭제
const removeStorageItem = function (removeBtn) {
  localStorage.removeItem(removeBtn.parentElement.id);
  removeBtn.parentElement.remove();
};

// 로컬스토리지 클리어
const clearStorage = function () {
  localStorage.clear();
  itemOrder = 0;
};

// 투두리스트 목록아이템들 모두 화면에서 지우기
const clearList = function () {
  for (let i = todoList.children.length; i > 0; i--) {
    todoList.children[i - 1].remove();
  }
};

input.addEventListener("keydown", () => {
  if (event.keyCode === 13 && input.value) {
    const listPiece = createTodo(`todo${generateId()}`, input.value);
    appendTodo(listPiece);
    saveStorage(listPiece);
    input.value = "";
  }
});

allDelBtn.addEventListener("click", () => {
  clearList();
  clearStorage();
});
