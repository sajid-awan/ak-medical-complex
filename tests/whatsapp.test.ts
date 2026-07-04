import { describe, expect, it, vi, afterEach } from "vitest";
import { openWhatsApp, whatsAppLink } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/site-data";

describe("openWhatsApp", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses the configured number in the base link", () => {
    expect(whatsAppLink).toBe(`https://wa.me/${CONTACT.whatsAppNumber}`);
  });

  it("opens a WhatsApp URL with title and non-empty fields", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    openWhatsApp("Appointment", {
      Name: "Ali",
      Phone: "03001234567",
      Notes: "",
    });

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target] = openSpy.mock.calls[0];
    expect(target).toBe("_blank");
    expect(url).toContain(`wa.me/${CONTACT.whatsAppNumber}`);

    const decoded = decodeURIComponent(String(url).split("text=")[1]);
    expect(decoded).toContain("*Appointment*");
    expect(decoded).toContain("Name: Ali");
    expect(decoded).toContain("Phone: 03001234567");
    expect(decoded).not.toContain("Notes:");
  });
});
