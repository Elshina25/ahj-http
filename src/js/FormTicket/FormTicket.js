import FetchApi from "../FetchApi/FetchApi";

export default class FormTicket {
  constructor() {
    this.form = null;
    this.group = null;
    this.titleLabel = null;
    this.descLabel = null;
    this.nameInput = null;
    this.descTextField = null;
    this.inputHidden = null;
    this.saveButton = null;
    this.cancelButton = null;
  }

  createForm() {
    this.form = document.createElement("form");
    this.form.classList.add("form");

    this.group = document.createElement("div");
    this.group.classList.add("form-group");

    this.titleLabel = document.createElement("span");
    this.titleLabel.classList.add("description", "short-description");
    this.titleLabel.textContent = "Краткое описание";

    this.descLabel = document.createElement("span");
    this.descLabel.classList.add("description", "full-description");
    this.descLabel.textContent = "Полное описание";

    this.nameInput = document.createElement("input");
    this.nameInput.classList.add("input", "input-name");
    this.nameInput.setAttribute("type", "text");
    this.nameInput.setAttribute("required", "required");
    this.nameInput.setAttribute("name", "name");

    this.descTextField = document.createElement("textarea");
    this.descTextField.setAttribute("type", "text");
    this.descTextField.setAttribute("name", "description");
    this.descTextField.classList.add("input", "text-field");

    this.inputHidden = document.createElement("input");
    this.inputHidden.setAttribute("type", "hidden");
    this.inputHidden.setAttribute("name", "id");

    this.saveButton = document.createElement("button");
    this.saveButton.classList.add("button", "button-ok");
    this.saveButton.textContent = "Ok";
    this.saveButton.setAttribute("type", "submit");

    this.cancelButton = document.createElement("button");
    this.cancelButton.classList.add("button", "button-cancel");
    this.cancelButton.textContent = "Отмена";
    this.cancelButton.setAttribute("type", "button");

    this.group.append(
      this.titleLabel,
      this.nameInput,
      this.descLabel,
      this.descTextField,
      this.inputHidden
    );

    this.form.append(this.group, this.saveButton, this.cancelButton);

    return this.form;
  }

  registerEvents() {
    let isSubmitted = false;
    this.form.addEventListener("submit", (e) => {
      if (isSubmitted) {
        return;
      }
      e.preventDefault();
      if (this.form === document.querySelector(".add-ticket")) {
        FetchApi.postCreateTicket(this.getData());
      }
      if (this.form === document.querySelector(".edit-ticket")) {
        FetchApi.editTicket(this.inputHidden.value, this.getData());
      }
      this.resetInput();
      this.hide();
      isSubmitted = true;
    });
  }

  show() {
    this.form.style.display = "block";
  }

  hide() {
    this.form.style.display = "none";
  }

  getData() {
    const data = new FormData(this.form);
    return Object.fromEntries(data.entries());
  }

  resetInput() {
    this.form.reset();
  }
}
