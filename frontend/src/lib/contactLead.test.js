import { submitContact } from "@/lib/api";
import { trackMetaLead } from "@/lib/metaPixel";
import { submitContactLead } from "./contactLead";

jest.mock("@/lib/api", () => ({ submitContact: jest.fn() }));
jest.mock("@/lib/metaPixel", () => ({ trackMetaLead: jest.fn() }));

describe("submitContactLead", () => {
  beforeEach(() => jest.clearAllMocks());

  it("tracks one Lead only after a successful request without forwarding PII", async () => {
    submitContact.mockResolvedValue({ message: "ok" });
    await submitContactLead({ nama: "A", email: "a@example.com", pesan: "private" }, {
      source: "pricing", selectedPlan: "Growth", leadChannel: "email",
    });
    expect(trackMetaLead).toHaveBeenCalledTimes(1);
    expect(trackMetaLead).toHaveBeenCalledWith({
      form_type: "contact", source: "pricing", selected_plan: "Growth", lead_channel: "email",
    });
    expect(JSON.stringify(trackMetaLead.mock.calls)).not.toContain("a@example.com");
  });

  it("does not track Lead when the request fails", async () => {
    submitContact.mockRejectedValue(new Error("failed"));
    await expect(submitContactLead({ email: "a@example.com" })).rejects.toThrow("failed");
    expect(trackMetaLead).not.toHaveBeenCalled();
  });
});
