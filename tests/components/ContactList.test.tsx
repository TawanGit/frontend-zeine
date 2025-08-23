import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactList from "../../src/app/dashboard/components/Contact/ContactList";

const contacts = [
  {
    id: 1,
    name: "Alice",
    phone: "123",
    email: "a@example.com",
    photo: "https://via.placeholder.com/150",
  },
];

describe("ContactList", () => {
  it('chama a função openModal ao clicar no botão "Adicionar contato"', async () => {
    const openModalMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onUpdateMock = jest.fn();

    render(
      <ContactList
        contacts={contacts}
        userId="1"
        token="token"
        openModal={openModalMock}
        onDelete={onDeleteMock}
        onUpdate={onUpdateMock}
      />
    );

    const button = screen.getByText("Adicionar contato");

    await userEvent.click(button);

    expect(openModalMock).toHaveBeenCalledTimes(1);
  });

  it("exibe contatos corretamente", () => {
    render(
      <ContactList
        contacts={contacts}
        userId="1"
        token="token"
        openModal={() => {}}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});
