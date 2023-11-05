import FetchApi from "../FetchApi/FetchApi";

export default class TicketWidget {
  static tickets = [];

  static addTicket(ticket) {
    TicketWidget.tickets.push(ticket);
  }

  static async renderWidget() {
    const data = await FetchApi.getAllTickets();
    TicketWidget.render(data);
  }

  static async renderDescription(id) {
    const data = await FetchApi.getTicketDesc(id);
    TicketWidget.addDescription(data);
  }

  static render(data) {
    if (Array.isArray(data)) {
      if (TicketWidget.tickets.length !== 0) {
        const idArr = TicketWidget.tickets.map((el) => el.id);
        const newData = data.filter((item) => !idArr.includes(item.id));

        if (newData.length !== 0) {
          newData.forEach((el) => TicketWidget.addTicket(el));
          TicketWidget.renderItem(newData);
        }
      } else {
        data.forEach((el) => TicketWidget.addTicket(el));
        TicketWidget.renderItem(data);
      }
    }
  }

  static createItem(data) {
    const ticketWrap = document.createElement("div");
    ticketWrap.classList.add("ticket-wrapper");
    ticketWrap.dataset.id = data.id;

    const checkboxStatus = document.createElement("input");
    checkboxStatus.classList.add("ticket-status");
    checkboxStatus.setAttribute("type", "checkbox");

    if (data.status === true) {
      checkboxStatus.checked = true;
    } else {
      checkboxStatus.checked = false;
    }

    const ticketName = document.createElement("span");
    ticketName.classList.add("ticket-name");
    ticketName.textContent = data.name;

    const dateCreated = document.createElement("span");
    dateCreated.classList.add("date-created");
    dateCreated.textContent = data.created;

    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    editBtn.classList.add("edit-btn");
    editBtn.textContent = "✎";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "x";

    ticketWrap.append(
      checkboxStatus,
      ticketName,
      dateCreated,
      editBtn,
      deleteBtn
    );

    return ticketWrap;
  }

  static changeTicketStatus(id, status) {
    const tickets = Array.from(document.querySelectorAll(".ticket-wrapper"));
    tickets.forEach((el) => {
      if (el.dataset.id === id) {
        el.querySelector(".ticket-status").checked = status;
      }
    });
  }

  static createDeleteModal() {
    const deleteModal = document.createElement("div");
    deleteModal.classList.add("modal", "modal-delete");

    const headerModal = document.createElement("h4");
    headerModal.classList.add("header-delete-modal");

    const sureToDelete = document.createElement("span");
    sureToDelete.classList.add("sure-to-delete");
    sureToDelete.textContent = "Вы действительно хотите удалить тикет?";

    const buttons = document.createElement("div");
    buttons.classList.add("buttons-modal-delete");

    const buttonOk = document.createElement("button");
    buttonOk.classList.add("delete-ticket");
    buttonOk.textContent = "Ok";

    const buttonCancel = document.createElement("button");
    buttonCancel.classList.add("cancel-delete-ticket");
    buttonCancel.textContent = "Cancel";

    buttons.append(buttonOk, buttonCancel);

    deleteModal.append(headerModal, sureToDelete, buttons);

    return deleteModal;
  }

  static deleteItem(id) {
    FetchApi.deleteTicket(id);
    TicketWidget.tickets = TicketWidget.tickets.filter(
      (ticket) => ticket.id !== id
    );
  }

  static addDescription(data) {
    const ticketWrappers = Array.from(
      document.querySelectorAll(".ticket-wrapper")
    );
    ticketWrappers.forEach((el) => {
      if (el.dataset.id === data.id) {
        const ticketDesc = document.createElement("span");
        ticketDesc.classList.add("ticket-description", "active");
        ticketDesc.textContent = data.description;
        el.appendChild(ticketDesc);
      }
    });
  }

  static renderItem(data) {
    const container = document.querySelector(".widget-container");
    data.forEach((el) => {
      const item = TicketWidget.createItem(el);
      container.appendChild(item);
    });
  }
}
