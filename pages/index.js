import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: handleFormSubmit,
});

const generateTodo = (data) => {
  const callbacks = {
    onToggleCompleted: (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
    onDelete: (isCompleted) => {
      todoCounter.updateTotal(false);
      if (isCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
  };
  const todo = new Todo(data, "#todo-template", callbacks);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: generateTodo,
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoPopup.setEventListeners();

function handleFormSubmit(inputValues) {
  todoCounter.updateTotal(true);
  const name = inputValues.name;
  const date = new Date(inputValues.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  newTodoValidator.resetValidation();

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  section.addItem(todo);
  addTodoPopup.close();
}

const newTodoValidator = new FormValidator(
  validationConfig,
  addTodoPopup.getForm()
);
newTodoValidator.enableValidation();
