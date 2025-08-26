import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "../../src/app/dashboard/components/Sidebar";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => "/dashboard",
}));

describe("Sidebar component - simples", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renderiza o logo e os 3 botões", () => {
    render(<Sidebar />);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(6);
  });

  it("User e Settings chamam router.push ao clicar", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);
    expect(pushMock).toHaveBeenCalledWith("/dashboard");

    await user.click(buttons[1]);
    expect(pushMock).toHaveBeenCalledWith("/settings");
  });
});
