import FetchApi from "./FetchApi/FetchApi";
import AddFormTicket from "./FormTicket/AddFormTicket";
import EditFormTicket from "./FormTicket/EditFormTicket";
import TicketWidget from "./TicketWidget/TicketWidget";

const addForm = new AddFormTicket();
const editForm = new EditFormTicket();
const container = document.querySelector(".widget");

//рендер виджета при загрузке
document.addEventListener("DOMContentLoaded", () => {
  TicketWidget.renderWidget();
});

//функция отмены на модальные окна
const ticketHandler = (form) => {
  form.form.addEventListener("click", (e) => {
    if (e.target === form.cancelButton) {
      form.resetInput();
      form.hide();
    }
  });
};

//отлавливание кликов по виджету
container.addEventListener("click", (e) => {
  const target = e.target;

  //клик по кнопке "Добавить тикет"
  if (target.classList.contains("add")) {
    if (!addForm.form) {
      const form = addForm.formAddTicket(addForm.createForm());
      document.body.appendChild(form);
    }
    addForm.show();
    addForm.registerEvents();
    ticketHandler(addForm);

    //Удаление тикета
  } else if (target.classList.contains("delete-btn")) {
    const parent = target.closest(".ticket-wrapper");
    const id = parent.dataset.id;
    let modalDel = document.querySelector(".modal-delete");
    if (!modalDel) {
      modalDel = TicketWidget.createDeleteModal();
      document.body.appendChild(modalDel);
    }
    modalDel.style.display = "block";
    modalDel.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.classList.contains("delete-ticket")) {
        TicketWidget.deleteItem(id);
        modalDel.style.display = "none";
      }
      if (e.target.classList.contains("cancel-delete-ticket")) {
        modalDel.style.display = "none";
      }
    });
    //Клик по тикету для вывода описания
  } else if (
    target.classList.contains("ticket-name") ||
    target.classList.contains("date-created")
  ) {
    const parent = target.closest(".ticket-wrapper");
    const desc = parent.querySelector(".ticket-description");
    const id = parent.dataset.id;

    if (!desc) {
      TicketWidget.renderDescription(id);
    } else {
      desc.classList.toggle("active");
    }

    //изменение статуса тикета
  } else if (target.classList.contains("ticket-status")) {
    const status = target.checked;
    const parent = target.closest(".ticket-wrapper");
    const id = parent.dataset.id;
    FetchApi.changeTicketStatus(id, status);

    //редактирование тикета
  } else if (target.classList.contains("edit-btn")) {
    const parent = target.closest(".ticket-wrapper");
    const id = parent.dataset.id;
    if (!editForm.form) {
      const form = editForm.formEditTicket(editForm.createForm());
      document.body.appendChild(form);
      editForm.toFillInputs(id);
    } else {
      editForm.show();
      editForm.toFillInputs(id);
    }
    ticketHandler(editForm);
    editForm.registerEvents();
  }
});
