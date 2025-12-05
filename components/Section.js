class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      const elementContainer = this._renderer(item);
      this.addItem(elementContainer);
    });
  }
  addItem(elementContainer) {
    this._container.append(elementContainer);
  }
}

export default Section;
