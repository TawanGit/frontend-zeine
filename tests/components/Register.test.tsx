import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../../src/app/register/page";

describe("Register Page - UI simples", () => {
  it("renderiza inputs e botão", () => {
    render(<Register />);
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Repetir senha")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /criar conta/i })
    ).toBeInTheDocument();
  });

  it("mostra erro se senhas não coincidem", async () => {
    render(<Register />);

    await userEvent.type(screen.getByPlaceholderText("Senha"), "abc123");
    await userEvent.type(
      screen.getByPlaceholderText("Repetir senha"),
      "123abc"
    );

    await userEvent.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(
      await screen.findByText("As senhas não coincidem")
    ).toBeInTheDocument();
  });

  it("aceita senhas iguais e limpa mensagem de erro", async () => {
    render(<Register />);

    const passwordInput = screen.getByPlaceholderText("Senha");
    const confirmInput = screen.getByPlaceholderText("Repetir senha");
    const button = screen.getByRole("button", { name: /criar conta/i });

    await userEvent.type(passwordInput, "senha123");
    await userEvent.type(confirmInput, "senha123");

    await userEvent.click(button);

    const errorMessage = screen.queryByText("As senhas não coincidem");
    expect(errorMessage).toBeNull();
  });
});
