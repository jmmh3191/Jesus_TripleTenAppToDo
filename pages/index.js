import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: handleFormSubmit,
});

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView(todoCounter);

  return todoElement;
};

const items = initialTodos;
const renderer = generateTodo;
const container = todosList;
const section = new Section(items, renderer, container);
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

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  section.addItem(todo);
  addTodoPopup.close();
}

const newTodoValidator = new FormValidator(
  validationConfig,
  addTodoPopup._popupForm
);
newTodoValidator.enableValidation();
