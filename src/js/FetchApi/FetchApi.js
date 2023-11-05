import TicketWidget from "../TicketWidget/TicketWidget";

export default class FetchApi {
  static URL = "https://backend-4zuf.onrender.com";

  //получение всех тикетов и отображение на странице
  static async getAllTickets() {
    const url = FetchApi.URL + "/allTickets";
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error getting all tickets:", error);
      throw error;
    }
  }

  //создание тикета
  static async postCreateTicket(ticket) {
    const url = FetchApi.URL + "/createTicket";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(ticket),
      });
      if (response.ok) {
        TicketWidget.renderWidget();
      }
      return await response.json();
    } catch (error) {
      console.log("Error posting ticket:", error);
      throw error;
    }
  }

  //получение описание тикета
  static async getTicketDesc(id) {
    const url = FetchApi.URL + `/ticketById/${id}`;
    try {
      const response = await fetch(url);
      const ticket = await response.json();
      return ticket;
    } catch (error) {
      console.log("Error getting description:", error);
      throw error;
    }
  }

  //удаление тикета
  static async deleteTicket(id) {
    const url = FetchApi.URL + `/deleteTicket/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      await response.json();
      if (response.ok) {
        const tickets = Array.from(
          document.querySelectorAll(".ticket-wrapper")
        );
        tickets.forEach((el) => {
          if (el.dataset.id === id) {
            el.remove();
          }
        });

        return await FetchApi.getAllTickets();
      }
    } catch (error) {
      console.log("Error deleting ticket:", error);
      throw error;
    }
  }

  //изменение статуса тикета
  static async changeTicketStatus(id, status) {
    const url = FetchApi.URL + `/ticketDone/${id}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ status }),
      });

      const stat = await response.json();
      if (response.ok) {
        TicketWidget.changeTicketStatus(id, stat);
        return await FetchApi.getAllTickets();
      }
      console.log("Status has changed:", stat);
    } catch (err) {
      console.log(err);
    }
  }

  //редактирование тикета
  static async editTicket(id, ticket) {
    const url = FetchApi.URL + `/updateById/${id}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(ticket),
      });
      const editTicket = await response.json();
      if (response.ok) {
        const tickets = Array.from(
          document.querySelectorAll(".ticket-wrapper")
        );
        tickets.forEach((el) => {
          if (el.dataset.id === id) {
            const ticketName = el.querySelector(".ticket-name");
            const ticketDesc = el.querySelector(".ticket-description");
            ticketName.textContent = editTicket.name;
            ticketDesc.textContent = editTicket.description;
          }
        });
      }
      return editTicket;
    } catch (err) {
      console.log(err);
    }
  }

  //получение названия и описания тикета
  static async getNameDescTicket(id) {
    try {
      const url = FetchApi.URL + `/dataTicket/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
