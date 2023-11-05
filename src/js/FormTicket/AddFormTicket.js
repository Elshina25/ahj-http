import FormTicket from "./FormTicket";

export default class AddFormTicket extends FormTicket {
  formAddTicket(form) {
    form.classList.add("add-ticket");
    const ticketTitle = document.createElement("span");
    ticketTitle.textContent = "Добавить тикет";
    form.insertBefore(ticketTitle, form.querySelector(".form-group"));
    document.querySelector(".header-widget").appendChild(form);
    return form;
  }
}
