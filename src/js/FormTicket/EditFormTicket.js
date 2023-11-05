import FetchApi from "../FetchApi/FetchApi";
import FormTicket from "./FormTicket";

export default class EditFormTicket extends FormTicket {
  formEditTicket(form) {
    form.classList.add("edit-ticket");
    const ticketTitle = document.createElement("span");
    ticketTitle.textContent = "Изменить тикет";
    form.insertBefore(ticketTitle, form.querySelector(".form-group"));
    document.querySelector(".widget-container").appendChild(form);
    return form;
  }

  async toFillInputs(id) {
    const data = await this.getTicketData(id);
    this.dataInput(data);
  }

  getTicketData(id) {
    return FetchApi.getNameDescTicket(id);
  }

  dataInput(data) {
    this.nameInput.value = data.name;
    this.descTextField.value = data.description;
    this.inputHidden.value = data.id;
  }
}
