import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppointmentForm } from "@/components/sections/appointment-form";

describe("AppointmentForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows required-field errors when submitting empty", async () => {
    render(<AppointmentForm />);
    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: /send via whatsapp/i }),
    );

    expect(
      await screen.findByText(/please enter your full name/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/enter a valid phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/please pick a department/i)).toBeInTheDocument();
  });

  it("opens WhatsApp and shows success on valid submit", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<AppointmentForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/full name/i), "Ali Khan");
    await user.type(screen.getByLabelText(/phone/i), "03001234567");

    // Radix Select — open department dropdown, click first option
    await user.click(screen.getByRole("combobox", { name: /select department/i }));
    const options = await screen.findAllByRole("option");
    await user.click(options[0]);

    await user.click(
      screen.getByRole("button", { name: /send via whatsapp/i }),
    );

    expect(await screen.findByText(/request sent/i)).toBeInTheDocument();
    expect(openSpy).toHaveBeenCalledTimes(1);
  });
});
