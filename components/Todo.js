class Todo {
  constructor(data, selector, callbacks) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._onToggleCompleted = callbacks.onToggleCompleted;
    this._onDelete = callbacks.onDelete;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateTodoDateEl() {
    this._todoDate = this._todoElement.querySelector(".todo__date");

    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  _setEventListeners(callbacks) {
    this._todoCheckboxEl.addEventListener("click", () => {
      this._data.completed = !this._data.completed;
      callbacks.onToggleCompleted(this._data.completed);
    });

    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      if (this._data.completed) {
        callbacks.onDelete(true);
      } else {
        callbacks.onDelete(false);
      }
    });
  }

  getView(callbacks) {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._generateTodoDateEl();
    this._setEventListeners(callbacks);

    return this._todoElement;
  }
}

export default Todo;
